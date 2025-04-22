'use client';

import { NextPage } from 'next';
import Head from 'next/head';
import { useWallet } from '../contexts/WalletContext';
import { approveLandTransfer } from '../utils/blockchain';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface TransferDetail {
    tokenid: number;
    address: string;
    Owner: string;
    New_address: string;
    New_Owner: string;
    Registrar: string;
}

const APPROVAL: NextPage = () => {
    const { account } = useWallet();
    const [tokenId, setTokenId] = useState('');
    const [transferDetail, setTransferDetail] = useState<TransferDetail | null>(null);

    const fetchTransferDetail = async (id: string) => {
        const dummyData: TransferDetail[] = [
            {
                tokenid: 1,
                address: '0xd457f5d78fg4d4f5d48f7d8d54f5d',
                Owner: 'Sahil Kaushik',
                New_address: '0x4fd5fd54f5d4fd45f54d4f5df4df4',
                New_Owner: 'Satya Pradhan',
                Registrar: 'Mukund Thakur',
            },
        ];
        const found = dummyData.find((item) => item.tokenid === parseInt(id));
        setTransferDetail(found ?? null);
        if (!found) alert('❌ No transfer details found for this Token ID');
    };

    const handleGetDetails = async () => {
        if (!tokenId) return alert('⚠️ Enter a Token ID to fetch details.');
        await fetchTransferDetail(tokenId);
    };

    const handleApprove = async () => {
        if (!account || !tokenId) return alert('⚠️ Connect wallet and enter valid Token ID');
        try {
            await approveLandTransfer(tokenId, account);
            alert(`✅ Land with Token ID ${tokenId} approved for transfer.`);
            setTransferDetail(null);
        } catch (error: any) {
            console.error('Approval error:', error);
            alert(`❌ Error: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <Head>
                <title>Approve Land Transfer | LTS</title>
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
                    <h1 className="text-3xl font-bold font-mono">🚀 Approve Land Transfer</h1>
                </div>
            </header>

            {/* MAIN */}
            <main className="w-full px-8 py-16 relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-6xl bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-12 shadow-2xl"
                >
                    <h2 className="text-3xl font-bold font-mono mb-6">🔍 Get Transfer Details</h2>
                    <div className="mb-6">
                        <label className="block font-mono text-lg mb-2">Token ID</label>
                        <input
                            type="text"
                            value={tokenId}
                            onChange={(e) => setTokenId(e.target.value)}
                            className="w-full bg-black/50 border border-white/30 rounded-lg px-4 py-3 text-white font-mono placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Token ID..."
                        />
                    </div>
                    <button
                        onClick={handleGetDetails}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold font-mono px-6 py-2 rounded-lg transition"
                    >
                        Get Details
                    </button>
                </motion.div>

                {transferDetail && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-6xl mt-10 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-12 shadow-2xl"
                    >
                        <h3 className="text-2xl font-bold font-mono mb-6">📋 Transfer Details</h3>
                        <ul className="space-y-3 text-lg">
                            <li><strong className="font-mono">🔗 Current Owner Address:</strong> {transferDetail.address}</li>
                            <li><strong className="font-mono">👤 Current Owner Name:</strong> {transferDetail.Owner}</li>
                            <li><strong className="font-mono">🔗 New Owner Address:</strong> {transferDetail.New_address}</li>
                            <li><strong className="font-mono">👤 New Owner Name:</strong> {transferDetail.New_Owner}</li>
                            <li><strong className="font-mono">📜 Registrar:</strong> {transferDetail.Registrar}</li>
                        </ul>
                        <button
                            onClick={handleApprove}
                            className="mt-8 bg-green-600 hover:bg-green-700 text-white font-bold font-mono px-8 py-3 rounded-lg transition"
                        >
                            ✅ Approve Transfer
                        </button>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default APPROVAL;
