'use client';

import { NextPage } from 'next';
import Head from 'next/head';
import { useWallet } from '../contexts/WalletContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

interface LandProperty {
    tokenId: number;
    landName: string;
    location: string;
    area: string;
    owner: string;
}

const Manage: NextPage = () => {
    const { account } = useWallet();
    const router = useRouter();
    const [lands, setLands] = useState<LandProperty[]>([]);
    const [filteredLands, setFilteredLands] = useState<LandProperty[]>([]);
    const [searchId, setSearchId] = useState('');

    useEffect(() => {
        const dummyData: LandProperty[] = [
            {
                tokenId: 1,
                landName: 'Green Acres',
                location: 'District A, Tehsil X',
                area: '2000 sq.ft',
                owner: account || '0x123...',
            },
            {
                tokenId: 2,
                landName: 'Sunshine Fields',
                location: 'District B, Tehsil Y',
                area: '3500 sq.ft',
                owner: account || '0x123...',
            },
        ];
        setLands(dummyData);
        setFilteredLands(dummyData);
    }, [account]);

    const handleSearch = () => {
        if (searchId.trim() === '') {
            setFilteredLands(lands);
        } else {
            const filtered = lands.filter((land) => land.tokenId === Number(searchId));
            setFilteredLands(filtered);
        }
    };

    const handleMoreDetails = (tokenId: number) => {
        router.push(`/details?tokenId=${tokenId}`);
    };

    const handleTransferLand = (tokenId: number) => {
        router.push(`/transfer`);
    };

    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden">
            <Head>
                <title>Manage Land | LTS</title>
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
                    <h1 className="text-3xl font-bold font-mono">Manage My Lands</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto py-12 px-4 relative z-10">
                <div className="mb-6 flex space-x-4 items-center">
                    <input
                        type="text"
                        placeholder="Search by Token ID"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="p-2 border border-white bg-black text-white font-mono w-64 placeholder:text-gray-300"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-white text-black px-4 py-2 font-mono hover:bg-gray-200"
                    >
                        Search
                    </button>
                </div>

                {filteredLands.length === 0 ? (
                    <p className="font-mono text-lg text-red-400">No land records found.</p>
                ) : (
                    <div className="space-y-6">
                        {filteredLands.map((land) => (
                            <motion.div
                                key={land.tokenId}
                                className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl rounded-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h2 className="text-xl font-bold font-mono mb-2">
                                    Token ID: {land.tokenId}
                                </h2>
                                <p className="font-mono">Land Name: {land.landName}</p>
                                <p className="font-mono">Location: {land.location}</p>
                                <p className="font-mono">Area: {land.area}</p>
                                <p className="font-mono">Owner: {land.owner}</p>
                                <div className="mt-4 flex space-x-4">
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 font-mono hover:bg-blue-700"
                                        onClick={() => handleMoreDetails(land.tokenId)}
                                    >
                                        Get More Details
                                    </button>
                                    <button
                                        className="bg-green-600 text-white px-4 py-2 font-mono hover:bg-green-700"
                                        onClick={() => handleTransferLand(land.tokenId)}
                                    >
                                        Transfer Land
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Manage;
