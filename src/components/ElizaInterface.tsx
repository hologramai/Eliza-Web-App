
import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  isEliza: boolean;
  timestamp: Date;
}

const ElizaInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Eliza, your AI companion. I'm here to listen, support, and chat with you about anything on your mind. How are you feeling today?",
      isEliza: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const elizaResponses = [
    "That's really interesting. Tell me more about how that makes you feel.",
    "I understand. It sounds like you're going through something meaningful.",
    "Thank you for sharing that with me. Your thoughts matter to me.",
    "I'm here for you. Sometimes just talking about things can help us process them.",
    "That sounds important to you. How long have you been thinking about this?",
    "I appreciate you opening up to me. What would feel most supportive right now?",
    "Your feelings are completely valid. Would you like to explore this together?",
    "I'm listening. Sometimes the best thing I can do is simply be present with you."
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isEliza: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Eliza thinking and responding
    setTimeout(() => {
      const elizaResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: elizaResponses[Math.floor(Math.random() * elizaResponses.length)],
        isEliza: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, elizaResponse]);
      setIsTyping(false);
      setIsVoiceActive(true);
      
      // Stop voice animation after 3 seconds
      setTimeout(() => setIsVoiceActive(false), 3000);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with cityscape */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/b5f3a4ac-74ae-4ee5-bb86-c7bafe53a9b0.png')`,
          filter: 'blur(1px) brightness(0.7)'
        }}
      />
      
      {/* Gradient overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-dark/30 to-cyber-dark/80" />
      
      {/* Circuit board pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/lovable-uploads/a6c5eadc-58d6-447d-97f7-dfcf0c90981e.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'hue-rotate(20deg)'
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Eliza's Avatar Section */}
        <div className="relative mb-8 animate-float">
          <div className="relative">
            <img
              src="/lovable-uploads/fd3cd33d-bebd-4c6f-9987-bcf664a58e0f.png"
              alt="Eliza AI"
              className="w-80 h-80 object-cover rounded-full cyber-glow animate-pulse-glow"
            />
            
            {/* Voice indicator */}
            <div className="absolute top-4 right-4">
              <div className={`relative ${isVoiceActive ? 'animate-voice-pulse' : ''}`}>
                <Volume2 
                  className={`w-8 h-8 transition-colors duration-300 ${
                    isVoiceActive ? 'text-cyber-gold' : 'text-cyber-orange'
                  }`}
                />
                {isVoiceActive && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-cyber-gold/30 animate-voice-pulse" />
                    <div className="absolute inset-0 rounded-full bg-cyber-gold/20 animate-voice-pulse" style={{ animationDelay: '0.3s' }} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="w-full max-w-2xl space-y-6">
          {/* Messages Display */}
          <div className="max-h-60 overflow-y-auto space-y-4 mb-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isEliza ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.isEliza
                      ? 'bg-cyber-dark/80 border border-cyber-orange/30 text-cyber-gold cyber-text-glow animate-speech-bubble'
                      : 'bg-cyber-orange/20 border border-cyber-gold/30 text-white'
                  } cyber-bg-blur backdrop-blur-md`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-cyber-dark/80 border border-cyber-orange/30 px-4 py-3 rounded-2xl cyber-bg-blur">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyber-orange rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-cyber-orange rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-cyber-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts with Eliza..."
                className="w-full bg-cyber-dark/60 border-cyber-orange/40 text-white placeholder-cyber-orange/60 rounded-2xl px-6 py-4 text-lg cyber-bg-blur backdrop-blur-md focus:border-cyber-gold focus:ring-2 focus:ring-cyber-gold/30 transition-all duration-300"
                style={{
                  boxShadow: '0 0 20px rgba(255, 140, 66, 0.1)'
                }}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-cyber-orange to-cyber-gold hover:from-cyber-gold hover:to-cyber-amber text-cyber-dark px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 cyber-glow hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </Button>
          </div>
        </div>

        {/* Subtle UI Elements */}
        <div className="absolute bottom-4 left-4 text-cyber-orange/60 text-sm">
          <p className="cyber-text-glow">Eliza AI • Always here for you</p>
        </div>
      </div>
    </div>
  );
};

export default ElizaInterface;
