import Link from "next/link"
import { ALL_TOOLS } from "./lib/links"

const ARTICLES = [
  { slug: "how-much-house-can-i-afford", title: "How Much House Can I Afford on My Salary?", date: "May 2025", readTime: "6 min read", excerpt: "The 28% rule, DTI limits, and a realistic look at what lenders will approve — vs what you can actually live with." },
  { slug: "how-much-emergency-fund-do-i-need", title: "How Much Should You Have in an Emergency Fund?", date: "May 2025", readTime: "5 min read", excerpt: "Three months or six? The answer depends on your job stability, household structure, and risk tolerance." },
  { slug: "snowball-vs-avalanche-debt", title: "Debt Snowball vs Avalanche: Which Method Wins?", date: "May 2025", readTime: "7 min read", excerpt: "The math says avalanche. The psychology says snowball. Here's how to decide which one is right for you." },
  { slug: "how-much-save-for-retirement-by-age", title: "How Much Should You Have Saved for Retirement by Age?", date: "May 2025", readTime: "8 min read", excerpt: "Benchmarks for every decade — and what to do if you're behind the curve." },
  { slug: "subscription-creep-costing-you", title: "Subscription Creep: How Small Monthly Charges Add Up to Thousands", date: "May 2025", readTime: "5 min read", excerpt: "The average household vastly underestimates their subscription spending. Here's how to find every charge and decide what stays." },
]

export default function HomePage() {
  return (
    <>
      <style>{`
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

        .mw-hero { max-width: 1000px; margin: 0 auto; padding: 4rem 1.5rem 3rem; }
        .mw-hero-eyebrow { font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: #888; margin-bottom: .75rem; }
        .mw-hero-title { font-family: 'DM Serif Display', serif; font-size: clamp(2.5rem, 6vw, 4.5rem); line-height: 1.05; margin-bottom: 1.25rem; max-width: 720px; }
        .mw-hero-title em { font-style: italic; color: #b45309; }
        .mw-hero-sub { font-size: 14px; color: #555; line-height: 1.7; max-width: 560px; margin-bottom: 2rem; }
        .mw-hero-cta { display: inline-flex; gap: 1rem; flex-wrap: wrap; }
        .mw-btn { display: inline-block; padding: .75rem 1.5rem; font-family: 'DM Mono', monospace; font-size: 12px; letter-spacing: .06em; text-transform: uppercase; border-radius: 2px; transition: all .15s; cursor: pointer; }
        .mw-btn-primary { background: #1a1a1a; color: #fff; border: 1.5px solid #1a1a1a; }
        .mw-btn-primary:hover { background: #b45309; border-color: #b45309; }
        .mw-btn-secondary { background: none; color: #1a1a1a; border: 1.5px solid #1a1a1a; }
        .mw-btn-secondary:hover { border-color: #b45309; color: #b45309; }

        .mw-section { max-width: 1000px; margin: 0 auto; padding: 0 1.5rem 4rem; }
        .mw-section-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid #e0dbd3; padding-bottom: .75rem; }
        .mw-section-title { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #1a1a1a; }
        .mw-section-link { font-size: 12px; letter-spacing: .06em; text-transform: uppercase; color: #b45309; }
        .mw-section-link:hover { text-decoration: underline; }

        .mw-tools-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .mw-tool-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.25rem 1.5rem; transition: all .2s; display: block; }
        .mw-tool-card:hover { border-color: #b45309; transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,.06); }
        .mw-tool-icon { font-size: 1.5rem; margin-bottom: .6rem; }
        .mw-tool-title { font-family: 'DM Serif Display', serif; font-size: 1rem; color: #1a1a1a; margin-bottom: .4rem; line-height: 1.3; }
        .mw-tool-desc { font-size: 12px; color: #888; line-height: 1.5; }
        .mw-tool-cta { font-size: 11px; letter-spacing: .06em; text-transform: uppercase; margin-top: .75rem; display: inline-block; }

        .mw-articles-list { display: flex; flex-direction: column; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 4px; overflow: hidden; }
        .mw-article-row { background: #fff; padding: 1.25rem 1.5rem; display: flex; align-items: flex-start; gap: 1.5rem; transition: background .15s; }
        .mw-article-row:hover { background: #fdf9f5; }
        .mw-article-meta { font-size: 11px; color: #aaa; white-space: nowrap; padding-top: .2rem; min-width: 80px; }
        .mw-article-content { flex: 1; }
        .mw-article-title { font-family: 'DM Serif Display', serif; font-size: 1.05rem; color: #1a1a1a; margin-bottom: .3rem; line-height: 1.3; }
        .mw-article-excerpt { font-size: 12px; color: #888; line-height: 1.5; }
        .mw-article-arrow { font-size: 1rem; color: #ccc; align-self: center; flex-shrink: 0; }

        .mw-why { background: #fff; border-top: 1px solid #e0dbd3; border-bottom: 1px solid #e0dbd3; padding: 3rem 0; margin-bottom: 4rem; }
        .mw-why-inner { max-width: 1000px; margin: 0 auto; padding: 0 1.5rem; }
        .mw-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 1.5rem; }
        .mw-why-item { }
        .mw-why-num { font-family: 'DM Serif Display', serif; font-size: 2.5rem; color: #e0dbd3; line-height: 1; margin-bottom: .5rem; }
        .mw-why-title { font-size: 13px; font-weight: 500; color: #1a1a1a; margin-bottom: .3rem; }
        .mw-why-body { font-size: 12px; color: #888; line-height: 1.6; }

        .mw-footer { border-top: 2px solid #1a1a1a; padding: 2rem 1.5rem; }
        .mw-footer-inner { max-width: 1000px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .mw-footer-logo { font-family: 'DM Serif Display', serif; font-size: 1rem; }
        .mw-footer-logo em { font-style: italic; color: #b45309; }
        .mw-footer-links { display: flex; gap: 1.5rem; font-size: 11px; color: #888; }
        .mw-footer-links a { color: #888; }
        .mw-footer-links a:hover { color: #1a1a1a; }
        .mw-footer-disclaimer { font-size: 11px; color: #aaa; margin-top: .5rem; line-height: 1.5; max-width: 600px; }

        @media (max-width: 700px) {
          .mw-tools-grid { grid-template-columns: 1fr; }
          .mw-why-grid { grid-template-columns: 1fr; }
          .mw-nav-links { display: none; }
          .mw-article-meta { display: none; }
        }
      `}</style>

      {/* NAV */}
      <nav className="mw-nav">
        <div className="mw-nav-inner">
          <Link href="/" className="mw-nav-logo">MoneyWise<em>Calculator</em></Link>
          <div className="mw-nav-links">
            <Link href="/#tools">Tools</Link>
            <Link href="/articles">Articles</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="mw-hero">
        <p className="mw-hero-eyebrow">Free personal finance tools </p>
        <h1 className="mw-hero-title">Make smarter<br />money decisions<br /><em>with better math.</em></h1>
        <p className="mw-hero-sub">Free calculators that show you exactly where you stand — on your mortgage, retirement, debt, emergency savings, and more. No signup, no fluff, just numbers.</p>
        <div className="mw-hero-cta">
          <Link href="/#tools" className="mw-btn mw-btn-primary">Explore the tools</Link>
          <Link href="/articles" className="mw-btn mw-btn-secondary">Read the guides</Link>
        </div>
      </div>

      {/* TOOLS */}
      <div className="mw-section" id="tools">
        <div className="mw-section-header">
          <h2 className="mw-section-title">Calculators</h2>
        </div>
        <div className="mw-tools-grid">
          {ALL_TOOLS.map((tool) => (
            <Link href={`/tools/${tool.slug}`} className="mw-tool-card" key={tool.slug}>
              <div className="mw-tool-icon">{tool.icon}</div>
              <p className="mw-tool-title">{tool.title}</p>
              <p className="mw-tool-desc">{tool.description}</p>
              <span className="mw-tool-cta" style={{ color: tool.color }}>Use calculator →</span>
            </Link>
          ))}
        </div>
      </div>

      {/* WHY */}
      <div className="mw-why">
        <div className="mw-why-inner">
          <div className="mw-section-header" style={{ borderBottom: "1px solid #e0dbd3", paddingBottom: ".75rem", marginBottom: 0 }}>
            <h2 className="mw-section-title">Why MoneyWise</h2>
          </div>
          <div className="mw-why-grid">
            <div className="mw-why-item">
              <p className="mw-why-num">01</p>
              <p className="mw-why-title">No signup required</p>
              <p className="mw-why-body">Every tool works instantly in your browser. No account, no email, no subscription. Your numbers stay on your device.</p>
            </div>
            <div className="mw-why-item">
              <p className="mw-why-num">02</p>
              <p className="mw-why-title">Built for real decisions</p>
              <p className="mw-why-body">Each calculator accounts for the costs and variables that matter — taxes, fees, inflation, and the numbers most tools quietly ignore.</p>
            </div>
            <div className="mw-why-item">
              <p className="mw-why-num">03</p>
              <p className="mw-why-title">Paired with honest guidance</p>
              <p className="mw-why-body">Every tool comes with plain-language explanations of what the numbers mean and what to do about them.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLES */}
      <div className="mw-section">
        <div className="mw-section-header">
          <h2 className="mw-section-title">Guides &amp; Articles</h2>
          <Link href="/articles" className="mw-section-link">All articles →</Link>
        </div>
        <div className="mw-articles-list">
          {ARTICLES.map((a) => (
            <Link href={`/articles/${a.slug}`} className="mw-article-row" key={a.slug}>
              <div className="mw-article-meta">{a.readTime}</div>
              <div className="mw-article-content">
                <p className="mw-article-title">{a.title}</p>
                <p className="mw-article-excerpt">{a.excerpt}</p>
              </div>
              <span className="mw-article-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mw-footer">
        <div className="mw-footer-inner">
          <div>
            <p className="mw-footer-logo">MoneyWise<em>Calculator</em></p>
            <p className="mw-footer-disclaimer">Free personal finance calculators for informational purposes only. Not financial advice. Always consult a qualified professional for major financial decisions.</p>
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
