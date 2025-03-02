import sqlite3
import sys
from datetime import datetime

# Функція для створення бази даних та таблиці задач
def create_db():
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS tasks (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        title TEXT,
                        description TEXT,
                        deadline DATE,
                        status TEXT)''')
    conn.commit()
    conn.close()

# Функція для додавання нової задачі в базу даних
def add_task():
    title = input("Заголовок задачі: ")
    description = input("Опис задачі: ")
    deadline = input("Дедлайн (YYYY-MM-DD): ")
    status = "Pending"
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO tasks (title, description, deadline, status)
                      VALUES (?, ?, ?, ?)''', (title, description, deadline, status))
    conn.commit()
    conn.close()
    print("Задача додана!")

# Функція для перегляду всіх задач у базі даних
def view_tasks():
    sort_by_deadline = input("Сортувати за дедлайном? (y/n): ").lower() == 'y'
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    if sort_by_deadline:
        cursor.execute('SELECT * FROM tasks ORDER BY deadline')
    else:
        cursor.execute('SELECT * FROM tasks')
    tasks = cursor.fetchall()
    conn.close()
    for task in tasks:
        print(f"ID: {task[0]}, Заголовок: {task[1]}, Опис: {task[2]}, Дедлайн: {task[3]}, Статус: {task[4]}")

# Функція для редагування задачі за її ID
def edit_task():
    task_id = int(input("ID задачі для редагування: "))
    title = input("Новий заголовок (залишити порожнім для без змін): ")
    description = input("Новий опис (залишити порожнім для без змін): ")
    deadline = input("Новий дедлайн (залишити порожнім для без змін): ")
    status = input("Новий статус (залишити порожнім для без змін): ")
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    if title:
        cursor.execute('UPDATE tasks SET title = ? WHERE id = ?', (title, task_id))
    if description:
        cursor.execute('UPDATE tasks SET description = ? WHERE id = ?', (description, task_id))
    if deadline:
        cursor.execute('UPDATE tasks SET deadline = ? WHERE id = ?', (deadline, task_id))
    if status:
        cursor.execute('UPDATE tasks SET status = ? WHERE id = ?', (status, task_id))
    conn.commit()
    conn.close()
    print(f"Задача з ID {task_id} оновлена!")

# Функція для видалення задачі за її ID
def delete_task():
    task_id = int(input("ID задачі для видалення: "))
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tasks WHERE id = ?', (task_id,))
    conn.commit()
    conn.close()
    print(f"Задача з ID {task_id} видалена!")

# Головне меню для користувача
def main_menu():
    while True:
        print("\nМеню:")
        print("1. Додати задачу")
        print("2. Переглянути задачі")
        print("3. Редагувати задачу")
        print("4. Видалити задачу")
        print("5. Вихід")
        choice = input("Виберіть опцію: ")
        if choice == '1':
            add_task()
        elif choice == '2':
            view_tasks()
        elif choice == '3':
            edit_task()
        elif choice == '4':
            delete_task()
        elif choice == '5':
            break
        else:
            print("Невірний вибір. Спробуйте ще раз.")

# Запуск програми, створення бази даних, якщо її ще немає
if __name__ == "__main__":
    create_db()
    main_menu()
