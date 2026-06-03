import Image from "next/image"

export default function About() {
  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      <h1>About David Graham</h1>
      
      <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <img 
          src="/images/david-graham-headshot.jpg" 
          alt="David Graham" 
          style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
        />
        <div>
          <p><strong>Senior Learning Designer</strong> at Blue Bird Corporation</p>
          <p>Previously: Accenture, FEMA, University of Southern California</p>
          <p><strong>MBA</strong> – Western Governors University</p>
          <p><strong>MFA in Creative Writing</strong> – University of Nebraska</p>
          <p><strong>BA in English</strong> – University of Georgia</p>
          <p><a href="https://www.linkedin.com/in/hsking1964" target="_blank" rel="noopener noreferrer">LinkedIn Profile →</a></p>
        </div>
      </div>

      <h2>My Professional Background</h2>
      <p>I've spent over 20 years designing learning experiences for Fortune 500 companies, government agencies, and universities. My work has been used by FEMA, Accenture, the University of Southern California, and Blue Bird Corporation. I specialize in adult learning methodologies, instructional design, and making complex information accessible.</p>
      
      <h2>My Personal Background</h2>
      <p>In 2004, I filed for bankruptcy. I had over $22,000 in credit card debt, a car note I couldn't afford, and no savings. An at-fault accident with lapsed insurance drained what little I had left. I was living in Los Angeles on a teacher's salary with rent that ate 42% of my pay.</p>
      <p>Today, my net worth exceeds $400,000. My portfolio generates over $10,000 per month in passive income. I'm not special. I just learned the math and stuck with it.</p>
      
      <h2>Why I Built MoneyWise</h2>
      <p>Most financial calculators are built by developers who understand math but not psychology. I built these tools using instructional design principles – the same methodology I use for Fortune 500 training programs. Every element is designed to help you understand and act, not just calculate.</p>
      <p><a href="/my-debt-story">Read my full debt story →</a></p>
      
      <h2>Contact</h2>
      <p>Email: david@moneywisecalculator.com</p>
      <p>Mail: David Graham, 2811 Vinveville Ave, Macon, GA 31204-2831</p>
    </main>
  )
}