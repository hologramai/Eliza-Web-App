import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../../types';
import MessageRow from './MessageRow';
import TypingIndicator from './TypingIndicator';
import ChatScrollControls from './ChatScrollControls';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  isExpanded?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, isExpanded = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    messagesContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Show scroll to top button when there are multiple messages and user might need to scroll
  useEffect(() => {
    if (isExpanded && messages.length > 3) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  }, [messages.length, isExpanded]);

  // Handle scroll detection for better scroll button behavior
  const handleScroll = () => {
    if (messagesContainerRef.current && isExpanded) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const scrolledFromBottom = scrollHeight - scrollTop - clientHeight;
      // Show button when scrolled more than 50px from bottom OR when there are many messages
      setShowScrollToTop(scrolledFromBottom > 50 || messages.length > 4);
    }
  };

  return (
    <div className="relative h-full">
      <ChatScrollControls 
        showScrollToTop={showScrollToTop}
        onScrollToTop={scrollToTop}
      />

      {/* Messages Container with Strict Height Control */}
      <div 
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className={`${
          isExpanded 
            ? 'h-[65vh] max-h-[65vh]' // Reduced height to ensure header stays visible
            : 'max-h-60'
        } overflow-y-auto space-y-4 pr-2 transition-all duration-700 rounded-lg`}
        style={{
          // Force height constraint even if content tries to expand
          height: isExpanded ? '65vh' : 'auto',
          maxHeight: isExpanded ? '65vh' : '15rem'
        }}
      >
        {messages.map((message) => (
          <MessageRow key={message.id} message={message} />
        ))}
        <TypingIndicator isTyping={isTyping} />
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;