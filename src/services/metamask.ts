declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (accounts: string[]) => void) => void;
      removeListener: (event: string, callback: (accounts: string[]) => void) => void;
      isMetaMask?: boolean;
    };
  }
}

export const metamaskService = {
  isInstalled(): boolean {
    return typeof window.ethereum !== 'undefined';
  },

  async requestAccounts(): Promise<string[]> {
    if (!this.isInstalled()) {
      throw new Error('MetaMask is not installed');
    }

    return window.ethereum!.request({
      method: 'eth_requestAccounts',
    });
  },

  openInstallPage(): void {
    window.open('https://metamask.io/download/', '_blank');
  }
};