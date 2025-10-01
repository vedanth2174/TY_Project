"use client"
import './aura.css'
import { useState } from "react"

export default function DocumentPlatform() {
  const [issueFile, setIssueFile] = useState(null)
  const [issueWallet, setIssueWallet] = useState("")
  const [issueResult, setIssueResult] = useState("")

  const [validateFile, setValidateFile] = useState(null)
  const [validateWallet, setValidateWallet] = useState("")
  const [validateResult, setValidateResult] = useState("")

  const issueDocument = async () => {
    if (!issueFile || !issueWallet) {
      setIssueResult("Please select a file and enter wallet address!")
      return
    }

    const formData = new FormData()
    formData.append("file", issueFile)
    formData.append("wallet", issueWallet)

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (data.error) {
        setIssueResult("Error: " + data.error)
      } else {
        setIssueResult(JSON.stringify(data, null, 2))
      }
    } catch (err) {
      setIssueResult("Error: " + err.message)
    }
  }

  const validateDocument = async () => {
    if (!validateFile || !validateWallet) {
      setValidateResult("Please select a file and enter wallet address!")
      return
    }

    const formData = new FormData()
    formData.append("file", validateFile)
    formData.append("wallet", validateWallet)

    try {
      const response = await fetch("http://localhost:5000/validate", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (data.error) {
        setValidateResult("Error: " + data.error)
      } else {
        if (data.timestamp) {
          data.timestamp = new Date(Number(data.timestamp) * 1000).toLocaleString()
        }
        setValidateResult(JSON.stringify(data, null, 2))
      }
    } catch (err) {
      setValidateResult("Error: " + err.message)
    }
  }

  return (
    <main className="dp-app" aria-label="Document Platform">
      <header className="dp-header">
        <div className="dp-brand">
          <span className="dp-dot" aria-hidden="true"></span>
          <h1 className="dp-title">Document Platform</h1>
        </div>
        <p className="dp-subtitle">Documents • File Storage • Validation</p>
      </header>

      <section className="dp-grid" aria-label="Actions">
        <article className="dp-card" aria-labelledby="issue-title">
          <div className="dp-card-head">
            <h2 id="issue-title" className="dp-card-title">
              Issue Document
            </h2>
            <p className="dp-card-caption">Create a verifiable record of your file for future validation.</p>
          </div>

          <div className="dp-field">
            <label htmlFor="issue-file" className="dp-label">
              Select file
            </label>
            <input
              id="issue-file"
              className="dp-input dp-input-file"
              type="file"
              onChange={(e) => setIssueFile(e.target.files[0] || null)}
              aria-describedby="issue-file-hint"
            />
            <div id="issue-file-hint" className="dp-hint">
              Accepted: any file type
            </div>
          </div>

          <div className="dp-field">
            <label htmlFor="issue-wallet" className="dp-label">
              Wallet address
            </label>
            <input
              id="issue-wallet"
              className="dp-input"
              type="text"
              value={issueWallet}
              onChange={(e) => setIssueWallet(e.target.value)}
              placeholder="Enter wallet address"
              inputMode="text"
              aria-required="true"
            />
          </div>

          <div className="dp-actions">
            <button onClick={issueDocument} className="dp-btn">
              Issue Document
            </button>
          </div>

          <div className="dp-result">
            <h3 className="dp-result-title">Issue Result</h3>
            <pre className="dp-pre" aria-live="polite">
              {issueResult}
            </pre>
          </div>
        </article>

        <article className="dp-card" aria-labelledby="validate-title">
          <div className="dp-card-head">
            <h2 id="validate-title" className="dp-card-title">
              Validate Document
            </h2>
            <p className="dp-card-caption">Verify a file against an issued record.</p>
          </div>

          <div className="dp-field">
            <label htmlFor="validate-file" className="dp-label">
              Select file
            </label>
            <input
              id="validate-file"
              className="dp-input dp-input-file"
              type="file"
              onChange={(e) => setValidateFile(e.target.files[0] || null)}
              aria-describedby="validate-file-hint"
            />
            <div id="validate-file-hint" className="dp-hint">
              Accepted: any file type
            </div>
          </div>

          <div className="dp-field">
            <label htmlFor="validate-wallet" className="dp-label">
              Wallet address
            </label>
            <input
              id="validate-wallet"
              className="dp-input"
              type="text"
              value={validateWallet}
              onChange={(e) => setValidateWallet(e.target.value)}
              placeholder="Enter wallet address"
              inputMode="text"
              aria-required="true"
            />
          </div>

          <div className="dp-actions">
            <button onClick={validateDocument} className="dp-btn">
              Validate Document
            </button>
          </div>

          <div className="dp-result">
            <h3 className="dp-result-title">Validation Result</h3>
            <pre className="dp-pre" aria-live="polite">
              {validateResult}
            </pre>
          </div>
        </article>
      </section>


    </main>
  )
}
