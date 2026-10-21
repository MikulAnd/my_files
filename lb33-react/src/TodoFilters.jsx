import { useRecoilState, useSetRecoilState } from 'recoil';
import { todoFilterState, todoListState } from './atoms';

export default function TodoFilters() {
  const [filter, setFilter] = useRecoilState(todoFilterState);
  const setTodos = useSetRecoilState(todoListState);

  const clearCompleted = () => {
    setTodos((todos) => todos.filter((todo) => !todo.done));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center', fontSize: '14px' }}>
      <div style={{ display: 'flex', gap: '4px' }}>
        {['All', 'Active', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              padding: '4px 8px',
              background: filter === tab ? '#3182ce' : '#edf2f7',
              color: filter === tab ? '#fff' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {tab === 'All' ? 'Всі' : tab === 'Active' ? 'Активні' : 'Виконані'}
          </button>
        ))}
      </div>
      <button onClick={clearCompleted} style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer' }}>
        Очистити виконані
      </button>
    </div>
  );
}