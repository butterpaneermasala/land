'use client';

import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import ConnectWallet from '../components/wallet/ConnectWallet';
import { useWallet } from '../contexts/WalletContext';
import { getNetworkName } from '../utils/walletConnectors';
import { motion } from 'framer-motion';

const floatingAnimations = [
  {
    style: { top: '20%', left: '10%' },
    animation: { x: [0, 40, -30, 0], y: [0, -40, 30, 0] },
    duration: 60,
    classes: 'w-[60vw] h-[60vw] from-purple-500 to-pink-500 blur-[160px]',
  },
  {
    style: { top: '50%', right: '5%' },
    animation: { x: [0, -30, 40, 0], y: [0, 40, -30, 0] },
    duration: 70,
    classes: 'w-[50vw] h-[50vw] from-cyan-400 to-indigo-600 blur-[140px]',
  },
  {
    style: { top: '75%', left: '30%' },
    animation: { x: [0, 30, -30, 0], y: [0, -20, 20, 0] },
    duration: 90,
    classes: 'w-[40vw] h-[40vw] from-green-500 to-teal-400 blur-[120px]',
  },
];

const Home: NextPage = () => {
  const { account, chainId } = useWallet();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Head>
        <title>LTS | Decentralized Land Ownership</title>
        <meta name="description" content="Manage your land assets on the blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ANIMATED BACKGROUND */}

      {/* Twinkling Stars */}
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute bg-white rounded-full"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.3 + Math.random() * 0.5,
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 2 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ☄️ Diagonal Shooting Meteors */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`meteor-${i}`}
          className="absolute w-0.5 h-24 bg-gradient-to-b from-white to-transparent opacity-80"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            rotate: '135deg',
          }}
          initial={{ x: -300, y: -300, opacity: 0 }}
          animate={{ x: 1000, y: 1000, opacity: [0, 1, 0] }}
          transition={{
            delay: Math.random() * 5,
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 6,
            ease: 'easeInOut',
          }}
        />
      ))}


      {/* Floating Nebulas */}
      {floatingAnimations.map((config, i) => (
        <motion.div
          key={`nebula-${i}`}
          className={`absolute bg-gradient-to-tr ${config.classes} opacity-20 rounded-full`}
          style={config.style}
          animate={config.animation}
          transition={{
            duration: config.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Galactic Glow */}
      <motion.div
        className="absolute top-[30%] left-[40%] w-[100vw] h-[100vw] rounded-full bg-indigo-900 opacity-10 blur-[200px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* HEADER */}
      <header className="bg-black/80 text-white p-6 border-b border-white/10 shadow-lg sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold font-mono animate-pulse">Land Transfer System</h1>
          {account && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 border border-white text-white px-4 py-2 font-mono text-sm rounded-full backdrop-blur-sm shadow-lg"
            >
              {getNetworkName(chainId)}
            </motion.div>
          )}
        </div>
      </header>

      {/* MAIN SECTION */}
      <main className="container mx-auto py-16 px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 shadow-2xl rounded-2xl"
          >
            <h2 className="text-5xl font-extrabold mb-6 font-mono leading-tight text-white">
              DECENTRALIZED LAND TRANSFER
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Secure, transparent, and immutable land ownership management on the blockchain.
            </p>

            {account ? (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/dashboard"
                  className="inline-block bg-white text-black py-3 px-8 text-xl font-bold uppercase tracking-wider rounded-lg transition duration-300 shadow-md hover:bg-gray-100"
                >
                  Go to Dashboard
                </Link>
              </motion.div>
            ) : (
              <p className="text-lg font-mono text-red-400">
                Connect wallet to access dashboard
              </p>
            )}
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md p-8 bg-white/10 border border-white/20 shadow-2xl rounded-2xl backdrop-blur-xl"
          >
            <h3 className="text-3xl font-bold mb-6 font-mono text-center text-white">Wallet Connection</h3>
            <ConnectWallet />
          </motion.div>
        </div>

        {/* FEATURE BUTTONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {[
            { title: 'REGISTER AGRO LAND', href: '/register-agro' },
            { title: 'REGISTER CONVERTED LAND', href: '/register-converted' },
            { title: 'TRANSFER LAND', href: '/transfer' },
            { title: 'VERIFY LAND', href: '/verify' },
            { title: 'MANAGE LAND', href: '/manage' },
            { title: 'APPROVAL LIST', href: '/approval' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Link href={feature.href}>
                <div className="cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-6 shadow-xl text-center transition-all">
                  <h3 className="text-2xl font-bold font-mono text-white">{feature.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="bg-black/80 text-white py-6 mt-16 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 font-mono text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            LTS © {new Date().getFullYear()} | DECENTRALIZED LAND OWNERSHIP
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
