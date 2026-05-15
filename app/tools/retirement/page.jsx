"use client"
import { Shell } from "../../lib/shell"
import { useState } from "react"

const css = `
  .tool-back { font-size:12px;color:#888;margin-bottom:1.5rem;display:inline-block;text-decoration:none; }
  .tool-header { border-bottom:2px solid #1a1a1a;padding-bottom:1.5rem;margin-bottom:2rem; }
  .tool-eyebrow { font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#888;margin-bottom:.5rem; }
  .tool-title { font-family:'DM Serif Display',serif;font-size:clamp(2rem,5vw,3rem);line-height:1.1; }
  .tool-title em { font-style:italic;color:#7c3aed; }
  .tool-card { background:#fff;border:1px solid #e0dbd3;border-radius:4px;padding:1.5rem;margin-bottom:1.5rem; }
  .f-row { display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.25rem;margin-bottom:1.25rem; }
  .f-row-2 { display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.25rem; }
  .fl { font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#888;display:block;margin-bottom:.4rem; }
  .fh { font-size:12px;color:#888;margin-top:.3rem; }
  .iw { position:relative; }
  .ip { position:absolute;left:0;top:.4rem;font-size:1rem;color:#aaa; }
  .is { position:absolute;right:0;top:.4rem;font-size:1rem;color:#aaa; }
  .inp { width:100%;border:none;border-bottom:1.5px solid #e0dbd3;background:transparent;font-family:'DM Mono',monospace;font-size:1.1rem;color:#1a1a1a;padding:.4rem 1.2rem;outline:none;transition:border-color .2s; }
  .inp.np { padding-left:0; }
  .inp:focus { border-color:#7c3aed; }
  .rng { display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem; }
  .rng-label { font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#888;white-space:nowrap; }
  .rng-val { font-family:'DM Serif Display',serif;font-size:1.3rem;color:#7c3aed;min-width:3rem;text-align:right; }
  .range { flex:1;accent-color:#7c3aed;height:4px;cursor:pointer; }
  .hero { background:#f5f3ff;border:1px solid #ddd6fe;border-radius:4px;padding:1.5rem;margin-bottom:1.5rem;text-align:center; }
  .hero-ey { font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#5b21b6;margin-bottom:.3rem; }
  .hero-val { font-family:'DM Serif Display',serif;font-size:3rem;color:#5b21b6;line-height:1; }
  .hero-val.g { color:#166534; }
  .hero-val.a { color:#b45309; }
  .hero-sub { font-size:12px;color:#5b21b6;margin-top:.5rem;opacity:.75; }
  .rg { display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:#e0dbd3;border:1px solid #e0dbd3;border-radius:2px;overflow:hidden;margin-bottom:1.25rem; }
  .rc { background:#fff;padding:1rem 1.1rem; }
  .rl { font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#888;margin-bottom:.3rem; }
  .rv { font-family:'DM Serif Display',serif;font-size:1.2rem;color:#1a1a1a; }
  .rv.p { color:#7c3aed; }
  .rv.g { color:#166534; }
  .rv.r { color:#b91c1c; }
  .art-link { display:block;background:#faf8f4;border:1px solid #e0dbd3;border-radius:3px;padding:.9rem 1.25rem;font-size:13px;color:#555;text-decoration:none;margin-top:1rem;transition:border-color .15s; }
  .art-link:hover { border-color:#7c3aed;color:#1a1a1a; }
  @media(max-width:600px){.f-row,.rg{grid-template-columns:1fr;}.f-row-2{grid-template-columns:1fr;}}
`

function fmtM(n) { if(Math.abs(n)>=1000000) return "$"+(n/1000000).toFixed(2)+"M"; return "$"+Math.round(n).toLocaleString("en-US") }
function fmt(n) { return "$"+Math.round(n).toLocaleString("en-US") }
function fv(pv,r,n){return pv*Math.pow(1+r,n)}
function fvc(pmt,r,n){return r===0?pmt*n:pmt*((Math.pow(1+r,n)-1)/r)}

export default function RetirementPage() {
  const [ca,setCa]=useState("30")
  const [ra,setRa]=useState("65")
  const [sv,setSv]=useState("20000")
  const [mo,setMo]=useState("500")
  const [rr,setRr]=useState("7")
  const [gl,setGl]=useState("1000000")
  const [inf,setInf]=useState("3")

  const c=parseInt(ca)||0,r=parseInt(ra)||65,s=parseFloat(sv)||0
  const m=parseFloat(mo)||0,rt=parseFloat(rr)||0,g=parseFloat(gl)||0,i=parseFloat(inf)||0
  const years=Math.max(r-c,0),months=years*12,mr=rt/100/12,ar=rt/100
  const fvSavings=fv(s,ar,years)
  const fvContribs=fvc(m,mr,months)
  const total=fvSavings+fvContribs
  const gap=g-total
  const onTrack=gap<=0
  const real=total/Math.pow(1+i/100,years)
  const neededMo=gap>0&&mr>0?gap/((Math.pow(1+mr,months)-1)/mr):0

  return (
    <Shell>
      <style>{css}</style>
      <a href="/" className="tool-back">← MoneyWise home</a>
      <div className="tool-header">
        <p className="tool-eyebrow">Retirement Planning</p>
        <h1 className="tool-title">Retirement<br /><em>Savings Gap</em></h1>
      </div>
      <div className="tool-card">
        <div className="f-row">
          <div><label className="fl">Current age</label><div className="iw"><input className="inp np" type="number" placeholder="30" value={ca} onChange={e=>setCa(e.target.value)}/><span className="is">yrs</span></div></div>
          <div><label className="fl">Retirement age</label><div className="iw"><input className="inp np" type="number" placeholder="65" value={ra} onChange={e=>setRa(e.target.value)}/><span className="is">yrs</span></div></div>
          <div><label className="fl">Expected return</label><div className="iw"><input className="inp np" type="number" step="0.1" placeholder="7" value={rr} onChange={e=>setRr(e.target.value)}/><span className="is">%</span></div></div>
        </div>
        <div className="f-row">
          <div><label className="fl">Current savings</label><div className="iw"><span className="ip">$</span><input className="inp" type="number" min="0" placeholder="20000" value={sv} onChange={e=>setSv(e.target.value)}/></div></div>
          <div><label className="fl">Monthly contribution</label><div className="iw"><span className="ip">$</span><input className="inp" type="number" min="0" placeholder="500" value={mo} onChange={e=>setMo(e.target.value)}/></div></div>
          <div><label className="fl">Inflation rate</label><div className="iw"><input className="inp np" type="number" step="0.1" placeholder="3" value={inf} onChange={e=>setInf(e.target.value)}/><span className="is">%</span></div></div>
        </div>
        <div className="f-row-2">
          <div><label className="fl">Retirement goal</label><div className="iw"><span className="ip">$</span><input className="inp" type="number" min="0" placeholder="1000000" value={gl} onChange={e=>setGl(e.target.value)}/></div><p className="fh">Use 25× expected annual spending as a starting point</p></div>
        </div>

        {c > 0 && r > c && g > 0 && (
          <>
            <div className="hero">
              <p className="hero-ey">{onTrack ? "Projected surplus" : "Savings gap"}</p>
              <p className={`hero-val ${onTrack?"g":"a"}`}>{onTrack?"+":"−"}{fmtM(Math.abs(gap))}</p>
              <p className="hero-sub">Projected: {fmtM(total)} · Goal: {fmtM(g)} · {years} years to grow</p>
            </div>
            <div className="rg">
              <div className="rc"><p className="rl">Projected at retirement</p><p className="rv p">{fmtM(total)}</p></div>
              <div className="rc"><p className="rl">Inflation-adjusted value</p><p className="rv">{fmtM(real)}</p></div>
              <div className="rc"><p className="rl">{onTrack?"Surplus":"Gap"}</p><p className={`rv ${onTrack?"g":"r"}`}>{fmtM(Math.abs(gap))}</p></div>
            </div>
            {!onTrack && <p style={{fontSize:"12px",color:"#7c3aed",padding:".9rem 1rem",background:"#f5f3ff",borderRadius:"3px",marginBottom:"1rem"}}>To close the gap, increase monthly contributions to <strong style={{fontWeight:500}}>{fmt(m+neededMo)}/month</strong> (an extra {fmt(neededMo)}/month).</p>}
          </>
        )}
        <a href="/articles/how-much-save-for-retirement-by-age" className="art-link">📖 Read: How Much Should You Have Saved for Retirement by Age? →</a>
      </div>
    </Shell>
  )
}
