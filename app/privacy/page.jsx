"use client"
import { Shell } from "../lib/shell"
export default function Privacy() {
  return (
    <Shell>
      <style>{`
        .static-title { font-family: 'DM Serif Display', serif; font-size: 2rem; margin-bottom: 1.5rem; border-bottom: 2px solid #1a1a1a; padding-bottom: 1rem; }
        .static-h2 { font-family: 'DM Serif Display', serif; font-size: 1.1rem; margin: 1.5rem 0 .5rem; }
        .static-body { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
      `}</style>
      <h1 className="static-title">Privacy Policy</h1>
      <p className="static-body">Last updated: May 2025</p>
      <h2 className="static-h2">Information we collect</h2>
      <p className="static-body">This site uses Google Analytics and Google AdSense, which may collect anonymized usage data including pages visited, time on site, and general location. All calculator inputs are processed locally in your browser and are never transmitted to our servers.</p>
      <h2 className="static-h2">Cookies</h2>
      <p className="static-body">We use cookies for analytics and advertising purposes through Google. You can opt out of personalized advertising through Google's ad settings.</p>
      <h2 className="static-h2">Contact</h2>
      <p className="static-body">For privacy questions, contact us through our website.</p>
    </Shell>
  )
}
