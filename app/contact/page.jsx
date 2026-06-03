"use client"

import { useState } from "react"

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    // This currently just shows a success message.
    // To actually send email, you'll need a backend API route or a service like Formspree.
    setSubmitted(true)
  }
  
  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      <h1>Contact</h1>
      
      <div style={{ marginBottom: "2rem", padding: "1rem", background: "#f5f5f5", borderRadius: "8px" }}>
        <p style={{ margin: "0 0 0.5rem 0" }}><strong>Email:</strong> david@moneywisecalculator.com</p>
        <p style={{ margin: "0" }}><strong>Mail:</strong> David Graham, 2989 Glenrock Dr., Macon, GA 31204-1103</p>
      </div>
      
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="name" style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Name</label>
            <input 
              type="text" 
              id="name" 
              style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }} 
              required 
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Email</label>
            <input 
              type="email" 
              id="email" 
              style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }} 
              required 
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="message" style={{ display: "block", marginBottom: "0.25rem", fontWeight: "500" }}>Message</label>
            <textarea 
              id="message" 
              rows={5} 
              style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }} 
              required 
            />
          </div>
          <button 
            type="submit" 
            style={{ padding: "0.75rem 1.5rem", background: "#1a1a1a", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Send Message
          </button>
        </form>
      ) : (
        <div style={{ padding: "1rem", background: "#e6f7e6", borderRadius: "8px" }}>
          <p>Thank you for your message. I'll respond within 2 business days.</p>
        </div>
      )}
    </main>
  )
}