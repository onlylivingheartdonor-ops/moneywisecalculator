"use client"
import Link from "next/link"
import { Shell } from "../lib/shell"

const ARTICLES = [
  { slug: "how-much-house-can-i-afford", title: "How Much House Can I Afford on My Salary?", date: "May 2025", readTime: "6 min read", category: "Home Buying", excerpt: "The 28% rule, DTI limits, and a realistic look at what lenders will approve — vs what you can actually live with." },
  { slug: "how-much-emergency-fund-do-i-need", title: "How Much Should You Have in an Emergency Fund?", date: "May 2025", readTime: "5 min read", category: "Saving", excerpt: "Three months or six? The answer depends on your job stability, household structure, and risk tolerance." },
  { slug: "snowball-vs-avalanche-debt", title: "Debt Snowball vs Avalanche: Which Method Wins?", date: "May 2025", readTime: "7 min read", category: "Debt", excerpt: "The math says avalanche. The psychology says snowball. Here's how to decide which one is right for you." },
  { slug: "how-much-save-for-retirement-by-age", title: "How Much Should You Have Saved for Retirement by Age?", date: "May 2025", readTime: "8 min read", category: "Retirement", excerpt: "Benchmarks for every decade — and what to do if you're behind the curve." },
  { slug: "subscription-creep-costing-you", title: "Subscription Creep: How Small Monthly Charges Add Up to Thousands", date: "May 2025", readTime: "5 min read", category: "Budgeting", excerpt: "The average household vastly underestimates their subscription spending. Here's how to find every charge and decide what stays." },
]

export default function ArticlesPage() {
  return (
    <Shell>
      <style>{`
        .art-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
        .art-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
        .art-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3rem); line-height: 1.1; }
        .art-title em { font-style: italic; color: #b45309; }
        .art-list { display: flex; flex-direction: column; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 4px; overflow: hidden; }
        .art-row { background: #fff; padding: 1.25rem 1.5rem; display: flex; align-items: flex-start; gap: 1.5rem; transition: background .15s; text-decoration: none; color: inherit; }
        .art-row:hover { background: #fdf9f5; }
        .art-left { min-width: 90px; }
        .art-cat { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #b45309; margin-bottom: .2rem; }
        .art-time { font-size: 11px; color: #aaa; }
        .art-row-title { font-family: 'DM Serif Display', serif; font-size: 1.05rem; color: #1a1a1a; margin-bottom: .3rem; line-height: 1.3; }
        .art-excerpt { font-size: 12px; color: #888; line-height: 1.5; }
        .art-arrow { font-size: 1rem; color: #ccc; align-self: center; flex-shrink: 0; margin-left: auto; }
      `}</style>
      <div className="art-header">
        <p className="art-eyebrow">Personal finance</p>
        <h1 className="art-title">Guides &amp;<br /><em>Articles</em></h1>
      </div>
      <div className="art-list">
        {ARTICLES.map(a => (
          <Link href={`/articles/${a.slug}`} className="art-row" key={a.slug}>
            <div className="art-left">
              <p className="art-cat">{a.category}</p>
              <p className="art-time">{a.readTime}</p>
            </div>
            <div style={{ flex: 1 }}>
              <p className="art-row-title">{a.title}</p>
              <p className="art-excerpt">{a.excerpt}</p>
            </div>
            <span className="art-arrow">→</span>
          </Link>
        ))}
      </div>
    </Shell>
  )
}
