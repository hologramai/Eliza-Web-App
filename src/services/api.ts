// src/services/ApiService.tsx
import { Message, UserStatus, ChatResponse } from '../types';

// Use environment variable for API base URL, fallback to localhost for development
const API_BASE = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL || 'https://eliza-web-app.vercel.app/'
  : 'http://127.0.0.1:8080';

export const chatApi = {
  async sendMessage(
    wallet: string | null,
    message: string,
    chatHistory: Message[]
  ): Promise<ChatResponse> {
    try {
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