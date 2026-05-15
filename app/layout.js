export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>MoneyWise Calculator | Free Personal Finance Tools</title>
        <meta
          name="description"
          content="Free calculators for mortgage affordability, retirement savings, emergency funds, debt payoff, and more. Make smarter money decisions with tools that do the math for you."
        />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  )
}