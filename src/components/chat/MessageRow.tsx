import React from 'react';
import { Message } from '../../types';

interface MessageRowProps {
  message: Message;
}

const MessageRow: React.FC<MessageRowProps> = ({ message }) => {
  return (
    <div className={`flex ${message.isEliza ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          message.isEliza
            ? 'bg-cyber-dark/80 border border-cyber-pink/30 text-cyber-pink cyber-text-glow animate-speech-bubble'
            : 'bg-cyber-purple/20 border border-cyber-magenta/30 text-white'
        } cyber-bg-blur backdrop-blur-md`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
    </div>
  );
};

export default MessageRow;