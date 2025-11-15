// src/hooks/useAmplifyClient.ts (例)
'use client'

import { useState, useEffect } from 'react';
import { generateClient, Client } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource'; // 👈 パスに注意

// クライアントを生成し、その状態を返すカスタムフック
export function useAmplifyClient() {
  // clientの状態を管理し、初期値はnullにする
  const [client, setClient] = useState<Client<Schema> | null>(null);

  // コンポーネントがマウントされたら、クライアントを生成する
  useEffect(() => {
    // Amplifyの設定が Providers.tsx で完了していることを期待
    setClient(generateClient<Schema>());
  }, []);

  return client; // client (または null) を返す
}