// app/providers.tsx

'use client' // ★ これをファイルの先頭に記述！

import '@aws-amplify/ui-react/styles.css'
import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'


//ここで、Providersコンポーネントを定義している
//React.ReactNodeとは何だろうか、上記のimoprtのどれかに要素が入っているのだろうが

// ここで設定を一回だけ実行する
// SSR環境での二重実行を防ぐための簡易チェック

    Amplify.configure(outputs)


export default function Providers({ children }: { children: React.ReactNode }) {
  // ここでContext Providerなどを提供してもOK
  return <>{children}</>
}