import { Message, UserStatus, ChatResponse } from '../types';

const API_BASE = 'http://127.0.0.1:8080';

export const chatApi = {
  async sendMessage(
    wallet: string | null,
    message: string,
    chatHistory: Message[]
  ): Promise<ChatResponse> {
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
  },

  async getUserStatus(walletAddress: string): Promise<UserStatus> {
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
  }
};

export { API_BASE };