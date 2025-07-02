// src/services/api.ts
import { Message, UserStatus, ChatResponse } from '../types';

// For Vite projects, use import.meta.env instead of process.env
const API_BASE = import.meta.env.PROD 
  ? 'https://eliza-web-app.vercel.app'  // Your actual Vercel URL
  : 'http://127.0.0.1:8080';

console.log('API_BASE:', API_BASE); // Debug log

export const chatApi = {
  async sendMessage(
    wallet: string | null,
    message: string,
    chatHistory: Message[]
  ): Promise<ChatResponse> {
    try {
      console.log('Sending request to:', `${API_BASE}/api/chat`); // Debug log
      
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet,
          message,
          chatHistory
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  async getUserStatus(walletAddress: string): Promise<UserStatus> {
    try {
      const response = await fetch(`${API_BASE}/api/user-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet: walletAddress }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
};

export { API_BASE };