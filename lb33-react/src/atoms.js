import { atom } from 'recoil';

export const todoListState = atom({
  key: 'todoListState',
  default: [
    { id: 1, text: 'Вивчити основи Recoil', done: true },
    { id: 2, text: 'Реалізувати фільтрацію задач', done: false }
  ],
});

export const todoFilterState = atom({
  key: 'todoFilterState',
  default: 'All', // 'All', 'Active', 'Completed'
});