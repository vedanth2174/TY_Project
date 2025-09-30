import { ethers } from 'ethers';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

async function deploy() {
    const abi = JSON.parse(fs.readFileSync('./contracts/DocumentRegistryABI.json'));
    const bytecode = JSON.parse(fs.readFileSync('./contracts/DocumentRegistryBytecode.json'));

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy();
    await contract.deployed();

    console.log("Contract deployed at:", contract.address);
}

deploy();
