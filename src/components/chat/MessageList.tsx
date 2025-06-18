import React from 'react';
import { Message } from '../../types';
import MessageRow from './MessageRow';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  return (
    <div className="max-h-60 overflow-y-auto space-y-4 mb-6">
      {messages.map((message) => (
        <MessageRow key={message.id} message={message} />
      ))}
      <TypingIndicator isTyping={isTyping} />
    </div>
  );
};

export default MessageList;