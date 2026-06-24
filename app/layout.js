
import "./globals.css";


export const metadata = {
  title: "Digital Heroes Golf",
  description: "Golf platform with charity support",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
