// backend/services/ipfsBlockchain.js

import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import crypto from 'node:crypto'; // use node: prefix in ESM

dotenv.config();

/**
 * Uploads a file to Pinata (IPFS) and returns the CID
 * @param {string} filePath - Path to the file
 * @returns {string} CID
 */
export async function uploadToIPFS(filePath) {
    try {
        const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
        const data = new FormData();
        data.append("file", fs.createReadStream(filePath));

        const res = await axios.post(url, data, {
            maxBodyLength: "Infinity",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                "pinata_api_key": process.env.PINATA_API_KEY,
                "pinata_secret_api_key": process.env.PINATA_API_SECRET,
            },
        });

        return res.data.IpfsHash; // CID
    } catch (err) {
        console.error("IPFS upload failed:", err.response?.data || err.message);
        throw new Error("Failed to upload file to IPFS");
    }
}

export async function getDocumentStatus(filePath, wallet) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    const docHash = ethers.keccak256(ethers.toUtf8Bytes(fileHash + wallet));

    const abi = JSON.parse(fs.readFileSync('./contracts/DocumentRegistryABI.json'));
    const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, provider);

    const [valid, cidOnChain, issuedTo, timestamp, revoked] = await contract.verifyDocument(docHash);

    return { 
      valid, 
      cidOnChain, 
      issuedTo, 
      timestamp: timestamp.toString(), // Convert BigInt to string
      revoked 
    };
  } catch (err) {
    console.error("Error validating document:", err);
    throw err;
  }
}

/**
 * Stores document hash on Ethereum blockchain
 * @param {string} filePath - Path to file
 * @param {string} userWallet - User's Ethereum address
 */
export async function storeDocument(filePath, userWallet) {
    try {
        // Step 1: Upload to IPFS
        const cid = await uploadToIPFS(filePath);
        const fileBuffer = fs.readFileSync(filePath);
        const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

        // Step 2: Generate unique document hash (CID + wallet + timestamp)
        const timestamp = Date.now();
        const docHash = ethers.keccak256(ethers.toUtf8Bytes(fileHash + userWallet ));

        // Step 3: Load contract ABI and address
        const abi = JSON.parse(fs.readFileSync('./contracts/DocumentRegistryABI.json'));
        const contractAddress = process.env.CONTRACT_ADDRESS;

        // Step 4: Connect to Ethereum
        const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
        const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
        const contract = new ethers.Contract(contractAddress, abi, wallet);

        // Step 5: Send transaction to issue document
        const tx = await contract.issueDocument(docHash, cid, userWallet);
        console.log("Transaction sent. Hash:", tx.hash);
        await tx.wait();
        console.log("Document issued successfully! Hash:", docHash, "CID:", cid);

        return { docHash, cid, txHash: tx.hash };
    } catch (err) {
        console.error("Error storing document on blockchain:", err.reason || err.message || err);
        throw new Error("Failed to store document on blockchain");
    }
}
