import './globals.css';

export const metadata = {
  title: 'The Smart Vision - Abacus & Mental Math Academy',
  description: 'Premier Abacus & Mental Math Academy for children aged 4 to 15. Interactive quiz portal, student and teacher dashboards, and Hostinger-ready Laravel 13 architecture.',
  openGraph: {
    title: 'The Smart Vision - Abacus & Mental Math Academy',
    description: 'Premier Abacus & Mental Math Academy for children aged 4 to 15. Interactive quiz portal, student and teacher dashboards, and Hostinger-ready Laravel 13 architecture.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#040430',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-[#ed4883] selection:text-white">
        {children}
      </body>
    </html>
  );
}
