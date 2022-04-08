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
  const handleOnSubmit = () => {
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

  const handleOnEdit = (id: number, value: string) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <input type="text" value={text} onChange={(e) => handleOnChange(e)} />
        <input type="submit" value="追加" onSubmit={handleOnSubmit} />
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};