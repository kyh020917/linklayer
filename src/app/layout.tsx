import type { Metadata } from 'next';
import { Outfit, Fira_Code } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'LinkLayer — Your links, one place.',
  description: 'Create your beautiful link-in-bio page in seconds.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: 브라우저 확장 프로그램이 속성 추가해도 경고 안 뜸
    <html lang="ko" className={`${outfit.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        style={{
          margin: 0,
          padding: 0,
          border: 'none',
          // ✅ background 없음 — 각 페이지가 자체 배경색 사용
          fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
          // ✅ minHeight 100vh → 각 테마가 꽉 채움
          minHeight: '100vh',
        }}
      >
        {children}
      </body>
    </html>
  );
}
