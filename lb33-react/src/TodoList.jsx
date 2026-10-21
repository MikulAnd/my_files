import { useRecoilState, useRecoilValue } from 'recoil';
import { todoListState } from './atoms';
import { incompleteCount, filteredTodoListState } from './selectors';
import TodoFilters from './TodoFilters';

export default function TodoList() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const filteredTodos = useRecoilValue(filteredTodoListState);
  const left = useRecoilValue(incompleteCount);

  const toggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const remove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <p style={{ fontWeight: 'bold', color: '#2d3748' }}>Невиконаних задач: {left}</p>
      
      <TodoFilters />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #edf2f7',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#a0aec0' : '#2d3748' }}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggle(todo.id)}
              />
              {todo.text}
            </label>
            <button onClick={() => remove(todo.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px' }} title="Видалити">
              🗑️
            </button>
          </li>
        ))}
      </ul>
      {filteredTodos.length === 0 && <p style={{ textAlign: 'center', color: '#a0aec0' }}>Список порожній</p>}
    </div>
  );
}