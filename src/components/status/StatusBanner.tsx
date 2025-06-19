import React from 'react';
import { WalletState } from '../../types';

interface StatusBannerProps {
  wallet: WalletState;
  getShortAddress: () => string;
  googleUser?: any;
}

const StatusBanner: React.FC<StatusBannerProps> = ({ wallet, getShortAddress, googleUser }) => {
  const getStatusMessage = () => {
    if (googleUser) {
      return `🔗 Signed in as: ${googleUser.email} ✨`;
    }
    
    if (wallet.isConnected) {
      return `🔗 Connected: ${getShortAddress()} ✨`;
    }
    
    return "💬 Anonymous mode - Sign in for personalized experience ✨";
  };

  return (
    <div className="text-center mb-4">
      <div className="inline-block bg-cyber-dark/80 border border-cyber-pink/30 px-6 py-3 rounded-2xl cyber-bg-blur backdrop-blur-md">
        <p className="text-cyber-pink cyber-text-glow text-sm">
          {getStatusMessage()}
        </p>
      </div>
    </div>
  );
};

export default StatusBanner;