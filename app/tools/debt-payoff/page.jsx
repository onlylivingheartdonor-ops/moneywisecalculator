"use client"
import { Shell } from "../../lib/shell"
import { useState, useMemo } from "react"

const css = `
  .tool-back{font-size:12px;color:#888;margin-bottom:1.5rem;display:inline-block;text-decoration:none;}
  .tool-header{border-bottom:2px solid #1a1a1a;padding-bottom:1.5rem;margin-bottom:2rem;}
  .tool-eyebrow{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#888;margin-bottom:.5rem;}
  .tool-title{font-family:'DM Serif Display',serif;font-size:clamp(2rem,5vw,3rem);line-height:1.1;}
  .tool-title em{font-style:italic;color:#b91c1c;}
  .tc{background:#fff;border:1px solid #e0dbd3;border-radius:4px;padding:1.5rem;margin-bottom:1.5rem;}
  .card-row{border:1px solid #e0dbd3;border-radius:3px;padding:1rem;margin-bottom:.75rem;transition:border-color .15s;}
  .card-row:hover{border-color:#b91c1c;}
  .card-header{display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem;}
  .card-num{font-family:'DM Serif Display',serif;font-size:1.2rem;color:#ddd;min-width:1.5rem;}
  .name-inp{flex:1;border:none;border-bottom:1.5px solid #e0dbd3;background:transparent;font-family:'DM Mono',monospace;font-size:.95rem;color:#1a1a1a;padding:.3rem 0;outline:none;transition:border-color .2s;}
  .name-inp:focus{border-color:#b91c1c;}
  .name-inp::placeholder{color:#ccc;}
  .rm-btn{background:none;border:none;cursor:pointer;color:#ddd;font-size:.9rem;padding:.2rem;transition:color .15s;}
  .rm-btn:hover{color:#b91c1c;}
  .fields{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.75rem;}
  .fl{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#aaa;display:block;margin-bottom:.25rem;}
  .fw{position:relative;}
  .fp{position:absolute;left:0;bottom:.35rem;font-size:.9rem;color:#aaa;}
  .fs{position:absolute;right:0;bottom:.35rem;font-size:.9rem;color:#aaa;}
  .fi{width:100%;border:none;border-bottom:1.5px solid #e0dbd3;background:transparent;font-family:'DM Mono',monospace;font-size:.95rem;color:#1a1a1a;padding:.3rem 1rem .3rem 1rem;outline:none;transition:border-color .2s;text-align:right;}
  .fi.np{padding-left:0;}
  .fi:focus{border-color:#b91c1c;}
  .add-btn{display:flex;align-items:center;gap:.5rem;background:none;border:1px dashed #e0dbd3;border-radius:3px;width:100%;padding:.65rem 1rem;font-family:'DM Mono',monospace;font-size:12px;color:#aaa;cursor:pointer;transition:all .15s;margin-bottom:1.25rem;}
  .add-btn:hover{border-color:#b91c1c;color:#b91c1c;}
  .method-tabs{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.25rem;}
  .method-tab{padding:.45rem .85rem;border:1px solid #e0dbd3;border-radius:2px;font-family:'DM Mono',monospace;font-size:12px;color:#555;cursor:pointer;background:none;transition:all .15s;}
  .method-tab.on{border-color:#b91c1c;background:#fff5f5;color:#b91c1c;}
  .hero{background:#fff5f5;border:1px solid #fcd4d4;border-radius:4px;padding:1.25rem;margin-bottom:1.5rem;text-align:center;}
  .hero-ey{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#b91c1c;margin-bottom:.3rem;}
  .hero-val{font-family:'DM Serif Display',serif;font-size:2.5rem;color:#b91c1c;line-height:1;}
  .hero-sub{font-size:12px;color:#888;margin-top:.4rem;}
  .rg{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:#e0dbd3;border:1px solid #e0dbd3;border-radius:2px;overflow:hidden;margin-bottom:1.25rem;}
  .rc{background:#fff;padding:1rem 1.1rem;}
  .rl{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#888;margin-bottom:.3rem;}
  .rv{font-family:'DM Serif Display',serif;font-size:1.2rem;color:#1a1a1a;}
  .rv.r{color:#b91c1c;}.rv.g{color:#166534;}
  .art-link{display:block;background:#faf8f4;border:1px solid #e0dbd3;border-radius:3px;padding:.9rem 1.25rem;font-size:13px;color:#555;text-decoration:none;margin-top:1rem;transition:border-color .15s;}
  .art-link:hover{border-color:#b91c1c;color:#1a1a1a;}
  @media(max-width:600px){.fields,.rg{grid-template-columns:1fr 1fr;}}
`

const METHODS=[{key:"snowball",label:"Snowball",desc:"Smallest balance first"},{key:"avalanche",label:"Avalanche",desc:"Highest interest first"},{key:"emotional",label:"Emotional",desc:"Most hated first"}]
function fmt(n){return "$"+Math.round(n).toLocaleString("en-US")}
function fmtDec(n){return "$"+n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}

function simulate(cards,extra){
  if(!cards.length||cards.every(c=>!c.balance))return null
  let balances=cards.map(c=>({...c,remaining:parseFloat(c.balance)||0}))
  const ex=parseFloat(extra)||0
  let months=0,totalInterest=0
  while(balances.some(b=>b.remaining>0)&&months<600){
    balances.forEach(b=>{
      if(b.remaining<=0)return
      const r=(parseFloat(b.rate)||0)/100/12
      const interest=b.remaining*r
      totalInterest+=interest
      b.remaining+=interest
      const payment=Math.min(parseFloat(b.min)||0,b.remaining)
      b.remaining-=payment
      if(b.remaining<0.01)b.remaining=0
    })
    if(ex>0){const t=balances.find(b=>b.remaining>0);if(t)t.remaining=Math.max(0,t.remaining-ex)}
    months++
  }
  return{months,totalInterest}
}

let _id=10
export default function DebtPayoffPage(){
  const [cards,setCards]=useState([{id:1,name:"",balance:"",rate:"",min:"",priority:""}])
  const [method,setMethod]=useState("snowball")
  const [extra,setExtra]=useState("")

  const addCard=()=>setCards(p=>[...p,{id:_id++,name:"",balance:"",rate:"",min:"",priority:""}])
  const removeCard=id=>{if(cards.length===1)return;setCards(p=>p.filter(c=>c.id!==id))}
  const update=(id,field,value)=>setCards(p=>p.map(c=>c.id===id?{...c,[field]:value}:c))

  const sorted=useMemo(()=>[...cards].sort((a,b)=>{
    if(method==="snowball")return(parseFloat(a.balance)||0)-(parseFloat(b.balance)||0)
    if(method==="avalanche")return(parseFloat(b.rate)||0)-(parseFloat(a.rate)||0)
    if(method==="emotional")return(parseFloat(b.priority)||0)-(parseFloat(a.priority)||0)
    return 0
  }),[cards,method])

  const results=simulate(sorted,extra)
  const totalBalance=cards.reduce((s,c)=>s+(parseFloat(c.balance)||0),0)

  return(
    <Shell>
      <style>{css}</style>
      <a href="/" className="tool-back">← MoneyWise home</a>
      <div className="tool-header">
        <p className="tool-eyebrow">Debt</p>
        <h1 className="tool-title">Credit Card<br /><em>Debt Payoff Planner</em></h1>
      </div>
      <div className="tc">
        {cards.map((c,i)=>(
          <div className="card-row" key={c.id}>
            <div className="card-header">
              <span className="card-num">{String(i+1).padStart(2,"0")}</span>
              <input className="name-inp" placeholder="Card name (e.g. Chase Sapphire)" value={c.name} onChange={e=>update(c.id,"name",e.target.value)}/>
              {cards.length>1&&<button className="rm-btn" onClick={()=>removeCard(c.id)}>✕</button>}
            </div>
            <div className="fields">
              <div className="fl">Balance<div className="fw"><span className="fp">$</span><input className="fi" type="number" min="0" placeholder="0" value={c.balance} onChange={e=>update(c.id,"balance",e.target.value)}/></div></div>
              <div className="fl">APR<div className="fw"><input className="fi np" type="number" min="0" step="0.01" placeholder="0" value={c.rate} onChange={e=>update(c.id,"rate",e.target.value)}/><span className="fs">%</span></div></div>
              <div className="fl">Min payment<div className="fw"><span className="fp">$</span><input className="fi" type="number" min="0" placeholder="0" value={c.min} onChange={e=>update(c.id,"min",e.target.value)}/></div></div>
            </div>
          </div>
        ))}
        <button className="add-btn" onClick={addCard}>+ Add another card</button>

        <p style={{fontSize:"11px",letterSpacing:".08em",textTransform:"uppercase",color:"#888",marginBottom:".5rem"}}>Payoff strategy</p>
        <div className="method-tabs">
          {METHODS.map(m=><button key={m.key} className={`method-tab${method===m.key?" on":""}`} onClick={()=>setMethod(m.key)}>{m.label} <span style={{opacity:.6,fontSize:"10px"}}>{m.desc}</span></button>)}
        </div>

        <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.5rem"}}>
          <span style={{fontSize:"11px",letterSpacing:".08em",textTransform:"uppercase",color:"#888",whiteSpace:"nowrap"}}>Extra monthly payment</span>
          <span style={{fontSize:".9rem",color:"#aaa"}}>$</span>
          <input style={{flex:1,border:"none",borderBottom:"1.5px solid #e0dbd3",background:"transparent",fontFamily:"'DM Mono',monospace",fontSize:"1rem",color:"#1a1a1a",padding:".3rem 0",outline:"none"}} type="number" min="0" placeholder="0" value={extra} onChange={e=>setExtra(e.target.value)}/>
        </div>

        {results&&(
          <>
            <div className="hero">
              <p className="hero-ey">Payoff estimate — {METHODS.find(m=>m.key===method)?.label} method</p>
              <p className="hero-val">{results.months>=600?"50+ yrs":results.months<12?`${results.months} mo`:`${Math.floor(results.months/12)}y ${results.months%12}m`}</p>
              <p className="hero-sub">Total balance: {fmt(totalBalance)}</p>
            </div>
            <div className="rg">
              <div className="rc"><p className="rl">Total balance</p><p className="rv">{fmt(totalBalance)}</p></div>
              <div className="rc"><p className="rl">Total interest</p><p className="rv r">{fmtDec(results.totalInterest)}</p></div>
              <div className="rc"><p className="rl">Total paid</p><p className="rv">{fmt(totalBalance+results.totalInterest)}</p></div>
            </div>
          </>
        )}
        <a href="/articles/snowball-vs-avalanche-debt" className="art-link">📖 Read: Debt Snowball vs Avalanche — Which Method Wins? →</a>
      </div>
    </Shell>
  )
}
