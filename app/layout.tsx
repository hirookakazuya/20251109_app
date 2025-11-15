// app/layout.tsx

// ★ "use client" はここに書かない（Server Componentのままにする）

import './globals.css' // グローバルCSSのインポート

// 新しく作成した Client Component ラッパーをインポート
import Providers from '../app/providers' 

//ここは、ログイン前の画面のroot

export default function RootLayout({
  children,
}: {
  children: React.ReactNode // ★ childrenを受け取る形式が必須
}) {
  return (
    <html lang="ja">
      <body>
        {/* Providers (Client Component) でラップ */}
        <Providers>{children}</Providers> 
      </body>
    </html>
  )
}