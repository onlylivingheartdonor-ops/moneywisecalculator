"use client"
import { Shell } from "../../lib/shell"
import { useState } from "react"

const css = `
  .tool-back{font-size:12px;color:#888;margin-bottom:1.5rem;display:inline-block;text-decoration:none;}
  .tool-header{border-bottom:2px solid #1a1a1a;padding-bottom:1.5rem;margin-bottom:2rem;}
  .tool-eyebrow{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#888;margin-bottom:.5rem;}
  .tool-title{font-family:'DM Serif Display',serif;font-size:clamp(2rem,5vw,3rem);line-height:1.1;}
  .tool-title em{font-style:italic;color:#0e7490;}
  .tc{background:#fff;border:1px solid #e0dbd3;border-radius:4px;padding:1.5rem;margin-bottom:1.5rem;}
  .col-header{display:grid;grid-template-columns:2fr 1fr 1.2fr 1fr 32px;gap:.6rem;margin-bottom:.4rem;}
  .cl{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#aaa;}
  .sub-row{display:grid;grid-template-columns:2fr 1fr 1.2fr 1fr 32px;gap:.6rem;margin-bottom:.5rem;align-items:end;}
  .ni{width:100%;border:none;border-bottom:1.5px solid #e0dbd3;background:transparent;font-family:'DM Mono',monospace;font-size:.95rem;color:#1a1a1a;padding:.35rem 0;outline:none;transition:border-color .2s;}
  .ni:focus{border-color:#0e7490;}
  .ni::placeholder{color:#ccc;}
  .num-i{width:100%;border:none;border-bottom:1.5px solid #e0dbd3;background:transparent;font-family:'DM Mono',monospace;font-size:.95rem;color:#1a1a1a;padding:.35rem 0;outline:none;transition:border-color .2s;text-align:right;}
  .num-i:focus{border-color:#0e7490;}
  .freq-sel{width:100%;border:none;border-bottom:1.5px solid #e0dbd3;background:transparent;font-family:'DM Mono',monospace;font-size:.85rem;color:#555;padding:.35rem 0;outline:none;cursor:pointer;appearance:none;}
  .mo-val{font-size:12px;color:#888;text-align:right;padding-bottom:.4rem;align-self:end;}
  .rm-btn{background:none;border:none;cursor:pointer;color:#ddd;font-size:.9rem;transition:color .15s;align-self:end;padding-bottom:.45rem;}
  .rm-btn:hover{color:#b91c1c;}
  .add-btn{display:flex;align-items:center;gap:.5rem;background:none;border:1px dashed #e0dbd3;border-radius:3px;width:100%;padding:.65rem 1rem;font-family:'DM Mono',monospace;font-size:12px;color:#aaa;cursor:pointer;transition:all .15s;margin-bottom:1.5rem;}
  .add-btn:hover{border-color:#0e7490;color:#0e7490;}
  .hero{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:#e0dbd3;border:1px solid #e0dbd3;border-radius:2px;overflow:hidden;margin-bottom:1.5rem;}
  .hc{background:#fff;padding:1rem;}
  .hl{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#888;margin-bottom:.3rem;}
  .hv{font-family:'DM Serif Display',serif;font-size:1.4rem;color:#1a1a1a;}
  .hv.t{color:#0e7490;}.hv.a{color:#92400e;}
  .breakdown-list{display:flex;flex-direction:column;gap:.35rem;margin-bottom:1.5rem;}
  .breakdown-row{display:flex;align-items:center;gap:.75rem;padding:.6rem .9rem;background:#faf8f4;border-radius:2px;font-size:12px;}
  .bn{flex:1;color:#1a1a1a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .bmo{color:#888;min-width:60px;text-align:right;}
  .byr{color:#1a1a1a;min-width:60px;text-align:right;font-weight:500;}
  .invest-section{background:#f0f9ff;border:1px solid #bae6fd;border-radius:4px;padding:1.25rem;margin-bottom:1rem;}
  .invest-title{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#0369a1;margin-bottom:.5rem;}
  .invest-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:#bae6fd;border:1px solid #bae6fd;border-radius:2px;overflow:hidden;margin-top:.75rem;}
  .ic{background:#f0f9ff;padding:.85rem 1rem;text-align:center;}
  .il{font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:#0369a1;margin-bottom:.25rem;opacity:.8;}
  .iv{font-family:'DM Serif Display',serif;font-size:1.3rem;color:#0c4a6e;}
  .art-link{display:block;background:#faf8f4;border:1px solid #e0dbd3;border-radius:3px;padding:.9rem 1.25rem;font-size:13px;color:#555;text-decoration:none;margin-top:1rem;transition:border-color .15s;}
  .art-link:hover{border-color:#0e7490;color:#1a1a1a;}
  @media(max-width:640px){
    .col-header,.sub-row{grid-template-columns:2fr 1fr 1fr 28px;}
    .col-header .cl:nth-child(4),.sub-row>.mo-val{display:none;}
    .hero,.invest-grid{grid-template-columns:1fr 1fr;}
  }
`

const FREQ=[{value:"weekly",label:"Weekly",pm:52/12},{value:"monthly",label:"Monthly",pm:1},{value:"quarterly",label:"Quarterly",pm:1/3},{value:"annual",label:"Annual",pm:1/12}]
function toMo(cost,freq){const f=FREQ.find(o=>o.value===freq);return(parseFloat(cost)||0)*(f?f.pm:1)}
function fmtK(n){if(n>=1000000)return"$"+(n/1000000).toFixed(2)+"M";if(n>=1000)return"$"+(n/1000).toFixed(1)+"K";return"$"+Math.round(n)}
function investGrowth(annual,r,years){const mo=annual/12,mr=r/100/12,n=years*12;if(mr===0)return mo*n;return mo*((Math.pow(1+mr,n)-1)/mr)}

let _id=10
export default function SubscriptionsPage(){
  const [subs,setSubs]=useState([
    {id:1,name:"Netflix",cost:"15.49",freq:"monthly"},{id:2,name:"Spotify",cost:"10.99",freq:"monthly"},
    {id:3,name:"iCloud+",cost:"2.99",freq:"monthly"},{id:4,name:"Gym",cost:"40.00",freq:"monthly"},
    {id:5,name:"Microsoft 365",cost:"99.99",freq:"annual"},
  ])
  const [worthIt,setWorthIt]=useState({})

  const addSub=()=>setSubs(p=>[...p,{id:_id++,name:"",cost:"",freq:"monthly"}])
  const removeSub=id=>{if(subs.length===1)return;setSubs(p=>p.filter(s=>s.id!==id))}
  const update=(id,f,v)=>setSubs(p=>p.map(s=>s.id===id?{...s,[f]:v}:s))

  const valid=subs.filter(s=>s.name&&parseFloat(s.cost)>0)
  const monthly=valid.reduce((s,sub)=>s+toMo(sub.cost,sub.freq),0)
  const annual=monthly*12
  const sorted=[...valid].sort((a,b)=>toMo(b.cost,b.freq)-toMo(a.cost,a.freq))
  const cancelSubs=valid.filter(s=>worthIt[s.id]===false)
  const cancelMo=cancelSubs.reduce((s,sub)=>s+toMo(sub.cost,sub.freq),0)
  const cancelAnnual=cancelMo*12
  const inv5=cancelAnnual>0?investGrowth(cancelAnnual,7,5):0
  const inv10=cancelAnnual>0?investGrowth(cancelAnnual,7,10):0
  const inv20=cancelAnnual>0?investGrowth(cancelAnnual,7,20):0

  return(
    <Shell>
      <style>{css}</style>
      <a href="/" className="tool-back">← MoneyWise home</a>
      <div className="tool-header">
        <p className="tool-eyebrow">Budgeting</p>
        <h1 className="tool-title">Subscription<br /><em>Cost Calculator</em></h1>
      </div>
      <div className="tc">
        <div className="col-header">
          <span className="cl">Service</span><span className="cl" style={{textAlign:"right"}}>Cost</span>
          <span className="cl">Frequency</span><span className="cl" style={{textAlign:"right"}}>Per month</span><span/>
        </div>
        {subs.map(s=>{
          const mo=toMo(s.cost,s.freq)
          return(
            <div className="sub-row" key={s.id}>
              <input className="ni" placeholder="e.g. Netflix, Gym…" value={s.name} onChange={e=>update(s.id,"name",e.target.value)}/>
              <input className="num-i" type="number" min="0" step="0.01" placeholder="0.00" value={s.cost} onChange={e=>update(s.id,"cost",e.target.value)}/>
              <select className="freq-sel" value={s.freq} onChange={e=>update(s.id,"freq",e.target.value)}>
                {FREQ.map(f=><option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
              <span className="mo-val">{mo>0?"$"+mo.toFixed(2):"—"}</span>
              <button className="rm-btn" onClick={()=>removeSub(s.id)}>✕</button>
            </div>
          )
        })}
        <button className="add-btn" onClick={addSub}>+ Add subscription</button>

        {valid.length>0&&(
          <>
            <div className="hero">
              <div className="hc"><p className="hl">Per month</p><p className="hv t">${monthly.toFixed(2)}</p></div>
              <div className="hc"><p className="hl">Per year</p><p className="hv a">${Math.round(annual).toLocaleString("en-US")}</p></div>
              <div className="hc"><p className="hl">Subscriptions</p><p className="hv">{valid.length}</p></div>
            </div>

            <p style={{fontSize:"11px",letterSpacing:".08em",textTransform:"uppercase",color:"#888",marginBottom:".6rem"}}>Sorted by cost</p>
            <div className="breakdown-list">
              {sorted.map(s=>{const mo=toMo(s.cost,s.freq);return(
                <div className="breakdown-row" key={s.id}>
                  <span className="bn">{s.name}</span>
                  <span className="bmo">${mo.toFixed(2)}/mo</span>
                  <span className="byr">${Math.round(mo*12)}/yr</span>
                </div>
              )})}
            </div>

            <p style={{fontSize:"11px",letterSpacing:".08em",textTransform:"uppercase",color:"#0e7490",marginBottom:".6rem"}}>Worth-it audit</p>
            <div style={{display:"flex",flexDirection:"column",gap:".5rem",marginBottom:"1rem"}}>
              {valid.map(s=>{const mo=toMo(s.cost,s.freq);const state=worthIt[s.id];return(
                <div key={s.id} style={{display:"flex",alignItems:"center",gap:".6rem",fontSize:"12px"}}>
                  <button onClick={()=>setWorthIt(p=>({...p,[s.id]:true}))} style={{fontSize:"12px",padding:".2rem .6rem",border:"1px solid",borderRadius:"2px",cursor:"pointer",fontFamily:"inherit",transition:"all .15s",background:state===true?"#eaf5ee":"none",borderColor:state===true?"#166534":"#e0dbd3",color:state===true?"#166534":"#aaa"}}>Keep</button>
                  <button onClick={()=>setWorthIt(p=>({...p,[s.id]:false}))} style={{fontSize:"12px",padding:".2rem .6rem",border:"1px solid",borderRadius:"2px",cursor:"pointer",fontFamily:"inherit",transition:"all .15s",background:state===false?"#fff8f8":"none",borderColor:state===false?"#b91c1c":"#e0dbd3",color:state===false?"#b91c1c":"#aaa"}}>Cancel</button>
                  <span style={{flex:1,color:"#1a1a1a"}}>{s.name}</span>
                  <span style={{color:"#888"}}>${mo.toFixed(2)}/mo</span>
                </div>
              )})}
            </div>

            {cancelSubs.length>0&&(
              <div className="invest-section">
                <p className="invest-title">If you invested ${cancelMo.toFixed(2)}/month instead</p>
                <p style={{fontSize:"12px",color:"#0369a1"}}>Cancelling {cancelSubs.length} subscription{cancelSubs.length!==1?"s":""} saves <strong style={{fontWeight:500}}>${Math.round(cancelAnnual).toLocaleString("en-US")}/year</strong>.</p>
                <div className="invest-grid">
                  <div className="ic"><p className="il">After 5 years</p><p className="iv">{fmtK(inv5)}</p></div>
                  <div className="ic"><p className="il">After 10 years</p><p className="iv">{fmtK(inv10)}</p></div>
                  <div className="ic"><p className="il">After 20 years</p><p className="iv">{fmtK(inv20)}</p></div>
                </div>
              </div>
            )}
          </>
        )}
        <a href="/articles/subscription-creep-costing-you" className="art-link">📖 Read: Subscription Creep — How Small Charges Add Up to Thousands →</a>
      </div>
    </Shell>
  )
}
