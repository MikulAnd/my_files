# Лабораторна робота: Створення функцій reducer для оновлення стану в Redux

## Виконані завдання:
1. **Базові reducers:** Розроблено та протестовано `counterReducer` (із підтримкою `SET_COUNT` payload), `userReducer` та `todosReducer`.
2. **Аналіз помилок (Завдання 7):**
   - *Помилка 1:* Пряма мутація стану (`state.count++`). Виправлено поверненням нового об'єкта через spread `{ ...state, count: state.count + 1 }`.
   - *Помилка 2:* Втрата інших властивостей об'єкта при `RESET`. Виправлено додаванням `...state`.
   - *Помилка 3:* Відсутність значення стану за замовчуванням (`state = initialState`) та гілки `default: return state`.
3. **Індивідуальне завдання (Варіант 2 — Список студентів):**
   - Реалізовано чистий reducer `studentsReducer` з діями `ADD_STUDENT`, `REMOVE_STUDENT`, `UPDATE_STUDENT`.
   - Для запобігання мутаціям використано `[...state.students]`, `.filter()` та `.map()`.

## Запуск:
1. `cd lb33-react`
2. `npm start`