import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useWallet } from '../../contexts/WalletContext';
import { formatAddress, getNetworkName } from '../../utils/walletConnectors';

const Header: React.FC = () => {
  const router = useRouter();
  const { account, chainId } = useWallet();

  return (
    <header className="bg-black text-white p-4 border-b-4 border-white">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link href="/" className="text-3xl font-bold font-mono">
          LTS
        </Link>

        <nav className="flex items-center">
          {account && (
            <>
              <ul className="flex mr-6">
                <li className="mr-6">
                  <Link
                    href="/dashboard"
                    className={`font-mono uppercase tracking-wider ${
                      router.pathname === '/dashboard' ? 'text-blue-400' : 'hover:text-gray-300'
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className={`font-mono uppercase tracking-wider ${
                      router.pathname === '/profile' ? 'text-blue-400' : 'hover:text-gray-300'
                    }`}
                  >
                    Profile
                  </Link>
                </li>
              </ul>

              <div className="bg-white text-black px-4 py-2 font-mono text-sm flex items-center">
                <span className="mr-2 bg-green-500 rounded-full w-2 h-2"></span>
                <span>{formatAddress(account)}</span>
                <span className="ml-4 text-xs px-2 py-1 bg-gray-200 rounded">
                  {getNetworkName(chainId)}
                </span>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;