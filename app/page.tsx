// app/dashboard/page.tsx

'use client'
import { Authenticator } from '@aws-amplify/ui-react';
import TodoList from '../components/TodoList';// TodoListコンポーネントを切り出す

export default function DashboardPage() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello, {user?.username}!</h1>
          <TodoList /> {/* 👈 Todoリストコンポーネントを配置 */}
          <button onClick={signOut}>サインアウト</button>
        </main>
      )}
    </Authenticator>
  );
}