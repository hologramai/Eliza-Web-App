import { useState, useEffect } from 'react';
import { Message, UserStatus } from '../../types';
import { chatApi } from '../../services/api';

export const useChat = (walletAddress: string | null) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Eliza, your AI companion from the neon-lit digital realm. I'm here to listen, support, and chat with you about anything on your mind. How are you feeling today? ✨",
      isEliza: true,
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const [userStatus, setUserStatus] = useState<UserStatus>({
    messagesUsed: 0,
    remainingMessages: 4,
    totalMessages: 4,
    status: 'anonymous'
  });

  // Update user status when wallet is connected
  useEffect(() => {
    if (walletAddress) {
      updateUserStatus();
    } else {
      // Reset to anonymous status
      setUserStatus({
        messagesUsed: 0,
        remainingMessages: 4,
        totalMessages: 4,
        status: 'anonymous'
      });
    }
  }, [walletAddress]);

  // Update message counts based on actual user messages in the chat
  useEffect(() => {
    const userMessageCount = messages.filter(msg => !msg.isEliza).length;
    
    // Update local status based on actual message count
    setUserStatus(prev => {
      const newMessagesUsed = userMessageCount;
      const newRemainingMessages = Math.max(0, prev.totalMessages - newMessagesUsed);
      
      // Only update if the count has changed to avoid infinite loops
      if (prev.messagesUsed !== newMessagesUsed) {
        console.log(`Local count update: ${newMessagesUsed}/${prev.totalMessages} used, ${newRemainingMessages} remaining`);
        return {
          ...prev,
          messagesUsed: newMessagesUsed,
          remainingMessages: newRemainingMessages
        };
      }
      return prev;
    });
  }, [messages]);

  const updateUserStatus = async () => {
    if (!walletAddress) return;
    
    try {
      const status = await chatApi.getUserStatus(walletAddress);
      console.log('Backend status:', status);
      setUserStatus(status);
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    // Check if user has remaining messages
    if (userStatus.remainingMessages <= 0) {
      console.log('No remaining messages');
      return false;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isEliza: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const data = await chatApi.sendMessage(walletAddress, currentInput, messages);

      if (data.success) {
        const elizaResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response!,
          isEliza: true,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, elizaResponse]);

        // Update status with backend response if available, otherwise use local count
        if (data.messagesUsed !== undefined && data.remainingMessages !== undefined) {
          console.log('Backend response counts:', {
            messagesUsed: data.messagesUsed,
            remainingMessages: data.remainingMessages,
            totalMessages: data.totalMessages
          });
          
          setUserStatus(prev => ({
            ...prev,
            messagesUsed: data.messagesUsed!,
            remainingMessages: data.remainingMessages!,
            totalMessages: data.totalMessages || prev.totalMessages
          }));
        } else {
          console.log('No backend counts, relying on local counting');
        }

        return true; // Success - can trigger voice/float animations
      } else {
        console.error('Chat error:', data.error);
        if (data.quota_exceeded) {
          setUserStatus(prev => ({ ...prev, remainingMessages: 0 }));
        }
        return false;
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    userStatus,
    sendMessage
  };
};