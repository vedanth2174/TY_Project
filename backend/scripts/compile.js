import fs from 'fs';
import solc from 'solc';
import dotenv from 'dotenv';

dotenv.config();
const source = fs.readFileSync('./contracts/DocumentRegistry.sol', 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'DocumentRegistry.sol': { content: source }
    },
    settings: { outputSelection: { '*': { '*': ['abi', 'evm.bytecode'] } } }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const contract = output.contracts['DocumentRegistry.sol']['DocumentRegistry'];

fs.writeFileSync('./contracts/DocumentRegistryABI.json', JSON.stringify(contract.abi, null, 2));
fs.writeFileSync('./contracts/DocumentRegistryBytecode.json', JSON.stringify(contract.evm.bytecode.object));
console.log("Contract compiled successfully!");
