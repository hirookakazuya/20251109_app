// app/dashboard/TodoList.tsx (または page.tsx)

'use client'

import { useState, useEffect } from "react";
// スキーマはフック内で使用されるため、ここでは不要（フックが内部でインポートしている）
// import type { Schema } from "../../amplify/data/resource"; 
// import { generateClient, Client } from "aws-amplify/data"; 

// 🚨 【重要】Todoリストの処理に必要なSchema型だけはインポートし直す
import type { Schema } from "@/amplify/data/resource"; 
import { useAmplifyClient } from '@/app/useAmplifyClient'; // 👈 カスタムフックをインポート

export default function TodoList() {
    // 🎉 クライアントの初期化ロジックをフックに任せる
    // clientにはバックエンドの全情報が入っている
    // しかし、clientは読み込み時にnull ->値に変わるが、
    // createのタイミングなどそれ以外では不変
    const client = useAmplifyClient();

    // todosがメモの配列、それをsetTodos関数で更新する
    // ()内は初期値で、今回は空配列[]
    // <>内はtypescriptの型定義

    // Schemaはamplify/data/resource.tsで定義したもの
    // プロパティでTodo,typeをたどっている
    // ただし、あくまでtodosのリストなので最後に[]をつけている
    // でも結局は配列のどの要素も型は同じ
    // 型にも引数にも[]をつけて単一の値と区別する
    const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);

    // 以降、ロジックはシンプルになる

    // データ取得関数、データベースからデータを読み込む
    const fetchTodos = async () => {
        if (!client) return;
        
        // await client.models.Todo.list()で返されるオブジェクトのイメージ
        // {
        //     data: [ // 実際のTodoの配列
        //         { id: "1", status: "牛乳を買う", isDone: false },
        //         { id: "2", status: "メールをチェック", isDone: true }
        //     ],
        //     // その他の情報（トークンなど、データ取得のメタ情報）
        //     nextToken: null 
        // }       

        // 分割代入 上記のうち、dataプロパティだけを取得する
        // だからamplify/data/resource.tsで正しく定義する必要あり

        const { data: items } = await client.models.Todo.list();

        // 以下でitemsを使った状態の更新が行われ、
        // 状態が更新されると、UIの更新が行われる(reactの基本機能)
        setTodos(items);
    };

    // 画面読み込み時クライアントがセットされた後、データをフェッチする
    // clientが読み込み後にnull ->値に変化することに対応している
    // useEffectはUIと関係ない処理の実行に使う
    // 二個引数を取っている
    // 一つ目は実行したい処理
    // 二つ目がトリガー
    // これは、読み込み時のclientがnull->値に変わった時の動作
    // それ以降はclientはcreateの際も不変
    useEffect(() => {
        if (client) {
            fetchTodos();
        }
    }, [client]); 

    // データ作成関数
    const createTodo = async () => {
        
        if (!client) return;

        // client.models.Todo.createでデータベースにhttpリクエスト
        // window.pronpt()はブラウザの標準機能の利用
        await client.models.Todo.create({
            status: window.prompt("Todo content?"),
            isDone: false,
        });
        fetchTodos();
    }

    // クライアントが生成されるまでローディング表示をする
    if (!client) {
        return <div>データを読み込み中...</div>;
    }
    
    // {...}:JSX内でJavascriptの式を埋め込み
    // key=idはUIには現れないが必須
    return (
        <div>
            
            <button onClick={createTodo}>Add new todo</button>
            <ul>
                {todos.map(({ id, status }) => (
                    <li key={id}>{status}</li>
                ))}
            </ul>
        </div>
    );
}