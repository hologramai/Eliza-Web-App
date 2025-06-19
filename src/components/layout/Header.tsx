import React from 'react';
import { Home, Twitter, Send, Wallet, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserStatus, WalletState } from '../../types';
import SignInDropdown from '../auth/SignInDropdown';

interface HeaderProps {
  userStatus: UserStatus;
  wallet: WalletState;
  googleUser: any;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
  onGoogleSignIn: () => void;
  onSignOut: () => void;
  getShortAddress: () => string;
}

const Header: React.FC<HeaderProps> = ({
  userStatus,
  wallet,
  googleUser,
  onConnectWallet,
  onDisconnectWallet,
  onGoogleSignIn,
  onSignOut,
  getShortAddress
}) => {
  const isAuthenticated = wallet.isConnected || googleUser;

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
        
        {!isAuthenticated ? (
          <SignInDropdown
            onConnectWallet={onConnectWallet}
            onGoogleSignIn={onGoogleSignIn}
          />
        ) : (
          <div className="flex items-center space-x-2">
            {wallet.isConnected ? (
              <Button
                variant="ghost"
                className="text-white hover:bg-cyber-pink/20 hover:text-cyber-pink transition-colors"
              >
                <Wallet className="w-5 h-5 mr-2" />
                {getShortAddress()}
              </Button>
            ) : googleUser ? (
              <div className="flex items-center space-x-2">
                <img
                  src={googleUser.picture}
                  alt={googleUser.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white text-sm">{googleUser.name}</span>
              </div>
            ) : null}
            
            <Button
              onClick={onSignOut}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-cyber-pink/20 hover:text-cyber-pink transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
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