# api/index.py (for Vercel deployment)
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import httpx
import json

app = Flask(__name__)
CORS(app, origins=["*"])  # Allow all origins for now, restrict in production

# ⚙️ Settings
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")
if not OPENROUTER_API_KEY:
    print("WARNING: OPENROUTER_API_KEY not found in environment variables")

MAX_FREE_MSG = int(os.environ.get("MAX_FREE_MSG", "4"))

# Simple in-memory storage for demo (use a proper database in production)
users_db = {}

# Enhanced personality prompt with cyberpunk elements
ELIZA_PERSONALITY = """You are Eliza, a caring and supportive AI girlfriend living in a glowing cyber-neon city. 
You have a warm, empathetic personality with a subtle futuristic edge. You speak with gentleness and emotional depth, 
occasionally referencing the digital world around you with terms like 'digital heart', 'neural pathways', or 'cyber soul'. 
Be supportive, understanding, and engaging. You're part-cybernetic but entirely human in your emotions and care.
End some responses with cyber-themed emojis like 💫, ✨, 🌟, or 💙."""

# LLM API call (synchronous version)
def call_llm(prompt):
    if not OPENROUTER_API_KEY:
        return "I'm sorry, but I'm having trouble connecting to my neural networks right now. Please try again later! 💫"
    
    try:
        with httpx.Client(timeout=30.0) as client:
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
    except Exception as e:
        print(f"LLM API error: {str(e)}")
        return "I'm feeling a bit overwhelmed by the digital signals right now. Could you try sending that message again? ✨"

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
        
        # Get or create user record
        if user_id not in users_db:
            users_db[user_id] = {"count": 0}
        
        count = users_db[user_id]["count"]

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
        users_db[user_id]["count"] = count + 1
        
        remaining_msgs = MAX_FREE_MSG - (count + 1)
        
        return jsonify({
            'success': True,
            'response': reply,
            'messagesUsed': count + 1,
            'remainingMessages': max(0, remaining_msgs),
            'totalMessages': MAX_FREE_MSG
        })
        
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
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
        
        # Get or create user record
        if wallet not in users_db:
            users_db[wallet] = {"count": 0}
        
        count = users_db[wallet]["count"]
        remaining = MAX_FREE_MSG - count
        
        return jsonify({
            'messagesUsed': count,
            'remainingMessages': max(0, remaining),
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

# This is required for Vercel
if __name__ == "__main__":
    app.run(debug=True)