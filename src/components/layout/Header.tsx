import React from 'react';
import { Home, Twitter, Send, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserStatus, WalletState } from '../../types';

interface HeaderProps {
  userStatus: UserStatus;
  wallet: WalletState;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
  getShortAddress: () => string;
}

const Header: React.FC<HeaderProps> = ({
  userStatus,
  wallet,
  onConnectWallet,
  onDisconnectWallet,
  getShortAddress
}) => {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-cyber-pink/20 hover:text-cyber-pink transition-colors"
        >
          <Home className="w-6 h-6" />
        </Button>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-white text-sm font-medium">
          Messages: {userStatus.messagesUsed}/{userStatus.totalMessages}
        </div>
        
        {!wallet.isConnected ? (
          <Button
            onClick={onConnectWallet}
            disabled={wallet.isConnecting}
            variant="ghost"
            className="text-white hover:bg-cyber-pink/20 hover:text-cyber-pink transition-colors"
          >
            <Wallet className="w-5 h-5 mr-2" />
            {wallet.isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        ) : (
          <Button
            onClick={onDisconnectWallet}
            variant="ghost"
            className="text-white hover:bg-cyber-pink/20 hover:text-cyber-pink transition-colors"
          >
            <Wallet className="w-5 h-5 mr-2" />
            {getShortAddress()}
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-cyber-pink/20 hover:text-cyber-pink transition-colors"
          onClick={() => window.open('https://twitter.com', '_blank')}
        >
          <Twitter className="w-6 h-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-cyber-pink/20 hover:text-cyber-pink transition-colors"
          onClick={() => window.open('https://t.me', '_blank')}
        >
          <Send className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
};

export default Header;