import { selector } from 'recoil';
import { todoListState, todoFilterState } from './atoms';

export const incompleteCount = selector({
  key: 'incompleteCount',
  get: ({ get }) => {
    const list = get(todoListState);
    return list.filter((item) => !item.done).length;
  },
});

export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Active':
        return list.filter((item) => !item.done);
      case 'Completed':
        return list.filter((item) => item.done);
      default:
        return list;
    }
  },
});