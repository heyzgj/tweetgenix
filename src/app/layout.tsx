import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="flex space-x-4 p-4 bg-gray-100">
          <Link href="/generate">Generate</Link>
          <Link href="/history">History</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
