'use client';

import { NextPage } from 'next';
import Head from 'next/head';
import { useWallet } from '../contexts/WalletContext';
import { approveTransfer, executeTransfer, setTransferDetails } from '../utils/blockchain';
import { useState } from 'react';
import { motion } from 'framer-motion';

const TransferLand: NextPage = () => {
  const { account } = useWallet();
  const [tokenId, setTokenId] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [regName, setRegName] = useState<string>('');
  const [regAddress, setRegAddress] = useState<string>('');
  const [newOwner, setNewOwner] = useState<string>('');
  const [newOwnerName, setNewOwnerName] = useState<string>('');
  const [newFather, setNewFather] = useState<string>('');
  const [witness1Name, setWitness1Name] = useState<string>('');
  const [witness1Address, setWitness1Address] = useState<string>('');
  const [witness2Name, setWitness2Name] = useState<string>('');
  const [witness2Address, setWitness2Address] = useState<string>('');

  const handleSetTransferDetails = async () => {
    if (!account) {
      alert('⚠️ Connect your wallet first!');
      return;
    }

    try {
      await setTransferDetails(
        tokenId, name, to, regName, regAddress,
        witness1Name, witness1Address,
        witness2Name, witness2Address,
        newOwner, newOwnerName, newFather
      );
      alert('✅ Transfer details set successfully!');
    } catch (error: any) {
      console.error('Error setting transfer details:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleApproveTransfer = async () => {
    if (!account) {
      alert('⚠️ Connect your wallet first!');
      return;
    }

    try {
      await approveTransfer(tokenId);
      alert('✅ Transfer approved successfully!');
    } catch (error: any) {
      console.error('Error approving transfer:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleExecuteTransfer = async () => {
    if (!account) {
      alert('⚠️ Connect your wallet first!');
      return;
    }

    try {
      await executeTransfer(tokenId);
      alert('✅ Transfer executed successfully!');
    } catch (error: any) {
      console.error('Error executing transfer:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-mono">
      <Head>
        <title>Transfer Land | LTS</title>
      </Head>

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

      {/* Shooting Meteors */}
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

      {/* Galactic Glow */}
      <motion.div
        className="absolute top-[30%] left-[40%] w-[100vw] h-[100vw] rounded-full bg-indigo-900 opacity-10 blur-[200px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Header */}
      <header className="bg-black/80 text-white p-6 border-b border-white/10 shadow-lg sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold font-mono">🔄 Transfer Land Ownership</h1>
        </div>
      </header>

      {/* Form */}
      <main className="w-3/4 mx-auto py-16 px-4 sm:px-10 relative z-10">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl shadow-2xl px-6 sm:px-12 py-10"
        >
          <h2 className="text-3xl font-bold text-center mb-10">📝 Transfer Land Details</h2>

          <div className="flex flex-col gap-6">
            {[
              { label: 'Token ID', value: tokenId, onChange: (v: string) => setTokenId(Number(v)), type: 'number' },
              { label: 'Current Owner Name', value: name, onChange: setName },
              { label: 'Current Owner Address', value: to, onChange: setTo },
              { label: 'Registrar Name', value: regName, onChange: setRegName },
              { label: 'Registrar Address', value: regAddress, onChange: setRegAddress },
              { label: 'New Owner Address', value: newOwner, onChange: setNewOwner },
              { label: 'New Owner Name', value: newOwnerName, onChange: setNewOwnerName },
              { label: "New Father's Name", value: newFather, onChange: setNewFather },
              { label: 'Witness 1 Name', value: witness1Name, onChange: setWitness1Name },
              { label: 'Witness 1 Address', value: witness1Address, onChange: setWitness1Address },
              { label: 'Witness 2 Name', value: witness2Name, onChange: setWitness2Name },
              { label: 'Witness 2 Address', value: witness2Address, onChange: setWitness2Address },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block mb-2 text-lg">{field.label}</label>
                <input
                  type={field.type ?? 'text'}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full rounded-lg bg-black/50 border border-white/30 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            ))}
          </div>

          <div className="grid gap-4 mt-10">
            <button
              type="button"
              onClick={handleSetTransferDetails}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-4 rounded-lg transition"
            >
              🛠 Set Transfer Details
            </button>

            <button
              type="button"
              onClick={handleApproveTransfer}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-lg transition"
            >
              ✅ Approve Transfer
            </button>

            <button
              type="button"
              onClick={handleExecuteTransfer}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-lg transition"
            >
              🚀 Execute Transfer
            </button>
          </div>
        </motion.form>
      </main>
    </div>
  );
};

export default TransferLand;
