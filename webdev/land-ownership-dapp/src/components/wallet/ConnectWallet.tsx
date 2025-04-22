import React from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { formatAddress } from '../../utils/walletConnectors';

const ConnectWallet: React.FC = () => {
  const { account, connect, disconnect, isConnecting, error } = useWallet();

  return (
    <div className="flex flex-col items-center">
      {account ? (
        <div className="flex flex-col items-center">
          <div className="bg-black text-white border-4 border-black p-4 font-mono mb-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-lg font-bold mb-2">CONNECTED</div>
            <div className="text-green-400">{formatAddress(account)}</div>
          </div>
          <button
            onClick={disconnect}
            className="bg-red-500 hover:bg-red-600 text-white border-4 border-black py-2 px-6 font-bold tracking-wider uppercase text-xl transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            DISCONNECT
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="bg-black text-white border-4 border-black p-4 font-mono mb-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-lg font-bold mb-2">NOT CONNECTED</div>
            <div className="text-red-400">Connect your wallet to manage land assets</div>
          </div>
          <button
            onClick={connect}
            disabled={isConnecting}
            className={`bg-blue-500 hover:bg-blue-600 text-white border-4 border-black py-2 px-6 font-bold tracking-wider uppercase text-xl transition-all ${
              isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
            } shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
          >
            {isConnecting ? 'CONNECTING...' : 'CONNECT WALLET'}
          </button>
          {error && <div className="mt-4 text-red-500 font-mono">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;