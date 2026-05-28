export const metadata = {
  title: "MoneyWise Calculator | Free Personal Finance Tools",
  description: "Free calculators for mortgage affordability, retirement savings, emergency funds, debt payoff, and more. Make smarter money decisions with tools that do the math for you.",
  
  alternates: {
    canonical: "https://www.moneywisecalculator.com",           // ← MUST CHANGE
  },

  openGraph: {
    title: "MoneyWise Calculator | Free Personal Finance Tools",
    description: "Free calculators for mortgage affordability, retirement savings, emergency funds, debt payoff, and more. Make smarter money decisions with tools that do the math for you.",
    url: "https://www.moneywisecalculator.com",                 // ← MUST CHANGE
    siteName: "moneywisecalculator.com",
    images: [
      {
        url: "https://www.moneywisecalculator.com/og-image.png", // ← MUST CHANGE
        width: 1200,
        height: 630,
        alt: "MoneyWise Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MoneyWise Calculator | Free Personal Finance Tools",
    description: "Free calculators for mortgage affordability, retirement savings, emergency funds, debt payoff, and more. Make smarter money decisions with tools that do the math for you.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  authors: [{name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
              <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "moneywisecalculator",
              description: "Free online tool by MoneyWise Calculators",
              url: "https://www.moneywisecalculator.com",
              applicationCategory: "Finance",
              operatingSystem: "All",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
            }),
          }}
        />
    </head>
      <body>{children}</body>
    </html>
  );
}
