// amplify/auth/resource.ts
import { defineAuth, secret } from "@aws-amplify/backend";

/**
 * The Amplify Auth resource definition.
 */
export const auth = defineAuth({
  loginWith: {
    // ユーザー名とパスワードによるログインを有効化
    email: true,
  },
});