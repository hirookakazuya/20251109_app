// @aws-amplify/backend から必要なモジュールをインポートします。
// a: スキーマ定義のためのヘルパー (例: a.model, a.string)
// defineData: データリソース全体を定義するための関数
// type ClientSchema: フロントエンドでの型付けに使用されるユーティリティ型

import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

// データのスキーマを定義します。これはGraphQLスキーマの定義に相当します。
// a.modelと定義するだけで、query(取得)、mutation(更新)も自動で定義。
const schema = a.schema({
  // 'Todo' という名前のデータモデルを定義します。
  // これは AWS DynamoDB のテーブルに対応します。
  Todo: a.model({
    // 'content' というフィールドを定義します。型は文字列 (String) です。


    status: a.string(),
    // 'isDone' というフィールドを定義します。型は真偽値 (Boolean) です。
    isDone: a.boolean()
  })
    // このモデルに対するアクセス許可（認可ルール）を定義します。
    // ここでは、パブリックな API キー (publicApiKey) を持つユーザー（クライアント）にアクセスを許可しています。
    .authorization(allow => [allow.publicApiKey()])
});

// Used for code completion / highlighting when making requests from frontend
// フロントエンド (Amplify クライアント) でリクエストを行う際、
// スキーマの型補完やハイライト表示に使用するためにエクスポートされる型です。
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
// デプロイされるデータリソース（AppSync APIとDynamoDBテーブルなど）を定義し、設定します。
export const data = defineData({
  // 上で定義した GraphQL スキーマを設定します。
  schema,
  // 認証モードを設定します。
  authorizationModes: {
    // デフォルトの認証モードとして 'apiKey' を設定します。
    defaultAuthorizationMode: 'apiKey',
    // API Key 認証モードの詳細設定です。
    apiKeyAuthorizationMode: {
      // API キーの有効期限を30日に設定します。
      expiresInDays: 30
    }
  }
});