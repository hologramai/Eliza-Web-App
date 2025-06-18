import React from 'react';

interface TypingIndicatorProps {
  isTyping: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isTyping }) => {
  if (!isTyping) return null;

  return (
    <div className="flex justify-start">
      <div className="bg-cyber-dark/80 border border-cyber-pink/30 px-4 py-3 rounded-2xl cyber-bg-blur">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-cyber-pink rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-cyber-pink rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-cyber-pink rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;