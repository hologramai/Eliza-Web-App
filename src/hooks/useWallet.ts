import { useState, useEffect } from 'react';
import { WalletState } from '../types';
import { metamaskService } from '../services/metamask';

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    isConnecting: false
  });

  // Only check for MetaMask without auto-connecting
  useEffect(() => {
    if (metamaskService.isInstalled()) {
      console.log('MetaMask detected');
    }
  }, []);

  const connectWallet = async () => {
    if (!metamaskService.isInstalled()) {
      console.log('MetaMask is not installed');
      metamaskService.openInstallPage();
      return;
    }

    setWallet(prev => ({ ...prev, isConnecting: true }));

    try {
      const accounts = await metamaskService.requestAccounts();

      if (accounts.length > 0) {
        setWallet({
          isConnected: true,
          address: accounts[0],
          isConnecting: false
        });
        console.log('Connected to ' + accounts[0]);
      }
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      setWallet(prev => ({ ...prev, isConnecting: false }));
    }
  };

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      isConnecting: false
    });
    console.log('Wallet disconnected');
  };

  const getShortAddress = () => {
    if (!wallet.address) return '';
    return wallet.address.slice(0, 6) + '...' + wallet.address.slice(-4);
  };

  return {
    wallet,
    connectWallet,
    disconnectWallet,
    getShortAddress
  };
};