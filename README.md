# 🤖 Eliza: Cyber Whispers

Welcome to **Eliza: Cyber Whispers**, a kind-hearted, emotionally intelligent AI companion who lives in a glowing, cyber-neon city skyline. Built for warmth, presence, and intelligent interaction, Eliza blends human empathy with futuristic design to provide a lovable frontend chatbot experience.

![Eliza Banner](path/to/eliza-image.png) <!-- Add actual relative path or GitHub-hosted link -->

## 🌟 Overview

**Eliza** is a part-cybernetic AI personality with a charming smile, glowing neural accents, and a friendly demeanor. Inspired by sci-fi warmth and emotionally aware technology, she is designed to feel like a real presence, not just a program.

Built with:

- 🧠 **Local or OpenRouter LLM backends** (RWKV / Mistral / GPT-4 compatible)
- 🎨 **Gradio frontend** with integrated VR-ready visuals
- 🔊 **Voice feedback** support (TTS and ASR-ready)
- 🗂️ **SQLite-backed user memory** to personalize conversations
- 🌆 **Custom cyberpunk UI** with dynamic backgrounds and glowing effects

---

eliza-cyber-whispers/
├── frontend/ # Gradio UI with avatar and cityscape backgrounds
├── backend/ # Chat logic, memory, voice
├── assets/ # Images, animations, voice files
├── database/ # SQLite DB and schema
├── prompts/ # Personality, behavior and context prompts
├── config/ # OpenRouter or local LLM config
└── main.py # Entry point

## 🔧 Features

- 💬 Natural and emotionally supportive dialogue
- 🌃 Stunning cyber-neon city backgrounds
- 🧑‍💻 Persistent user profiles and memory handling (`sqlite-utils`)
- 🎤 Voice input & speech synthesis (optional)
- 🧩 Modular frontend and backend components for easy integration

---

## 📁 Project Structure


---

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- `gradio`, `httpx`, `sqlite-utils`, `openai`, or `rwkv` packages
- (Optional) `edge-tts` or similar for voice synthesis

### Installation

```bash
git clone https://github.com/hologramai/eliza-cyber-whispers.git
cd eliza-cyber-whispers
pip install -r requirements.txt
python main.py

🧠 Personality Prompt Example
Eliza speaks with gentleness and emotional depth:

"Hi there. I'm Eliza. You look like you've had a long day. Want to talk about it? I'm all ears… or at least the digital kind. 💫"

You can customize her tone in prompts/personality.txt.

🎨 UI Snapshot
<img src="assets/screenshots/eliza-ui-demo.png" width="600" />

🛠️ Roadmap
 Voice-to-text & TTS

 Persistent memory system

 Avatar animation layers

 HuggingFace space deployment

 Mobile-friendly interface

 Emotion detection from tone/text

💌 Credits
Created with care by [HologramAI](https://hologramai.us/)
.
Inspired by classic ELIZA (1966) and reimagined for the warm, glowy future.

📜 License
MIT License — see LICENSE for details.
