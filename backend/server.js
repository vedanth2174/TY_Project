// backend/server.js

import express from 'express';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import dotenv from 'dotenv';
import cors from 'cors';
import { storeDocument,getDocumentStatus } from './services/ipfsBlockchain.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(cors());
// Ensure temp folder exists
if (!fs.existsSync('./temp')) {
    fs.mkdirSync('./temp');
}

app.post('/upload', async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }

        const file = req.files.file;
        const wallet = req.body.wallet;

        if (!wallet) {
            return res.status(400).send({ error: 'User wallet address is required' });
        }

        // Save file temporarily
        const filePath = `./temp/${Date.now()}-${file.name}`;
        await file.mv(filePath);

        // Upload to IPFS and store on blockchain
        const result = await storeDocument(filePath, wallet);

        // Delete temp file
        fs.unlinkSync(filePath);

        // Send success response with document info
        res.send({ success: true, docHash: result.docHash, cid: result.cid, txHash: result.txHash });
    } catch (err) {
        console.error("Error in /upload route:", err);
        res.status(500).send({ error: err.message });
    }
});


// New /validate route
app.post('/validate', async (req, res) => {
  try {
    const file = req.files.file;
    const wallet = req.body.wallet;

    if (!file || !wallet) {
      return res.status(400).send({ error: "File and wallet required" });
    }

    const filePath = `./temp/${file.name}`;
    await file.mv(filePath);

    // Call helper to validate document
    const validation = await getDocumentStatus(filePath, wallet);
    console.log(validation)
    fs.unlinkSync(filePath);

    res.json(validation);
  } catch (err) {
    console.error("Error in /validate route:", err);
    res.status(500).send({ error: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
