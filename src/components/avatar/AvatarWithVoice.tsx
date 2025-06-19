import React from 'react';
import { Volume2 } from 'lucide-react';

interface AvatarWithVoiceProps {
  shouldFloat: boolean;
  isVoiceActive: boolean;
  isRectangle?: boolean;
}

const AvatarWithVoice: React.FC<AvatarWithVoiceProps> = ({ shouldFloat, isVoiceActive, isRectangle = false }) => {
  return (
    <div className={`relative ${isRectangle ? 'w-full h-full' : 'mb-8'}`}>
      <div className={`relative ${isRectangle ? 'h-full' : ''}`}>
        <img
          src="/pics/3.png"
          alt="Eliza AI"
          className={`
            ${isRectangle 
              ? 'w-full h-full object-cover rounded-2xl' 
              : 'w-80 h-80 object-cover rounded-full'
            } 
            cyber-glow animate-pulse-glow 
            ${shouldFloat && !isRectangle ? 'animate-float' : ''}
          `}
        />
        
        {/* Voice indicator */}
        <div className={`absolute ${isRectangle ? 'top-4 right-4' : 'top-4 right-4'}`}>
          <div className={`relative ${isVoiceActive ? 'animate-voice-pulse' : ''}`}>
            <Volume2 
              className={`${isRectangle ? 'w-6 h-6' : 'w-8 h-8'} transition-colors duration-300 ${
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