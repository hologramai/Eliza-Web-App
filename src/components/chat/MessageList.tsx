import React, { useEffect, useRef } from 'react';
import { Message } from '../../types';
import MessageRow from './MessageRow';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  isExpanded?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, isExpanded = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className={`${isExpanded ? 'h-full' : 'max-h-60'} overflow-y-auto space-y-4 pr-2 transition-all duration-700`}>
      {messages.map((message) => (
        <MessageRow key={message.id} message={message} />
      ))}
      <TypingIndicator isTyping={isTyping} />
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;