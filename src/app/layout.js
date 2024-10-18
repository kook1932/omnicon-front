// src/app/layout.js

import './globals.css';

export const metadata = {
  title: '개발자 컨퍼런스 플랫폼',
  description: '컨퍼런스 요약을 제공하는 플랫폼',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}