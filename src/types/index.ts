export interface Message {
  id: string;
  text: string;
  isEliza: boolean;
  timestamp: Date;
}

export interface UserStatus {
  messagesUsed: number;
  remainingMessages: number;
  totalMessages: number;
  status: 'anonymous' | 'connected';
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  isConnecting: boolean;
}

export interface ChatResponse {
  success: boolean;
  response?: string;
  messagesUsed?: number;
  remainingMessages?: number;
  totalMessages?: number;
  error?: string;
  quota_exceeded?: boolean;
}

export interface ChatResponse {
  success: boolean;
  response?: string;
  messagesUsed?: number;
  remainingMessages?: number;
  totalMessages?: number;
  error?: string;
  quota_exceeded?: boolean;
}

export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string; // Google user ID
}