// amplify/backend.ts
import { defineBackend } from '@aws-amplify/backend';
// 認証リソースをインポート
import { auth } from './auth/resource.ts'; 
import { data } from './data/resource.ts'; 

// The Amplify backend definition.
defineBackend({
  auth, // ここにインポートした 'auth' を追加
  data, // ここにインポートした 'data' を追加
});