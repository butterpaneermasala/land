'use client';

import { NextPage } from 'next';
import Head from 'next/head';
import { useWallet } from '../contexts/WalletContext';
import { registerConvertedLand } from '../utils/blockchain';
import { useState } from 'react';
import { motion } from 'framer-motion';

const RegisterConvertedLand: NextPage = () => {
  const { account } = useWallet();
  const [formData, setFormData] = useState({
    name: '',
    bhukhand: '',
    district: '',
    tehsil: '',
    gram: '',
    blockNo: 0,
    father: '',
    foot: 0,
    map: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) {
      alert('⚠️ Connect your wallet first!');
      return;
    }

    try {
      await registerConvertedLand(
        formData.name,
        account,
        formData.bhukhand,
        formData.district,
        formData.tehsil,
        formData.gram,
        formData.blockNo,
        formData.father,
        formData.foot,
        formData.map
      );
      alert('✅ Converted land registered successfully!');
      setFormData({
        name: '',
        bhukhand: '',
        district: '',
        tehsil: '',
        gram: '',
        blockNo: 0,
        father: '',
        foot: 0,
        map: '',
      });
    } catch (error: any) {
      console.error('Error registering land:', error);
      alert(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Head>
        <title>Register Converted Land | LTS</title>
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

      {/* Shooting Stars */}
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

      {/* Header */}
      <header className="bg-black/80 text-white p-6 border-b border-white/10 shadow-lg sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold font-mono">🏡 Register Converted Land</h1>
        </div>
      </header>

      {/* Form */}
      <main className="w-3/4 mx-auto py-16 px-4 sm:px-10 relative z-10">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl shadow-2xl px-6 sm:px-12 py-10"
        >
          <h2 className="text-3xl font-bold font-mono text-center mb-10">📝 Register Converted Land</h2>

          <div className="flex flex-col gap-6 w-full">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="w-full">
                <label className="block font-mono text-lg capitalize mb-2">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type={typeof value === 'number' ? 'number' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/30 rounded-lg px-4 py-3 text-white font-mono placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            ))}
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold font-mono px-6 py-4 rounded-lg transition"
            >
              ✅ Register Land
            </button>
          </div>
        </motion.form>
      </main>
    </div>
  );
};

export default RegisterConvertedLand;
