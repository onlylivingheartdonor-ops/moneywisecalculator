"use client"
import { Shell } from "../../lib/shell"
import { useState } from "react"
import Link from "next/link"

const toolCss = `
  .tool-back { font-size: 12px; color: #888; margin-bottom: 1.5rem; display: inline-block; text-decoration: none; }
  .tool-back:hover { color: #1a1a1a; }
  .tool-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .tool-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .tool-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3rem); line-height: 1.1; }
  .tool-title em { font-style: italic; color: #b45309; }
  .tool-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .tool-tabs { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; margin-bottom: 1.5rem; }
  .tool-tab { padding: .65rem 1rem; border: 1px solid #e0dbd3; border-radius: 2px; font-family: 'DM Mono', monospace; font-size: 12px; color: #555; cursor: pointer; background: none; text-align: center; transition: all .15s; }
  .tool-tab.on { border-color: #b45309; background: #fefce8; color: #b45309; }
  .tool-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
  .tool-field-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .4rem; }
  .tool-field-hint { font-size: 12px; color: #888; margin-top: .3rem; }
  .tool-input-wrap { position: relative; }
  .tool-prefix { position: absolute; left: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .tool-suffix { position: absolute; right: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .tool-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 1.2rem; outline: none; transition: border-color .2s; }
  .tool-input.no-prefix { padding-left: 0; }
  .tool-input:focus { border-color: #b45309; }
  .tool-range-header { display: flex; justify-content: space-between; margin-bottom: .4rem; }
  .tool-range-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; }
  .tool-range-val { font-family: 'DM Serif Display', serif; font-size: 1.3rem; color: #b45309; }
  .tool-range { width: 100%; accent-color: #b45309; height: 4px; cursor: pointer; margin-bottom: 1.25rem; }
  .tool-result-hero { background: #fffbeb; border: 1px solid #fde68a; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; text-align: center; }
  .tool-result-eyebrow { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: #92400e; margin-bottom: .3rem; }
  .tool-result-val { font-family: 'DM Serif Display', serif; font-size: 3rem; color: #92400e; line-height: 1; }
  .tool-result-sub { font-size: 12px; color: #78350f; margin-top: .5rem; opacity: .8; }
  .tool-result-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.25rem; }
  .tool-result-cell { background: #fff; padding: 1rem; }
  .tool-result-cell-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .tool-result-cell-val { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: #1a1a1a; }
  .tool-result-cell-val.amber { color: #b45309; }
  .tool-result-cell-val.red { color: #b91c1c; }
  .tool-result-cell-val.green { color: #166534; }
  .tool-article-link { display: block; background: #faf8f4; border: 1px solid #e0dbd3; border-radius: 3px; padding: .9rem 1.25rem; font-size: 13px; color: #555; text-decoration: none; margin-top: 1rem; transition: border-color .15s; }
  .tool-article-link:hover { border-color: #b45309; color: #1a1a1a; }
  @media (max-width: 600px) { .tool-field-row, .tool-result-grid { grid-template-columns: 1fr; } }
`

function fmt(n) { return "$" + Math.round(n).toLocaleString("en-US") }
function fmtDec(n) { return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
function monthlyPayment(p, r, y) {
  if (r === 0) return p / (y * 12)
  const mr = r / 100 / 12, n = y * 12
  return p * (mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1)
}
function maxAffordable(gm, r, y, dp, tax, ins, hoa) {
  const mr = r / 100 / 12, n = y * 12
  const maxPITI = gm * 0.28
  const maxPI = maxPITI - tax - ins - hoa
  if (maxPI <= 0) return 0
  if (r === 0) return maxPI * n / (1 - dp / 100)
  const lf = (mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1)
  return (maxPI / lf) / (1 - dp / 100)
}

export default function MortgagePage() {
  const [mode, setMode] = useState("afford")
  const [income, setIncome] = useState("85000")
  const [debts, setDebts] = useState("500")
  const [downPct, setDownPct] = useState(20)
  const [tax, setTax] = useState("300")
  const [ins, setIns] = useState("100")
  const [hoa, setHoa] = useState("0")
  const [homePrice, setHomePrice] = useState("350000")
  const [downPayment, setDownPayment] = useState("70000")
  const [tax2, setTax2] = useState("300")
  const [ins2, setIns2] = useState("100")
  const [pmi, setPmi] = useState("0")
  const [rate, setRate] = useState("7.0")
  const [years, setYears] = useState(30)

  const r = parseFloat(rate) || 0
  const gm = (parseFloat(income) || 0) / 12
  const taxMo = parseFloat(tax) || 0
  const insMo = parseFloat(ins) || 0
  const hoaMo = parseFloat(hoa) || 0
  const maxPrice = maxAffordable(gm, r, years, downPct, taxMo, insMo, hoaMo)
  const downAmt = maxPrice * downPct / 100
  const maxPI = maxPrice > 0 ? monthlyPayment(maxPrice - downAmt, r, years) : 0
  const maxPITI = maxPI + taxMo + insMo + hoaMo
  const frontDTI = gm > 0 ? (maxPITI / gm) * 100 : 0

  const hp = parseFloat(homePrice) || 0
  const dp = parseFloat(downPayment) || 0
  const loan = Math.max(hp - dp, 0)
  const dp2Pct = hp > 0 ? (dp / hp) * 100 : 0
  const pi = loan > 0 ? monthlyPayment(loan, r, years) : 0
  const total = pi + (parseFloat(tax2)||0) + (parseFloat(ins2)||0) + (parseFloat(pmi)||0)
  const totalInterest = loan > 0 ? (pi * years * 12) - loan : 0

  return (
    <Shell>
      <style>{toolCss}</style>
      <a href="/" className="tool-back">← MoneyWise home</a>
      <div className="tool-header">
        <p className="tool-eyebrow">Home Buying</p>
        <h1 className="tool-title">Mortgage<br /><em>Affordability Calculator</em></h1>
      </div>

      <div className="tool-card">
        <div className="tool-tabs">
          <button className={`tool-tab${mode==="afford"?" on":""}`} onClick={()=>setMode("afford")}>How much can I afford?</button>
          <button className={`tool-tab${mode==="payment"?" on":""}`} onClick={()=>setMode("payment")}>What's my monthly payment?</button>
        </div>

        <div className="tool-field-row">
          <div>
            <label className="tool-field-label">Interest rate</label>
            <div className="tool-input-wrap">
              <input className="tool-input no-prefix" type="number" min="0" step="0.05" placeholder="7.0" value={rate} onChange={e=>setRate(e.target.value)} />
              <span className="tool-suffix">%</span>
            </div>
          </div>
          <div>
            <div className="tool-range-header">
              <span className="tool-range-label">Loan term</span>
              <span className="tool-range-val">{years} yrs</span>
            </div>
            <input type="range" min="10" max="30" step="5" className="tool-range" value={years} onChange={e=>setYears(Number(e.target.value))} />
          </div>
        </div>

        {mode === "afford" ? (
          <>
            <div className="tool-field-row">
              <div>
                <label className="tool-field-label">Annual gross income</label>
                <div className="tool-input-wrap"><span className="tool-prefix">$</span>
                  <input className="tool-input" type="number" min="0" placeholder="85000" value={income} onChange={e=>setIncome(e.target.value)} />
                </div>
                <p className="tool-field-hint">Combined household income before taxes</p>
              </div>
              <div>
                <label className="tool-field-label">Monthly debt payments</label>
                <div className="tool-input-wrap"><span className="tool-prefix">$</span>
                  <input className="tool-input" type="number" min="0" placeholder="500" value={debts} onChange={e=>setDebts(e.target.value)} />
                </div>
                <p className="tool-field-hint">Car, student loans, credit cards</p>
              </div>
            </div>
            <div className="tool-range-header">
              <span className="tool-range-label">Down payment</span>
              <span className="tool-range-val">{downPct}%{maxPrice > 0 ? ` — ${fmt(maxPrice * downPct / 100)}` : ""}</span>
            </div>
            <input type="range" min="3" max="40" step="1" className="tool-range" value={downPct} onChange={e=>setDownPct(Number(e.target.value))} />
            <div className="tool-field-row">
              <div>
                <label className="tool-field-label">Property tax /mo</label>
                <div className="tool-input-wrap"><span className="tool-prefix">$</span>
                  <input className="tool-input" type="number" min="0" placeholder="300" value={tax} onChange={e=>setTax(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="tool-field-label">Home insurance /mo</label>
                <div className="tool-input-wrap"><span className="tool-prefix">$</span>
                  <input className="tool-input" type="number" min="0" placeholder="100" value={ins} onChange={e=>setIns(e.target.value)} />
                </div>
              </div>
            </div>
            {maxPrice > 0 && (
              <>
                <div className="tool-result-hero">
                  <p className="tool-result-eyebrow">Maximum affordable home price</p>
                  <p className="tool-result-val">{fmt(maxPrice)}</p>
                  <p className="tool-result-sub">{downPct}% down ({fmt(downAmt)}) · Loan: {fmt(maxPrice - downAmt)}</p>
                </div>
                <div className="tool-result-grid">
                  <div className="tool-result-cell">
                    <p className="tool-result-cell-label">Monthly P&I</p>
                    <p className="tool-result-cell-val amber">{fmtDec(maxPI)}</p>
                  </div>
                  <div className="tool-result-cell">
                    <p className="tool-result-cell-label">Total PITI</p>
                    <p className="tool-result-cell-val amber">{fmtDec(maxPITI)}</p>
                  </div>
                  <div className="tool-result-cell">
                    <p className="tool-result-cell-label">Front-end DTI</p>
                    <p className={`tool-result-cell-val ${frontDTI <= 28 ? "green" : frontDTI <= 36 ? "amber" : "red"}`}>{frontDTI.toFixed(1)}%</p>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="tool-field-row">
              <div>
                <label className="tool-field-label">Home price</label>
                <div className="tool-input-wrap"><span className="tool-prefix">$</span>
                  <input className="tool-input" type="number" min="0" placeholder="350000" value={homePrice} onChange={e=>setHomePrice(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="tool-field-label">Down payment</label>
                <div className="tool-input-wrap"><span className="tool-prefix">$</span>
                  <input className="tool-input" type="number" min="0" placeholder="70000" value={downPayment} onChange={e=>setDownPayment(e.target.value)} />
                </div>
                <p className="tool-field-hint">{dp2Pct > 0 ? dp2Pct.toFixed(1) + "% of home price" : ""}</p>
              </div>
            </div>
            <div className="tool-field-row">
              <div>
                <label className="tool-field-label">Property tax /mo</label>
                <div className="tool-input-wrap"><span className="tool-prefix">$</span>
                  <input className="tool-input" type="number" min="0" placeholder="300" value={tax2} onChange={e=>setTax2(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="tool-field-label">PMI /mo</label>
                <div className="tool-input-wrap"><span className="tool-prefix">$</span>
                  <input className="tool-input" type="number" min="0" placeholder="0" value={pmi} onChange={e=>setPmi(e.target.value)} />
                </div>
                <p className="tool-field-hint">Required if down &lt; 20%</p>
              </div>
            </div>
            {loan > 0 && (
              <>
                <div className="tool-result-hero">
                  <p className="tool-result-eyebrow">Total monthly payment</p>
                  <p className="tool-result-val">{fmtDec(total)}</p>
                  <p className="tool-result-sub">Loan: {fmt(loan)} · {years}-year term · {rate}% rate</p>
                </div>
                <div className="tool-result-grid">
                  <div className="tool-result-cell">
                    <p className="tool-result-cell-label">Principal & Interest</p>
                    <p className="tool-result-cell-val amber">{fmtDec(pi)}</p>
                  </div>
                  <div className="tool-result-cell">
                    <p className="tool-result-cell-label">Total interest paid</p>
                    <p className="tool-result-cell-val red">{fmt(totalInterest)}</p>
                  </div>
                  <div className="tool-result-cell">
                    <p className="tool-result-cell-label">Total cost of loan</p>
                    <p className="tool-result-cell-val">{fmt(loan + totalInterest)}</p>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <a href="/articles/how-much-house-can-i-afford" className="tool-article-link">
          📖 Read: How Much House Can I Afford on My Salary? →
        </a>
      </div>
    </Shell>
  )
}
