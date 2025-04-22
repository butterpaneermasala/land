import { ethers } from "ethers";
import abi from './contractABI.json';

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with actual address
const ABI = abi;

// Connect to MetaMask and return a signer
export const connectWallet = async (): Promise<ethers.Signer | null> => {
    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed!");
        return null;
    }

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        return await provider.getSigner();
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Failed to connect to MetaMask. Please try again.");
        return null;
    }
};

// Get tokens owned by a specific address
export const getTokensByOwner = async (ownerAddress: string): Promise<string[] | null> => {
    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed!");
        return null;
    }

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

        const balance = await contract.balanceOf(ownerAddress);
        const tokenIds: string[] = [];

        for (let i = 0; i < balance; i++) {
            const tokenId = await contract.tokenOfOwnerByIndex(ownerAddress, i);
            tokenIds.push(tokenId.toString());
        }

        return tokenIds;
    } catch (error) {
        console.error("Error fetching tokens:", error);
        alert("Failed to fetch tokens. Please try again.");
        return null;
    }
};

// Get land details by token ID
export const getLandDetails = async (tokenId: string): Promise<any | null> => {
    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed!");
        return null;
    }

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

        const details = await contract.getOwnerDetails(tokenId);
        return details;
    } catch (error) {
        console.error("Error fetching land details:", error);
        alert("Failed to fetch land details. Please try again.");
        return null;
    }
};

// Get contract instance with signer
export const getContract = async (): Promise<ethers.Contract | null> => {
    const signer = await connectWallet();
    if (!signer) {
        alert("No signer found. Please connect MetaMask.");
        return null;
    }

    return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
};

// Register agricultural land
export const registerAgroLand = async (
    name: string,
    to: ethers.AddressLike,
    basrakramank: string,
    district: string,
    tehsil: string,
    gram: string,
    hectare: string,
    father: string,
    map: string,
    b1: string,
    p2: string
): Promise<void> => {
    try {
        const contract = await getContract();
        if (!contract) {
            alert("Failed to connect to contract");
            return;
        }

        const tx = await contract.registerAgro(
            name,
            to,
            basrakramank,
            district,
            tehsil,
            gram,
            hectare,
            father,
            map,
            b1,
            p2
        );

        await tx.wait();
        alert("Agricultural land registered successfully!");
    } catch (error: any) {
        console.error("Error registering agricultural land:", error);
        alert(`Error: ${error.message}`);
    }
};

// Register converted land
export const registerConvertedLand = async (
    name: string,
    to: string,
    bhukhand: string,
    district: string,
    tehsil: string,
    gram: string,
    blockNo: number,
    father: string,
    foot: number,
    map: string
): Promise<void> => {
    try {
        const contract = await getContract();
        if (!contract) {
            alert("Failed to connect to contract");
            return;
        }

        const tx = await contract.registerConverted(
            name,
            to,
            bhukhand,
            district,
            tehsil,
            gram,
            blockNo,
            father,
            foot,
            map
        );

        await tx.wait();
        alert("Converted land registered successfully!");
    } catch (error: any) {
        console.error("Error registering converted land:", error);
        alert(`Error: ${error.message}`);
    }
};

// Get owner details by token ID
export const getOwnerDetails = async (tokenId: number): Promise<any | null> => {
    try {
        const contract = await getContract();
        if (!contract) return null;

        return await contract.getOwnerDetails(tokenId);
    } catch (error) {
        console.error("Error fetching owner details:", error);
        alert("Failed to fetch owner details. Please try again.");
        return null;
    }
};

// Approve transfer of a token
export const approveTransfer = async (tokenId: number): Promise<void> => {
    try {
        const contract = await getContract();
        if (!contract) {
            alert("Failed to connect to contract");
            return;
        }

        const tx = await contract.approveTransfer(tokenId);
        await tx.wait();
        alert("Transfer approved successfully!");
    } catch (error: any) {
        console.error("Error approving transfer:", error);
        alert(`Error: ${error.message}`);
    }
};

// Execute transfer of a token
export const executeTransfer = async (tokenId: number): Promise<void> => {
    try {
        const contract = await getContract();
        if (!contract) {
            alert("Failed to connect to contract");
            return;
        }

        const tx = await contract.executeTransfer(tokenId);
        await tx.wait();
        alert("Transfer executed successfully!");
    } catch (error: any) {
        console.error("Error executing transfer:", error);
        alert(`Error: ${error.message}`);
    }
};

// Get transfer approvals for a token
export const getTransferApprovals = async (tokenId: number): Promise<any | null> => {
    try {
        const contract = await getContract();
        if (!contract) return null;

        return await contract.transferApprovals(tokenId);
    } catch (error) {
        console.error("Error fetching transfer approvals:", error);
        alert("Failed to fetch transfer approvals. Please try again.");
        return null;
    }
};

// Set transfer details for a token
export const setTransferDetails = async (
    tokenId: number,
    name: string,
    to: string,
    regName: string,
    regAddress: string,
    witness1Name: string,
    witness1Address: string,
    witness2Name: string,
    witness2Address: string,
    newOwner: string,
    newOwnerName: string,
    newFather: string
): Promise<void> => {
    try {
        const contract = await getContract();
        if (!contract) {
            alert("Failed to connect to contract");
            return;
        }

        const tx = await contract.setTransferDetails(
            tokenId,
            name,
            to,
            regName,
            regAddress,
            witness1Name,
            witness1Address,
            witness2Name,
            witness2Address,
            newOwner,
            newOwnerName,
            newFather
        );

        await tx.wait();
        alert("Transfer details set successfully!");
    } catch (error: any) {
        console.error("Error setting transfer details:", error);
        alert(`Error: ${error.message}`);
    }
};