import Link from "next/link"

const shellCss = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  a { text-decoration: none; color: inherit; }
  .mw-nav { border-bottom: 2px solid #1a1a1a; background: #faf8f4; position: sticky; top: 0; z-index: 100; }
  .mw-nav-inner { max-width: 1000px; margin: 0 auto; padding: 0 1.5rem; display: flex; align-items: center; justify-content: space-between; height: 56px; }
  .mw-nav-logo { font-family: 'DM Serif Display', serif; font-size: 1.1rem; color: #1a1a1a; }
  .mw-nav-logo em { font-style: italic; color: #b45309; }
  .mw-nav-links { display: flex; gap: 1.5rem; font-size: 12px; letter-spacing: .06em; text-transform: uppercase; }
  .mw-nav-links a { color: #888; transition: color .15s; }
  .mw-nav-links a:hover { color: #1a1a1a; }
  .mw-footer { border-top: 2px solid #1a1a1a; padding: 2rem 1.5rem; margin-top: 2rem; }
  .mw-footer-inner { max-width: 1000px; margin: 0 auto; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
  .mw-footer-logo { font-family: 'DM Serif Display', serif; font-size: 1rem; margin-bottom: .4rem; }
  .mw-footer-logo em { font-style: italic; color: #b45309; }
  .mw-footer-links { display: flex; gap: 1.5rem; font-size: 11px; }
  .mw-footer-links a { color: #888; }
  .mw-footer-disclaimer { font-size: 11px; color: #aaa; margin-top: .4rem; line-height: 1.5; max-width: 540px; }
  .mw-page-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  @media (max-width: 700px) { .mw-nav-links { display: none; } }
`

export function Shell({ children }) {
  return (
    <>
      <style>{shellCss}</style>
      <nav className="mw-nav">
        <div className="mw-nav-inner">
          <Link href="/" className="mw-nav-logo">MoneyWise<em>Calculator</em></Link>
          <div className="mw-nav-links">
            <Link href="/#tools">Tools</Link>
            <Link href="/articles">Articles</Link>
          </div>
        </div>
      </nav>
      <div className="mw-page-wrap">{children}</div>
      <footer className="mw-footer">
        <div className="mw-footer-inner">
          <div>
            <p className="mw-footer-logo">MoneyWise<em>Calculator</em></p>
            <p className="mw-footer-disclaimer">Free personal finance calculators for informational purposes only. Not financial advice. Consult a qualified professional for major financial decisions. This site may use cookies and analytics.</p>
          </div>
          <div className="mw-footer-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
