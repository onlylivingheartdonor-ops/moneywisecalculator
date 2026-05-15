"use client"
import { Shell } from "../../lib/shell"
import { ALL_TOOLS } from "../../lib/links"
import Link from "next/link"

const ARTICLES = {

"how-much-house-can-i-afford": {
  title: "How Much House Can I Afford on My Salary?",
  date: "May 2025", readTime: "6 min read", category: "Home Buying", relatedTool: "mortgage",
  intro: "The most common mistake homebuyers make isn't falling in love with a house they can't afford — it's not knowing what they can afford before they start looking. A lender's pre-approval tells you what the bank will lend. That's not the same as what you can comfortably live with.",
  sections: [
    { heading: "The 28% rule — and why it's a ceiling, not a target",
      body: `Most lenders use the 28% front-end DTI rule as a qualifying threshold: your total housing costs (principal, interest, property taxes, and insurance — collectively called PITI) shouldn't exceed 28% of your gross monthly income.\n\nOn a $80,000 annual salary, that's $1,867/month in total housing costs. On a $120,000 household income, it's $2,800/month.\n\nBut 28% is a ceiling, not a target. Many financial planners recommend keeping housing costs at 25% or below — leaving room for retirement contributions, emergency savings, and the costs of homeownership that don't show up in a mortgage payment.\n\nExpenses that catch new homeowners off guard: property taxes vary enormously by location (0.5% to 2.5%+ annually), homeowner's insurance typically runs $800–2,000/year, HOA fees can add $200–600/month, and the "1% rule" suggests budgeting 1% of home value annually for maintenance and repairs.` },
    { heading: "Back-end DTI: the number lenders actually care about",
      body: `Front-end DTI covers just housing. Back-end DTI includes all monthly debt payments — housing, car loans, student loans, credit cards, and any other installment debt.\n\nMost conventional lenders cap back-end DTI at 43%. FHA loans can go to 50% with compensating factors. But qualifying and comfortable are different thresholds.\n\nIf you have $500/month in car payments and $300/month in student loans, that $800 comes directly off your housing budget. On an $80,000 salary, your effective maximum housing payment drops from $1,867 to $1,067.\n\nThis is why paying down existing debt before applying for a mortgage — even if it seems counterintuitive — can meaningfully increase what you qualify for.` },
    { heading: "What income actually buys at current rates",
      body: `At a 7% interest rate on a 30-year fixed mortgage:\n\n$60,000/year → approximately $220,000–$240,000 home price (20% down)\n$80,000/year → approximately $290,000–$320,000 home price (20% down)\n$100,000/year → approximately $360,000–$400,000 home price (20% down)\n$150,000/year → approximately $540,000–$600,000 home price (20% down)\n\nThese assume no other significant monthly debts. Every $100 in monthly debt reduces your buying power by roughly $12,000–15,000.\n\nThese are maximum figures — not recommendations. Many financial advisors suggest buying at 3–4x annual income rather than the 5–6x that 28% DTI technically allows.` },
    { heading: "The down payment question",
      body: `Twenty percent down avoids PMI (private mortgage insurance), which adds 0.5–1.5% of the loan amount annually to your payment. But 20% on a $350,000 home is $70,000 — a significant barrier.\n\nOptions for buyers with less: FHA loans allow 3.5% down with a 580+ credit score, conventional loans allow 3–5% down with PMI, and some state and local programs offer first-time buyer assistance.\n\nPutting less down preserves cash for emergencies and other goals, but PMI adds real cost — and you're carrying a larger loan at interest. The mortgage calculator can model both scenarios with your exact numbers.` },
    { heading: "The honest answer",
      body: `What you can afford is not simply a function of income. It depends on your other debts, your down payment, your local property tax rate, your financial risk tolerance, and what you want your life to look like after you buy.\n\nThe mortgage affordability calculator can give you the numbers. The decision of how much of that ceiling to actually use is yours to make.` },
  ]
},

"how-much-emergency-fund-do-i-need": {
  title: "How Much Should You Have in an Emergency Fund?",
  date: "May 2025", readTime: "5 min read", category: "Saving", relatedTool: "emergency-fund",
  intro: "The standard advice — three to six months of expenses — is correct but incomplete. Whether you need three months or nine depends on factors that vary significantly between households. Here's how to think about your specific number.",
  sections: [
    { heading: "What 'months of expenses' actually means",
      body: `An emergency fund is sized in months of essential expenses, not total spending or total income.\n\nEssential expenses are what you genuinely cannot cut in a crisis: housing, food, utilities, transportation to work, insurance premiums, minimum debt payments, and necessary medical costs.\n\nDiscretionary spending — dining out, entertainment, subscriptions, clothing, travel — gets cut first in a financial emergency. Your fund doesn't need to cover those.\n\nFor most households, essential expenses are 50–70% of total spending. A household spending $5,000/month total likely has essential expenses of $2,800–$3,500/month, not $5,000.` },
    { heading: "The variables that determine your number",
      body: `Three months is appropriate if you have a stable salaried job, a dual-income household, work in a field with low unemployment and many employers, and have other liquid assets as a backstop.\n\nSix months is the standard recommendation for most people. It covers the average job search timeline and handles most medical or home emergencies without requiring debt.\n\nNine to twelve months makes sense if you're self-employed or have variable income, you're the sole income earner, you work in a volatile industry, or you have dependents or significant health factors that increase financial risk.\n\nThere's no penalty for having more than you "need." The cost of an overfunded emergency fund is modest — slightly lower returns than investing the excess. The cost of an underfunded one can be years of debt.` },
    { heading: "Where to keep it",
      body: `An emergency fund belongs in a high-yield savings account — not a checking account, not a brokerage account, not a CD.\n\nThe requirements: fully liquid (accessible within 1–2 business days), FDIC insured, and earning real interest. Current HYSA rates of 4–5% APY mean a $20,000 fund earns $800–1,000/year just sitting there.\n\nInvestment accounts can drop 20–40% in a recession — exactly when you're most likely to need the money. A 50% drop in your emergency fund during a job loss compounds the crisis rather than solving it. Keep it in cash.` },
    { heading: "Building it when you don't have it",
      body: `If you're starting from zero, start with $1,000. This isn't enough, but it covers the most common emergencies — a car repair, a medical bill, a broken appliance — and builds the habit.\n\nThen automate. Set up an automatic transfer on payday, even if it's $50 or $100. Automation removes the decision from your path and makes saving the default rather than the exception.\n\nUse windfalls deliberately. Tax refunds, bonuses, and any unexpected income go directly to the emergency fund until it's fully funded.\n\nThe emergency fund comes before aggressive debt payoff, before additional retirement contributions, and before investing. It's the financial infrastructure that makes everything else work.` },
  ]
},

"snowball-vs-avalanche-debt": {
  title: "Debt Snowball vs Avalanche: Which Method Wins?",
  date: "May 2025", readTime: "7 min read", category: "Debt", relatedTool: "debt-payoff",
  intro: "Two people with identical debts and identical incomes will pay different amounts of total interest depending on which payoff method they use — and one of them will almost certainly quit before they finish.",
  sections: [
    { heading: "How the methods work",
      body: `Both methods share the same core mechanic: pay the minimum on all debts, then put every extra dollar toward one priority debt until it's gone, then roll that payment to the next one.\n\nSnowball: Target the smallest balance first, regardless of interest rate. When it's gone, roll its minimum payment to the next smallest. The payments compound — hence the snowball metaphor.\n\nAvalanche: Target the highest interest rate first. This minimizes total interest paid over the life of your debt. Mathematically optimal.` },
    { heading: "The math: how much does it actually matter?",
      body: `The interest savings from avalanche over snowball depend on how different your debts are in balance and rate. When high-interest debt also has the largest balance, the difference can be significant — potentially thousands of dollars.\n\nIn many real-world portfolios, the difference is more modest. If your highest-rate card also has a smaller balance, you'd pay it off first under both methods anyway.\n\nA concrete example: $15,000 across three cards — $8,000 at 22%, $5,000 at 18%, $2,000 at 15% — with $300 extra per month. Avalanche saves approximately $800–1,200 in interest compared to snowball. Meaningful, but not transformative.` },
    { heading: "The psychology: why snowball wins in practice",
      body: `Research on debt repayment behavior found that people who focus on paying off individual accounts (snowball) are more likely to eliminate all their debt than those who focus on minimizing interest.\n\nThe mechanism is motivation. Paying off a debt completely provides a tangible psychological reward that keeps people engaged. Avalanche requires working for months or years on a large high-rate balance before experiencing that win — and many people lose momentum.\n\nThe best debt payoff method is the one you actually complete. A plan abandoned halfway costs more than an imperfect plan executed fully.` },
    { heading: "When avalanche clearly wins",
      body: `Avalanche's mathematical advantage is large enough to override the psychological case for snowball when:\n\n• Your highest-rate debt is also your largest balance, at a significantly higher rate (25%+)\n• You have strong evidence you can maintain motivation without quick wins\n• The rate gap between your highest and lowest rate debts is very large (e.g., 28% vs 12%)\n\nIf your debts are similar in size and the rate differences are modest, the psychological benefit of snowball is almost certainly worth the modest interest premium.` },
    { heading: "The third option: emotional payoff",
      body: `The debt you hate most — associated with a bad decision or a difficult period — isn't always the smallest or the highest-rate. Sometimes eliminating it first is worth paying a premium in interest.\n\nThis is a legitimate strategy. The stress relief has real value, and it can increase your overall commitment to the payoff process. The credit card debt payoff calculator lets you model all three approaches with your actual numbers.` },
  ]
},

"how-much-save-for-retirement-by-age": {
  title: "How Much Should You Have Saved for Retirement by Age?",
  date: "May 2025", readTime: "8 min read", category: "Retirement", relatedTool: "retirement",
  intro: "Retirement benchmarks exist on a spectrum from comforting to alarming depending on where you are. The numbers matter less than understanding what drives them — and what levers you actually have.",
  sections: [
    { heading: "The standard benchmarks",
      body: `Widely cited guidelines suggest having saved:\n\n1× your salary by age 30\n3× your salary by age 40\n6× your salary by age 50\n8× your salary by age 60\n10× your salary by age 67\n\nThese assume maintaining roughly 45% of pre-retirement income from savings, retiring at 67, and a 4% annual withdrawal rate. They're a useful rough benchmark — not gospel.` },
    { heading: "The 4% rule and where your target comes from",
      body: `The most common retirement target calculation is the 25× rule, derived from the 4% safe withdrawal rate.\n\nThe 4% rule suggests a retiree can withdraw 4% of their portfolio in year one, adjust for inflation annually, and have a high probability of not running out of money over 30 years.\n\nFlipping this: if you expect to spend $50,000/year in retirement, you need $50,000 ÷ 0.04 = $1,250,000.\n\nImportant caveats: the rule was developed using historical US market returns; retiring earlier requires a more conservative 3–3.5% rate; and your Social Security benefit reduces how much your portfolio needs to cover.` },
    { heading: "What to do if you're behind",
      body: `First: capture your full employer match. A 50% match on 6% of salary is a guaranteed 50% return — nothing in personal finance comes close. If you're not doing this, it's the first thing to fix.\n\nIncrease your savings rate by 1% per year. A single percentage point feels painless, but compounded over a decade it's transformative. Many 401(k) plans offer automatic escalation.\n\nDon't cash out when you change jobs. Rolling to an IRA or new employer plan preserves the full amount. Cashing out triggers income taxes plus a 10% penalty — and permanently destroys the compounding potential.\n\nTime in market beats timing the market. Starting today is always better than waiting for the "right time."` },
    { heading: "The levers you actually have",
      body: `Three real levers exist:\n\n1. Save more — increasing your savings rate is the most direct path\n2. Work longer — each additional year adds contributions and removes withdrawals simultaneously\n3. Spend less in retirement — a $40,000/year target vs $60,000/year reduces required portfolio by $500,000\n\nSocial Security timing also matters significantly. Delaying benefits from 62 to 70 increases the monthly payment by approximately 76% — effectively a guaranteed 7–8% annual return on the delay.` },
    { heading: "Starting in your 50s",
      body: `Catch-up contributions exist for a reason. In 2025, people 50 and older can contribute an additional $7,500 to a 401(k) and an additional $1,000 to an IRA.\n\nIf you're significantly behind in your 50s, the most effective moves are: maximize retirement contributions including catch-up amounts, eliminate high-interest debt consuming cash flow, reassess spending expectations honestly, and consider working a few more years — which both adds contributions and delays withdrawals.\n\nBeing behind at 50 is genuinely fixable with 15 years of focused effort. The retirement savings gap calculator can show you exactly what monthly contribution closes the gap.` },
  ]
},

"subscription-creep-costing-you": {
  title: "Subscription Creep: How Small Monthly Charges Add Up to Thousands",
  date: "May 2025", readTime: "5 min read", category: "Budgeting", relatedTool: "subscriptions",
  intro: "A $12.99 charge doesn't feel like a decision. That's by design. The subscription economy is built on the psychological gap between what we pay and what we notice — and most households are losing the game without realizing it.",
  sections: [
    { heading: "What subscription creep actually looks like",
      body: `Subscription creep isn't usually one dramatic overspend. It's a Netflix account that became two streaming services that became five. It's a free trial that quietly converted. It's an annual fee that appears once a year, then gets forgotten.\n\nThe average American household now spends over $900/year on streaming services alone — before software subscriptions, fitness memberships, meal kits, news sites, and cloud storage.\n\nWhen researchers ask people to estimate their monthly subscription spending, the actual total is typically 40–60% higher than the estimate. Subscriptions are specifically designed to feel small and blend into financial background noise.` },
    { heading: "How to find every subscription you're paying for",
      body: `A thorough audit requires multiple sources:\n\nBank and credit card statements: Go back 13 months — annual subscriptions only appear once. Look for small recurring amounts ($1.99, $4.99, $9.99).\n\nEmail inbox: Search for "receipt," "subscription," "billing," and "renewal."\n\nApp stores: Both iOS and Android show active subscriptions in account settings, including active trials.\n\nPayPal and other payment processors: These hold subscriptions that don't appear on your main bank statement.\n\nOnce you have a complete list, the subscription calculator shows your true monthly and annual total.` },
    { heading: "The framework for deciding what to keep",
      body: `For each subscription, ask three questions:\n\n1. When did I last use this? If you can't remember, that's your answer.\n\n2. Would I notice if it disappeared tomorrow? If the honest answer is "probably not for a while," it's a cancellation candidate.\n\n3. If this were a one-time annual purchase, would I buy it today? Annual subscriptions normalize cost — $14.99/month feels cheaper than the $180/year it actually is. Reframing it clarifies the real decision.\n\nThe goal isn't to cancel everything. The goal is to make conscious decisions rather than letting inertia make them for you.` },
    { heading: "The investment angle",
      body: `The audit becomes more motivating with a compound interest frame.\n\nCancelling $50/month in unused subscriptions isn't just $600/year. Invested at 7% annually over 20 years, that $600/year becomes roughly $27,000.\n\nEvery subscription you pay for without using is not just costing you its monthly fee — it's costing you what that money could have become. The subscription cost calculator shows the 5, 10, and 20-year investment projection directly.` },
    { heading: "The rotation strategy for streaming",
      body: `Streaming services are uniquely suited to rotation. Subscribe to one service, watch what you want over 1–2 months, cancel, subscribe to the next one. Most services have no cancellation penalty.\n\nA disciplined rotation through four services costs roughly $15–16/month (one at a time) rather than $60–65/month (all four). Over a year, that's $500+ in savings from one behavioral change.\n\nThe barrier is inertia. Set a calendar reminder at each billing period to decide whether to stay or rotate.` },
  ]
},

}

export default function ArticlePage({ params }) {
  const article = ARTICLES[params.slug]
  if (!article) {
    return (
      <Shell>
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2rem", marginBottom: "1rem" }}>Article not found</h1>
          <a href="/articles" style={{ color: "#b45309", fontSize: "14px" }}>← Back to all articles</a>
        </div>
      </Shell>
    )
  }

  const relatedTool = ALL_TOOLS.find(t => t.slug === article.relatedTool)

  return (
    <Shell>
      <style>{`
        .art-back { font-size: 12px; color: #888; margin-bottom: 1.5rem; display: inline-block; text-decoration: none; }
        .art-back:hover { color: #1a1a1a; }
        .art-pg-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
        .art-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #b45309; margin-bottom: .5rem; }
        .art-pg-title { font-family: 'DM Serif Display', serif; font-size: clamp(1.6rem, 4vw, 2.4rem); line-height: 1.15; margin-bottom: 1rem; }
        .art-pg-meta { font-size: 12px; color: #888; display: flex; gap: 1rem; }
        .art-intro { font-size: 14px; color: #444; line-height: 1.75; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #e0dbd3; font-style: italic; }
        .art-section { margin-bottom: 2rem; }
        .art-h2 { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: #1a1a1a; margin-bottom: .75rem; }
        .art-body { font-size: 13px; color: #444; line-height: 1.8; white-space: pre-line; }
        .art-tool-cta { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.25rem 1.5rem; margin: 2rem 0; display: flex; align-items: center; gap: 1rem; text-decoration: none; color: inherit; transition: border-color .15s; }
        .art-tool-cta:hover { border-color: #b45309; }
        .art-tool-icon { font-size: 1.5rem; flex-shrink: 0; }
        .art-tool-name { font-family: 'DM Serif Display', serif; font-size: 1rem; color: #1a1a1a; margin-bottom: .2rem; }
        .art-tool-desc { font-size: 12px; color: #888; line-height: 1.4; }
        .art-tool-btn { display: inline-block; padding: .5rem 1rem; background: #1a1a1a; color: #fff; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: .06em; text-transform: uppercase; border-radius: 2px; white-space: nowrap; flex-shrink: 0; }
        .art-tool-cta:hover .art-tool-btn { background: #b45309; }
        @media (max-width: 500px) { .art-tool-cta { flex-direction: column; align-items: flex-start; } }
      `}</style>

      <a href="/articles" className="art-back">← All articles</a>

      <div className="art-pg-header">
        <p className="art-eyebrow">{article.category}</p>
        <h1 className="art-pg-title">{article.title}</h1>
        <div className="art-pg-meta">
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
      </div>

      <p className="art-intro">{article.intro}</p>

      {relatedTool && (
        <a href={`/tools/${relatedTool.slug}`} className="art-tool-cta">
          <span className="art-tool-icon">{relatedTool.icon}</span>
          <div style={{ flex: 1 }}>
            <p className="art-tool-name">{relatedTool.title}</p>
            <p className="art-tool-desc">Use the calculator to run the numbers for your specific situation.</p>
          </div>
          <span className="art-tool-btn">Open calculator →</span>
        </a>
      )}

      {article.sections.map((section, i) => (
        <div className="art-section" key={i}>
          <h2 className="art-h2">{section.heading}</h2>
          <p className="art-body">{section.body}</p>
        </div>
      ))}

      {relatedTool && (
        <a href={`/tools/${relatedTool.slug}`} className="art-tool-cta">
          <span className="art-tool-icon">{relatedTool.icon}</span>
          <div style={{ flex: 1 }}>
            <p className="art-tool-name">Run the numbers yourself</p>
            <p className="art-tool-desc">{relatedTool.description}</p>
          </div>
          <span className="art-tool-btn">Open calculator →</span>
        </a>
      )}
    </Shell>
  )
}
