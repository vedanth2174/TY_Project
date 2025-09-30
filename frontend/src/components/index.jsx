"use client";

import { useState } from "react";

export default function DocumentPlatform() {
  const [issueFile, setIssueFile] = useState(null);
  const [issueWallet, setIssueWallet] = useState("");
  const [issueResult, setIssueResult] = useState("");

  const [validateFile, setValidateFile] = useState(null);
  const [validateWallet, setValidateWallet] = useState("");
  const [validateResult, setValidateResult] = useState("");

  const issueDocument = async () => {
    if (!issueFile || !issueWallet) {
      setIssueResult("Please select a file and enter wallet address!");
      return;
    }

    const formData = new FormData();
    formData.append("file", issueFile);
    formData.append("wallet", issueWallet);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        setIssueResult("Error: " + data.error);
      } else {
        setIssueResult(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      setIssueResult("Error: " + err.message);
    }
  };

  const validateDocument = async () => {
    if (!validateFile || !validateWallet) {
      setValidateResult("Please select a file and enter wallet address!");
      return;
    }

    const formData = new FormData();
    formData.append("file", validateFile);
    formData.append("wallet", validateWallet);

    try {
      const response = await fetch("http://localhost:5000/validate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        setValidateResult("Error: " + data.error);
      } else {
        if (data.timestamp) {
          data.timestamp = new Date(Number(data.timestamp) * 1000).toLocaleString();
        }
        setValidateResult(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      setValidateResult("Error: " + err.message);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <div style={{ marginBottom: "40px" }}>
        <h2>Issue Document</h2>
        <input type="file" onChange={(e) => setIssueFile(e.target.files[0])} /><br />
        <input
          type="text"
          value={issueWallet}
          onChange={(e) => setIssueWallet(e.target.value)}
          placeholder="Enter Wallet Address"
          size="70"
        /><br />
        <button onClick={issueDocument} style={{ marginTop: "10px", padding: "8px 12px", cursor: "pointer" }}>
          Issue Document
        </button>
        <h3>Issue Result:</h3>
        <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>{issueResult}</pre>
      </div>

      <div>
        <h2>Validate Document</h2>
        <input type="file" onChange={(e) => setValidateFile(e.target.files[0])} /><br />
        <input
          type="text"
          value={validateWallet}
          onChange={(e) => setValidateWallet(e.target.value)}
          placeholder="Enter Wallet Address"
          size="70"
        /><br />
        <button onClick={validateDocument} style={{ marginTop: "10px", padding: "8px 12px", cursor: "pointer" }}>
          Validate Document
        </button>
        <h3>Validation Result:</h3>
        <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>{validateResult}</pre>
      </div>
    </div>
  );
}
