import { useRecoilState } from 'recoil';
import { todoListState } from './atoms';
import { useState } from 'react';

export default function AddTodo() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const [text, setText] = useState('');

  const add = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setText('');
  };

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
      <input
        style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Нова задача..."
        onKeyDown={(e) => e.key === 'Enter' && add()}
      />
      <button onClick={add} style={{ padding: '8px 16px', background: '#3182ce', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Додати
      </button>
    </div>
  );
}