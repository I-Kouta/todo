// サーバー起動はpnm run dev
// ReactからuseStateフックを保持
import { useState } from 'react';

type Todo = {
  value: string;
  readonly id: number;
};

export const App = () => {
  const [text, setText] = useState('');
  
  // useState<>とすると型が異なるステートが代入できない
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  // todosステートを更新する関数
  const handleOnSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    //何も入力されていなければリターン
    if (!text) return;
    // 新しいTodoの作成
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
    //フォームの入力をクリア
    setText('');
  };

  return (
    <div>
      <form onSubmit={(e) => handleOnSubmit(e)}>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          <input type="submit" value="追加" onSubmit={(e) => handleOnSubmit(e)} />
      </form>
      <ul>
        {todos.map((todo) => {
          return <li key={todo.id}>{todo.value}</li>;
        })}
      </ul>
    </div>
  );
};