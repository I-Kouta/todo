// サーバー起動はpnm run dev
// ReactからuseStateフックを保持
import { useState } from 'react';

type Todo = {
  value: string;
};

export const App = () => {
  const [text, setText] = useState('');
  
  // useState<>とすると型が異なるステートが代入できない
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  // todosステートを更新する関数
  const handleOnSubmit = () => {
    //何も入力されていなければリターン
    if (!text) return;
    // 新しいTodoの作成
    const newTodo: Todo = {
      value: text,
    };

    setTodos([newTodo, ...todos]);
    //フォームの入力をクリア
    setText('');
  };

  return (
    <div>
      {/* コールバックとして() => handOnSubmit()を渡す */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}>
          <input type="text" value={text} onChange={(e) => handleOnChange(e)} />
          <input type="submit" value="追加" onSubmit={handleOnSubmit} />
      </form>
    </div>
  );
};