/**
 * Formats an Ethereum address to a shorter form
 * @param address Full Ethereum address
 * @returns Formatted address (e.g., 0x1234...5678)
 */
export const formatAddress = (address: string): string => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  /**
   * Get the network name based on chain ID
   * @param chainId The Ethereum chain ID
   * @returns Human-readable network name
   */
  export const getNetworkName = (chainId: number | null): string => {
    if (chainId === null) return 'Unknown Network';
    
    switch (chainId) {
      case 1:
        return 'Ethereum Mainnet';
      case 5:
        return 'Goerli Testnet';
      case 11155111:
        return 'Sepolia Testnet';
      case 137:
        return 'Polygon Mainnet';
      case 80001:
        return 'Polygon Mumbai';
      case 42161:
        return 'Arbitrum One';
      case 421613:
        return 'Arbitrum Goerli';
      case 10:
        return 'Optimism';
      case 420:
        return 'Optimism Goerli';
      default:
        return `Chain ID: ${chainId}`;
    }
  };
  
  /**
   * Check if MetaMask is installed
   * @returns Boolean indicating if MetaMask is available
   */
  export const isMetaMaskInstalled = (): boolean => {
    return (
      typeof window !== "undefined" &&
      window.ethereum !== undefined &&
      (window.ethereum as any).isMetaMask === true
    );
  };
  