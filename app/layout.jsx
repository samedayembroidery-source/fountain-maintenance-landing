import React from 'react';

export const metadata = {
  title: 'Fountain Maintenance Inc - Professional Fountain Services',
  description: 'Professional fountain maintenance, repairs, and installation for municipalities, businesses, and estates.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
