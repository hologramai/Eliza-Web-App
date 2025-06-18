import React from 'react';
import { Volume2 } from 'lucide-react';

interface AvatarWithVoiceProps {
  shouldFloat: boolean;
  isVoiceActive: boolean;
}

const AvatarWithVoice: React.FC<AvatarWithVoiceProps> = ({ shouldFloat, isVoiceActive }) => {
  return (
    <div className="relative mb-8">
      <div className="relative">
        <img
          src="/pics/3.png"
          alt="Eliza AI"
          className={`w-80 h-80 object-cover rounded-full cyber-glow animate-pulse-glow ${
            shouldFloat ? 'animate-float' : ''
          }`}
        />
        
        {/* Voice indicator */}
        <div className="absolute top-4 right-4">
          <div className={`relative ${isVoiceActive ? 'animate-voice-pulse' : ''}`}>
            <Volume2 
              className={`w-8 h-8 transition-colors duration-300 ${
                isVoiceActive ? 'text-cyber-gold' : 'text-cyber-purple'
              }`}
            />
            {isVoiceActive && (
              <>
                <div className="absolute inset-0 rounded-full bg-cyber-pink/30 animate-voice-pulse" />
                <div className="absolute inset-0 rounded-full bg-cyber-pink/20 animate-voice-pulse" style={{ animationDelay: '0.3s' }} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarWithVoice;