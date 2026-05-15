"use client"
import { Shell } from "../lib/shell"
export default function Terms() {
  return (
    <Shell>
      <style>{`
        .static-title { font-family: 'DM Serif Display', serif; font-size: 2rem; margin-bottom: 1.5rem; border-bottom: 2px solid #1a1a1a; padding-bottom: 1rem; }
        .static-h2 { font-family: 'DM Serif Display', serif; font-size: 1.1rem; margin: 1.5rem 0 .5rem; }
        .static-body { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
      `}</style>
      <h1 className="static-title">Terms of Service</h1>
      <p className="static-body">Last updated: May 2025</p>
      <h2 className="static-h2">Use of calculators</h2>
      <p className="static-body">All tools on this site are provided for informational and educational purposes only. Results are estimates based on the inputs you provide and should not be construed as financial, tax, legal, or investment advice.</p>
      <h2 className="static-h2">No warranties</h2>
      <p className="static-body">We make no warranties regarding the accuracy or completeness of calculator results. Always consult a qualified professional before making major financial decisions.</p>
      <h2 className="static-h2">Limitation of liability</h2>
      <p className="static-body">MoneyWiseCalculator.com is not liable for any financial decisions made based on the use of our tools.</p>
    </Shell>
  )
}
