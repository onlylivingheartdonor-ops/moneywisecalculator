"use client"
import { Shell } from "../../lib/shell"
import { useState } from "react"

const css = `
  .tool-back{font-size:12px;color:#888;margin-bottom:1.5rem;display:inline-block;text-decoration:none;}
  .tool-header{border-bottom:2px solid #1a1a1a;padding-bottom:1.5rem;margin-bottom:2rem;}
  .tool-eyebrow{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#888;margin-bottom:.5rem;}
  .tool-title{font-family:'DM Serif Display',serif;font-size:clamp(2rem,5vw,3rem);line-height:1.1;}
  .tool-title em{font-style:italic;color:#0369a1;}
  .tc{background:#fff;border:1px solid #e0dbd3;border-radius:4px;padding:1.5rem;margin-bottom:1.5rem;}
  .fr{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.25rem;}
  .fl{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#888;display:block;margin-bottom:.4rem;}
  .fh{font-size:12px;color:#888;margin-top:.3rem;}
  .iw{position:relative;}
  .ip{position:absolute;left:0;top:.4rem;font-size:1rem;color:#aaa;}
  .inp{width:100%;border:none;border-bottom:1.5px solid #e0dbd3;background:transparent;font-family:'DM Mono',monospace;font-size:1.1rem;color:#1a1a1a;padding:.4rem 1.2rem;outline:none;transition:border-color .2s;}
  .inp:focus{border-color:#0369a1;}
  .mo-tabs{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.25rem;}
  .mo-tab{padding:.4rem .85rem;border:1px solid #e0dbd3;border-radius:2px;font-family:'DM Mono',monospace;font-size:12px;color:#555;cursor:pointer;background:none;transition:all .15s;}
  .mo-tab.on{border-color:#0369a1;background:#eff6ff;color:#0369a1;}
  .hero{background:#eff6ff;border:1px solid #bfdbfe;border-radius:4px;padding:1.5rem;margin-bottom:1.5rem;text-align:center;}
  .hero-ey{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#1e40af;margin-bottom:.3rem;}
  .hero-val{font-family:'DM Serif Display',serif;font-size:3rem;color:#1e40af;line-height:1;}
  .hero-sub{font-size:12px;color:#1e40af;margin-top:.5rem;opacity:.75;}
  .rg{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:#e0dbd3;border:1px solid #e0dbd3;border-radius:2px;overflow:hidden;margin-bottom:1.25rem;}
  .rc{background:#fff;padding:1rem 1.1rem;}
  .rl{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#888;margin-bottom:.3rem;}
  .rv{font-family:'DM Serif Display',serif;font-size:1.2rem;color:#1a1a1a;}
  .rv.b{color:#0369a1;}.rv.g{color:#166534;}.rv.r{color:#b91c1c;}
  .art-link{display:block;background:#faf8f4;border:1px solid #e0dbd3;border-radius:3px;padding:.9rem 1.25rem;font-size:13px;color:#555;text-decoration:none;margin-top:1rem;transition:border-color .15s;}
  .art-link:hover{border-color:#0369a1;color:#1a1a1a;}
  @media(max-width:600px){.fr,.rg{grid-template-columns:1fr;}}
`

function fmt(n){return "$"+Math.round(n).toLocaleString("en-US")}
const MONTHS=[3,4,6,8,9,12]

export default function EmergencyFundPage() {
  const [housing,setHousing]=useState("1500")
  const [food,setFood]=useState("600")
  const [transport,setTransport]=useState("400")
  const [utilities,setUtilities]=useState("200")
  const [insurance,setInsurance]=useState("300")
  const [other,setOther]=useState("200")
  const [targetMonths,setTargetMonths]=useState(6)
  const [current,setCurrent]=useState("0")
  const [monthlySaving,setMonthlySaving]=useState("")

  const monthly=[housing,food,transport,utilities,insurance,other].reduce((s,v)=>s+(parseFloat(v)||0),0)
  const target=monthly*targetMonths
  const cur=parseFloat(current)||0
  const gap=Math.max(target-cur,0)
  const pct=target>0?Math.min((cur/target)*100,100):0
  const ms=parseFloat(monthlySaving)||0
  const monthsToGoal=ms>0?Math.ceil(gap/ms):null

  return (
    <Shell>
      <style>{css}</style>
      <a href="/" className="tool-back">← MoneyWise home</a>
      <div className="tool-header">
        <p className="tool-eyebrow">Saving</p>
        <h1 className="tool-title">Emergency Fund<br /><em>Calculator</em></h1>
      </div>
      <div className="tc">
        <p style={{fontSize:"12px",color:"#888",marginBottom:"1.25rem"}}>Enter essential monthly expenses only — costs you cannot cut in a crisis.</p>
        <div className="fr">
          <div><label className="fl">Housing</label><div className="iw"><span className="ip">$</span><input className="inp" type="number" min="0" placeholder="1500" value={housing} onChange={e=>setHousing(e.target.value)}/></div></div>
          <div><label className="fl">Food (groceries)</label><div className="iw"><span className="ip">$</span><input className="inp" type="number" min="0" placeholder="600" value={food} onChange={e=>setFood(e.target.value)}/></div></div>
          <div><label className="fl">Transportation</label><div className="iw"><span className="ip">$</span><input className="inp" type="number" min="0" placeholder="400" value={transport} onChange={e=>setTransport(e.target.value)}/></div></div>
          <div><label className="fl">Utilities</label><div className="iw"><span className="ip">$</span><input className="inp" type="number" min="0" placeholder="200" value={utilities} onChange={e=>setUtilities(e.target.value)}/></div></div>
          <div><label className="fl">Insurance & medical</label><div className="iw"><span className="ip">$</span><input className="inp" type="number" min="0" placeholder="300" value={insurance} onChange={e=>setInsurance(e.target.value)}/></div></div>
          <div><label className="fl">Other essentials</label><div className="iw"><span className="ip">$</span><input className="inp" type="number" min="0" placeholder="200" value={other} onChange={e=>setOther(e.target.value)}/></div></div>
        </div>
        <p style={{fontSize:"11px",letterSpacing:".08em",textTransform:"uppercase",color:"#888",marginBottom:".5rem"}}>Target coverage</p>
        <div className="mo-tabs">
          {MONTHS.map(m=><button key={m} className={`mo-tab${targetMonths===m?" on":""}`} onClick={()=>setTargetMonths(m)}>{m} months</button>)}
        </div>
        <div className="fr" style={{marginBottom:"1.5rem"}}>
          <div><label className="fl">Current emergency savings</label><div className="iw"><span className="ip">$</span><input className="inp" type="number" min="0" placeholder="0" value={current} onChange={e=>setCurrent(e.target.value)}/></div></div>
        </div>

        {target > 0 && (
          <>
            <div className="hero">
              <p className="hero-ey">Emergency fund target</p>
              <p className="hero-val">{fmt(target)}</p>
              <p className="hero-sub">{fmt(monthly)}/mo × {targetMonths} months{gap>0?` · ${fmt(gap)} still needed`:""}</p>
            </div>
            <div className="rg">
              <div className="rc"><p className="rl">Monthly essentials</p><p className="rv b">{fmt(monthly)}</p></div>
              <div className="rc"><p className="rl">Currently saved</p><p className={`rv ${pct>=100?"g":pct>=50?"b":"rv"}`}>{fmt(cur)}</p></div>
              <div className="rc"><p className="rl">Gap remaining</p><p className={`rv ${gap===0?"g":"r"}`}>{gap===0?"None ✓":fmt(gap)}</p></div>
            </div>
            {gap > 0 && (
              <div style={{border:"1.5px dashed #bfdbfe",borderRadius:"4px",padding:"1.25rem"}}>
                <p style={{fontSize:"11px",letterSpacing:".08em",textTransform:"uppercase",color:"#0369a1",marginBottom:".6rem"}}>Savings plan</p>
                <div className="fr" style={{marginBottom:".75rem"}}>
                  <div><label className="fl">Monthly saving amount</label><div className="iw"><span className="ip">$</span><input className="inp" type="number" min="0" placeholder="250" value={monthlySaving} onChange={e=>setMonthlySaving(e.target.value)}/></div></div>
                </div>
                {monthsToGoal && <p style={{fontSize:"12px",color:"#0369a1"}}>At {fmt(ms)}/month you'll reach your goal in <strong style={{fontWeight:500}}>{monthsToGoal < 12 ? `${monthsToGoal} months` : `${Math.floor(monthsToGoal/12)}y ${monthsToGoal%12}m`}</strong>.</p>}
              </div>
            )}
          </>
        )}
        <a href="/articles/how-much-emergency-fund-do-i-need" className="art-link">📖 Read: How Much Should You Have in an Emergency Fund? →</a>
      </div>
    </Shell>
  )
}
