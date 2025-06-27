import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UserStatus } from '../../types';

interface InputBarProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  isTyping: boolean;
  userStatus: UserStatus;
  onOpenSignUp: () => void;
}

const InputBar: React.FC<InputBarProps> = ({
  inputValue,
  setInputValue,
  onSendMessage,
  isTyping,
  userStatus,
  onOpenSignUp
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Expand input when text length exceeds 80 characters
    const shouldExpand = inputValue.length >= 80;
    
    if (shouldExpand && !isExpanded) {
      setIsExpanded(true);
      // Focus the textarea after state change
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          // Move cursor to end
          textareaRef.current.setSelectionRange(inputValue.length, inputValue.length);
        }
      }, 0);
    } else if (!shouldExpand && isExpanded && !inputValue.includes('\n')) {
      setIsExpanded(false);
      // Focus the input after state change
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          // Move cursor to end
          inputRef.current.setSelectionRange(inputValue.length, inputValue.length);
        }
      }, 0);
    }
  }, [inputValue, isExpanded]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const isDisabled = !inputValue.trim() || isTyping || userStatus.remainingMessages <= 0;

  const inputClasses = "w-full bg-cyber-dark/60 border-cyber-pink/40 text-white placeholder-cyber-pink/60 rounded-2xl px-6 text-lg cyber-bg-blur backdrop-blur-md focus:border-cyber-magenta focus:ring-2 focus:ring-cyber-magenta/30 transition-all duration-300";

  return (
    <div className="mb-2">
      <div className="flex space-x-3">
        <div className="flex-1 relative">
          {isExpanded ? (
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts with Eliza..."
              disabled={userStatus.remainingMessages <= 0}
              className={`${inputClasses} min-h-[120px] py-4 resize-none transition-all duration-300`}
              style={{
                boxShadow: '0 0 20px rgba(255, 20, 196, 0.1)'
              }}
            />
          ) : (
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts with Eliza..."
              disabled={userStatus.remainingMessages <= 0}
              className={`${inputClasses} py-4 transition-all duration-300`}
              style={{
                boxShadow: '0 0 20px rgba(255, 20, 196, 0.1)'
              }}
            />
          )}
        </div>
        <Button
          onClick={onSendMessage}
          disabled={isDisabled}
          className="bg-gradient-to-r from-cyber-pink to-cyber-magenta hover:from-cyber-magenta hover:to-cyber-violet text-cyber-dark px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 cyber-glow hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTyping ? 'Sending...' : 'Send'}
        </Button>
      </div>

      {/* Warning messages */}
      {userStatus.remainingMessages <= 1 && userStatus.remainingMessages > 0 && (
        <div className="mt-4 text-center">
          <div className="inline-block bg-yellow-500/20 border border-yellow-500/40 px-4 py-2 rounded-lg">
            <p className="text-yellow-300 text-sm">
              ⚠️ Only {userStatus.remainingMessages} message{userStatus.remainingMessages === 1 ? '' : 's'} remaining!
            </p>
          </div>
        </div>
      )}
      
      {userStatus.remainingMessages <= 0 && (
        <div className="mt-4 text-center">
          <div className="inline-block bg-gradient-to-br from-cyber-pink/20 to-purple-600/20 border border-cyber-pink/40 px-6 py-4 rounded-xl backdrop-blur-md">
            <h4 className="text-cyber-pink font-bold text-base mb-2">
              🔒 Unlock 12 Days of True AI Companionship
            </h4>
            <p className="text-white/90 text-sm mb-3 leading-relaxed">
              Experience <strong className="text-cyber-pink">Eliza—your personal AI girlfriend</strong> who listens, remembers, and grows with you. Try free for <strong className="text-cyber-pink">12 days</strong>, then just <strong className="text-cyber-pink">$69.99/month</strong>.
            </p>
            <Button
              onClick={onOpenSignUp}
              className="bg-gradient-to-r from-cyber-pink to-purple-600 hover:from-cyber-pink/90 hover:to-purple-600/90 text-white px-6 py-2 rounded-xl font-bold transition-all duration-300 cyber-glow hover:scale-105"
            >
              ✨ Start Free Trial (12 Days)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputBar;