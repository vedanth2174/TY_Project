import "./landing.css"

export default function Landing() {
  return (
    <main className="landing">
      <header className="landing__header" role="banner">
        <div className="container header__inner">
          <a href="#home" className="brand" aria-label="Home">
            <span className="brand__mark" aria-hidden="true">
              ◆
            </span>
            <span className="brand__name">ChainVerify</span>
          </a>
          <nav aria-label="Primary" className="nav">
            <a href="#features" className="nav__link">
              Features
            </a>
            <a href="#how" className="nav__link">
              How it works
            </a>
            <a href="#faq" className="nav__link">
              FAQ
            </a>
            <a href="#cta" className="nav__cta">
              Get Started
            </a>
          </nav>
        </div>
      </header>

      <section id="home" className="hero" role="region" aria-labelledby="hero-heading">
        <div className="container hero__inner">
          <div className="hero__content">
            <h1 id="hero-heading" className="hero__title text-balance">
              Verify documents on-chain with calm confidence
            </h1>
            <p className="hero__subtitle text-pretty">
              A silent-fresh design with minimal colors—no noise, no clutter. Issue, verify, and trust documents secured
              by the blockchain.
            </p>
            <div className="hero__actions">
              <a href="#cta" className="btn btn--primary">
                Start verifying
              </a>
              <a href="#features" className="btn btn--ghost">
                See features
              </a>
            </div>
            <ul className="hero__highlights" aria-label="Key highlights">
              <li>Instant authenticity checks</li>
              <li>Immutable audit trail</li>
              <li>Simple, secure sharing</li>
            </ul>
          </div>

          <div className="hero__panel" aria-hidden="true">
            <div className="panel card card--elev">
              <div className="panel__row">
                <span className="dot dot--ok" aria-hidden="true"></span>
                <span className="panel__label">Signature</span>
                <span className="panel__value">Valid</span>
              </div>
              <div className="panel__row">
                <span className="dot dot--ok" aria-hidden="true"></span>
                <span className="panel__label">Chain</span>
                <span className="panel__value">Mainnet</span>
              </div>
              <div className="panel__row">
                <span className="dot dot--ok" aria-hidden="true"></span>
                <span className="panel__label">Timestamp</span>
                <span className="panel__value">Just now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Trusted by" className="trust">
        <div className="container trust__inner">
          <span className="trust__label">Trusted by teams</span>
          <ul className="trust__logos">
            <li>Oak Labs</li>
            <li>MintWorks</li>
            <li>LedgerLeaf</li>
            <li>ClearSeal</li>
          </ul>
        </div>
      </section>

      <section id="features" className="features" role="region" aria-labelledby="features-heading">
        <div className="container">
          <h2 id="features-heading" className="section__title">
            Everything you need to trust
          </h2>
          <p className="section__lead">Keep it simple: issue, verify, and track documents with quiet clarity.</p>
          <div className="features__grid">
            <article className="feature card">
              <h3 className="feature__title">One-click verification</h3>
              <p className="feature__text">Drag-and-drop a file to confirm authenticity instantly.</p>
            </article>
            <article className="feature card">
              <h3 className="feature__title">On-chain integrity</h3>
              <p className="feature__text">Immutable proofs stored securely on the blockchain.</p>
            </article>
            <article className="feature card">
              <h3 className="feature__title">Share with ease</h3>
              <p className="feature__text">Generate clean, verifiable links with minimal friction.</p>
            </article>
            <article className="feature card">
              <h3 className="feature__title">Privacy-first</h3>
              <p className="feature__text">Hash-only storage keeps content private and safe.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="how" className="how" role="region" aria-labelledby="how-heading">
        <div className="container">
          <h2 id="how-heading" className="section__title">
            How it works
          </h2>
          <ol className="how__steps">
            <li>
              <span className="step__badge">1</span>
              <div>
                <h3 className="step__title">Upload or hash</h3>
                <p className="step__text">Create a proof from your doc with a single action.</p>
              </div>
            </li>
            <li>
              <span className="step__badge">2</span>
              <div>
                <h3 className="step__title">Anchor on-chain</h3>
                <p className="step__text">We commit a fingerprint to the blockchain for you.</p>
              </div>
            </li>
            <li>
              <span className="step__badge">3</span>
              <div>
                <h3 className="step__title">Verify anywhere</h3>
                <p className="step__text">Share a link—others can confirm integrity instantly.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section id="faq" className="faq" role="region" aria-labelledby="faq-heading">
        <div className="container">
          <h2 id="faq-heading" className="section__title">
            Frequently asked questions
          </h2>
          <div className="faq__list">
            <details className="card">
              <summary>Do you store my documents?</summary>
              <p>No. Only cryptographic hashes and minimal metadata for verification.</p>
            </details>
            <details className="card">
              <summary>Which chains do you support?</summary>
              <p>Start on mainnet; expand to testnets and L2s as needed.</p>
            </details>
            <details className="card">
              <summary>Is this compliant for audits?</summary>
              <p>Immutable records provide traceability and tamper-evidence.</p>
            </details>
          </div>
        </div>
      </section>

      <section id="cta" className="cta" role="region" aria-labelledby="cta-heading">
        <div className="container cta__inner card card--elev">
          <div>
            <h2 id="cta-heading" className="cta__title">
              Start verifying with ease
            </h2>
            <p className="cta__text">Quiet design. Strong guarantees.</p>
          </div>
          <a href="#home" className="btn btn--primary">
            Get Started
          </a>
        </div>
      </section>

      <footer className="footer" role="contentinfo">
        <div className="container footer__inner">
          <p className="footer__copy">© {new Date().getFullYear()} ChainVerify</p>
          <nav aria-label="Footer" className="footer__links">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#faq">FAQ</a>
            <a href="#cta">Get Started</a>
          </nav>
        </div>
      </footer>
    </main>
  )
}
