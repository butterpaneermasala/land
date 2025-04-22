import { NextPage } from 'next';
import Head from 'next/head';
import { useWallet } from '../contexts/WalletContext';
import Link from 'next/link';

const Dashboard: NextPage = () => {
  const { account } = useWallet();

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard | LTS</title>
      </Head>

      <header className="bg-black text-white p-4 border-b-4 border-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold font-mono">Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="bg-white border-8 border-black p-8 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-bold mb-6 font-mono">DASHBOARD</h2>

          {account ? (
            <div className="space-y-4">
              <p className="font-mono">Welcome, {account}!</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link href="/register-agro">
                  <div className="cursor-pointer bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                    <h3 className="text-2xl font-bold mb-4 font-mono">REGISTER AGRO LAND</h3>
                  </div>
                </Link>
                <Link href="/register-converted">
                  <div className="cursor-pointer bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                    <h3 className="text-2xl font-bold mb-4 font-mono">REGISTER CONVERTED LAND</h3>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <p className="font-mono text-red-500">Connect your wallet to access the dashboard.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;