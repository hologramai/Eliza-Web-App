import React from 'react';
import { WalletState } from '../../types';

interface StatusBannerProps {
  wallet: WalletState;
  getShortAddress: () => string;
}

const StatusBanner: React.FC<StatusBannerProps> = ({ wallet, getShortAddress }) => {
  const getStatusMessage = () => {
    if (!wallet.isConnected) {
      return "💬 Anonymous mode - Connect wallet for personalized experience ✨";
    }
    
    return `🔗 Connected: ${getShortAddress()} ✨`;
  };

  return (
    <div className="text-center mb-8">
      <div className="inline-block bg-cyber-dark/80 border border-cyber-pink/30 px-6 py-3 rounded-2xl cyber-bg-blur backdrop-blur-md">
        <p className="text-cyber-pink cyber-text-glow text-sm">
          {getStatusMessage()}
        </p>
      </div>
    </div>
  );
};

export default StatusBanner;