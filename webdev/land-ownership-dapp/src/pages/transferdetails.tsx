'use client';

import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { motion } from 'framer-motion';

const TransferDetails: NextPage = () => {
    const [tokenId, setTokenId] = useState('');
    const [newOwner, setNewOwner] = useState('');
    const [status, setStatus] = useState('Pending');
    const [executed, setExecuted] = useState(false);

    const handleSetTransfer = () => {
        if (!tokenId || !newOwner) {
            alert('Please fill in all details.');
            return;
        }
        alert(`Transfer set for Token ID ${tokenId} to ${newOwner}`);
    };

    const handleCheckStatus = () => {
        alert(`Approval status for Token ID ${tokenId}: ${status}`);
    };

    const handleExecuteTransfer = () => {
        if (status !== 'Approved') {
            alert('Cannot execute transfer. Approval pending.');
            return;
        }
        setExecuted(true);
        alert(`Land with Token ID ${tokenId} transferred to ${newOwner}`);
    };

    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden font-mono">
            <Head>
                <title>Transfer Details | LTS</title>
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

            {/* Floating Nebula */}
            <motion.div
                className="absolute top-[30%] left-[20%] w-[1000px] h-[1000px] rounded-full bg-gradient-radial from-purple-500 via-indigo-800 to-transparent opacity-20 blur-[250px]"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.15, 0.2, 0.15],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Header */}
            <header className="bg-black/80 text-white p-4 border-b border-white/20 backdrop-blur-md relative z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold font-mono">Transfer Details</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto py-12 px-4 relative z-10 flex flex-col items-center">
                <div className="w-full max-w-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-8 rounded-xl shadow-2xl space-y-12">

                    {/* SET TRANSFER */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Set Transfer Land Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-1">Token ID</label>
                                <input
                                    type="text"
                                    value={tokenId}
                                    onChange={(e) => setTokenId(e.target.value)}
                                    className="w-full rounded-lg bg-white/10 border border-white/30 text-white p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter Token ID"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">New Owner Address</label>
                                <input
                                    type="text"
                                    value={newOwner}
                                    onChange={(e) => setNewOwner(e.target.value)}
                                    className="w-full rounded-lg bg-white/10 border border-white/30 text-white p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter new owner address"
                                />
                            </div>
                            <button
                                onClick={handleSetTransfer}
                                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-bold"
                            >
                                Set Transfer Details
                            </button>
                        </div>
                    </section>

                    {/* CHECK STATUS */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">See Approval Status</h2>
                        <button
                            onClick={handleCheckStatus}
                            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-bold"
                        >
                            Check Status
                        </button>
                        <p className="mt-2 text-lg">Current Status: <span className="font-semibold">{status}</span></p>
                    </section>

                    {/* EXECUTE TRANSFER */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Execute Transfer</h2>
                        <button
                            onClick={handleExecuteTransfer}
                            className={`w-full px-6 py-3 font-bold rounded-lg transition ${status === 'Approved'
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'bg-gray-600 cursor-not-allowed'
                                }`}
                            disabled={status !== 'Approved'}
                        >
                            Execute Transfer
                        </button>
                        {executed && (
                            <p className="mt-2 text-green-400 font-semibold">
                                Transfer executed successfully!
                            </p>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default TransferDetails;
