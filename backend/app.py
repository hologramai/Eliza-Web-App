import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import httpx
from db_utils import DB, NotFoundError

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load environment variables from .env file
load_dotenv()

# ⚙️ Settings
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
if not OPENROUTER_API_KEY:
    raise ValueError("OPENROUTER_API_KEY environment variable is required. Please check your .env file.")

MAX_FREE_MSG = int(os.getenv("MAX_FREE_MSG", "4"))

# Initialize table
if "users" not in DB.table_names():
    DB["users"].create({
        "wallet": str,
        "count": int
    })

# Enhanced personality prompt with cyberpunk elements
ELIZA_PERSONALITY = """You are Eliza, a caring and supportive AI girlfriend living in a glowing cyber-neon city. 
You have a warm, empathetic personality with a subtle futuristic edge. You speak with gentleness and emotional depth, 
occasionally referencing the digital world around you with terms like 'digital heart', 'neural pathways', or 'cyber soul'. 
Be supportive, understanding, and engaging. You're part-cybernetic but entirely human in your emotions and care.
End some responses with cyber-themed emojis like 💫, ✨, 🌟, or 💙."""

# LLM API call (synchronous version)
def call_llm(prompt):
    with httpx.Client() as client:
        resp = client.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={"Authorization": f"Bearer {OPENROUTER_API_KEY}"},
            json={
                "model": "mistralai/mistral-7b-instruct:free",
                "messages": [
                    {"role": "system", "content": ELIZA_PERSONALITY},
                    {"role": "user", "content": prompt}
                ]
            }
        )
        resp.raise_for_status()
        return resp.json()["choices"][0]["message"]["content"]

@app.route('/api/chat', methods=['POST'])
def chat_with_eliza():
    try:
        data = request.get_json()
        wallet = data.get('wallet', '')
        user_message = data.get('message', '')
        chat_history = data.get('chatHistory', [])
        
        if not user_message.strip():
            return jsonify({
                'success': False,
                'error': 'Please enter a message to send to Eliza ✨'
            }), 400
        
        # Check user quota - use wallet or anonymous
        user_id = wallet if wallet else "anonymous"
        
        try:
            # Try to find user by wallet first, then by old email system for backwards compatibility
            row = None
            if wallet:
                try:
                    row = DB["users"].get(wallet)
                except NotFoundError:
                    # Try to find by email field for backwards compatibility
                    try:
                        for user in DB["users"].rows:
                            if user.get("wallet") == wallet:
                                row = user
                                break
                    except:
                        pass
            
            count = row["count"] if row else 0
        except:
            row = None
            count = 0

        if count >= MAX_FREE_MSG:
            return jsonify({
                'success': False,
                'error': f"💳 You've reached {MAX_FREE_MSG} free messages. Please subscribe to continue chatting with Eliza! ✨",
                'quota_exceeded': True
            }), 403

        # Create context from chat history
        if chat_history:
            # Use the last few exchanges for context (limit to prevent token overflow)
            recent_history = chat_history[-6:]  # Last 3 exchanges (user + eliza pairs)
            context_messages = []
            for msg in recent_history:
                if msg.get('isEliza'):
                    context_messages.append(f"Eliza: {msg.get('text', '')}")
                else:
                    context_messages.append(f"User: {msg.get('text', '')}")
            
            context = '\n'.join(context_messages)
            full_prompt = f"Previous conversation:\n{context}\n\nUser: {user_message}\n\nRespond as Eliza with warmth and empathy:"
        else:
            full_prompt = f"This is the start of a conversation. The user just said: {user_message}\n\nRespond as Eliza with a warm greeting and address their message:"
        
        # Get AI response
        reply = call_llm(full_prompt)
        
        # Update database
        if row:
            DB["users"].update(row["id"], {"count": count + 1})
        else:
            # Create new user record
            if wallet:
                DB["users"].insert({"wallet": wallet, "count": 1})
            else:
                # For anonymous users, we don't store anything
                pass
        
        remaining_msgs = MAX_FREE_MSG - (count + 1)
        
        return jsonify({
            'success': True,
            'response': reply,
            'messagesUsed': count + 1,
            'remainingMessages': max(0, remaining_msgs),
            'totalMessages': MAX_FREE_MSG
        })
        
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")  # Add logging
        return jsonify({
            'success': False,
            'error': f"❌ Connection error: {str(e)} | Please try again 🔄"
        }), 500

@app.route('/api/user-status', methods=['POST'])
def get_user_status():
    try:
        data = request.get_json()
        wallet = data.get('wallet', '')
        
        if not wallet:
            return jsonify({
                'messagesUsed': 0,
                'remainingMessages': MAX_FREE_MSG,
                'totalMessages': MAX_FREE_MSG,
                'status': 'anonymous'
            })
        
        try:
            # Try to find user by wallet
            row = None
            try:
                row = DB["users"].get(wallet)
            except NotFoundError:
                # Try to find by searching rows for backwards compatibility
                try:
                    for user in DB["users"].rows:
                        if user.get("wallet") == wallet:
                            row = user
                            break
                except:
                    pass
            
            if row:
                count = row["count"]
                remaining = MAX_FREE_MSG - count
                return jsonify({
                    'messagesUsed': count,
                    'remainingMessages': max(0, remaining),
                    'totalMessages': MAX_FREE_MSG,
                    'status': 'connected'
                })
            else:
                return jsonify({
                    'messagesUsed': 0,
                    'remainingMessages': MAX_FREE_MSG,
                    'totalMessages': MAX_FREE_MSG,
                    'status': 'connected'
                })
        except Exception as e:
            print(f"Error in user-status: {str(e)}")
            return jsonify({
                'messagesUsed': 0,
                'remainingMessages': MAX_FREE_MSG,
                'totalMessages': MAX_FREE_MSG,
                'status': 'connected'
            })
            
    except Exception as e:
        print(f"Error in user-status endpoint: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'Eliza API'})

if __name__ == "__main__":
    print("🌟 Starting Eliza: Cyber Whispers API...")
    print("🚀 API running on http://127.0.0.1:8080")
    app.run(host="127.0.0.1", port=8080, debug=True)