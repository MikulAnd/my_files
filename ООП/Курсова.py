import json
import tkinter as tk
from tkinter import messagebox, ttk
from datetime import datetime
import os

# Клас Завдання (Task) - основна структурна одиниця даних
class Task:
    def __init__(self, id, title, description, deadline, priority, status="Нове"):
        self.id = id
        self.title = title
        self.description = description
        self.deadline = deadline  # Формат: РРРР-ММ-ДД
        self.priority = priority  # Високий/Середній/Низький
        self.status = status      # Нове/В роботі/Виконано

    # Метод для перетворення об'єкта у словник для серіалізації в JSON
    def to_dict(self):
        return self.__dict__

# Клас Категорія (Проєкт) - містить назву та список об'єктів завдань
class Category:
    def __init__(self, name):
        self.name = name
        self.tasks = [] # Список завдань (агрегація об'єктів Task)

    def add_task(self, task):
        self.tasks.append(task)

# Клас-Менеджер (Планувальник) - реалізує логіку маніпуляції даними
class TaskManager:
    def __init__(self, file_name="tasks_database.json"):
        # Визначення стабільного шляху до файлу в папці проєкту
        base_path = os.path.dirname(os.path.abspath(__file__))
        self.file_path = os.path.join(base_path, file_name)
        
        self.categories = {} # Словник категорій
        self.load_data() # Завантаження стану при ініціалізації

    # Метод додавання завдання з вибором категорії та пріоритету
    def add_task_to_manager(self, category_name, title, description, deadline, priority):
        if category_name not in self.categories:
            self.categories[category_name] = Category(category_name)
        
        # Генерація наскрізного ID
        all_tasks_count = sum(len(cat.tasks) for cat in self.categories.values())
        new_task = Task(all_tasks_count + 1, title, description, deadline, priority)
        self.categories[category_name].add_task(new_task)
        self.save_data()

    # Отримання загального списку для виведення в інтерфейс
    def get_tasks_list(self, only_overdue=False):
        result = []
        today = datetime.now().strftime('%Y-%m-%d')
        for cat_name, category in self.categories.items():
            for task in category.tasks:
                if only_overdue:
                    # Фільтрація тільки протермінованих активних завдань
                    if task.deadline < today and str(task.status).lower() != "виконано":
                        result.append((cat_name, task))
                else:
                    result.append((cat_name, task))
        # Сортування списку за датою виконання
        return sorted(result, key=lambda x: x[1].deadline)

    # Метод зміни статусу завдання (наприклад, "Виконано")
    def update_status(self, task_id, status):
        for category in self.categories.values():
            for task in category.tasks:
                if task.id == task_id:
                    task.status = status
                    self.save_data()
                    return True
        return False

    # Метод видалення завершених завдань
    def delete_completed(self):
        for category in self.categories.values():
            category.tasks = [t for t in category.tasks if str(t.status).lower() != "виконано"]
        self.save_data()

    # Збереження списку завдань у файл JSON
    def save_data(self):
        data = {name: [t.to_dict() for t in cat.tasks] for name, cat in self.categories.items()}
        with open(self.file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

    # Завантаження завдань при запуску програми
    def load_data(self):
        if os.path.exists(self.file_path):
            try:
                with open(self.file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for cat_name, tasks_list in data.items():
                        self.categories[cat_name] = Category(cat_name)
                        for t_data in tasks_list:
                            self.categories[cat_name].add_task(Task(**t_data))
            except (json.JSONDecodeError, TypeError):
                self.categories = {}

# Графічний інтерфейс застосунку (GUI)
class TaskApp:
    def __init__(self, window):
        self.manager = TaskManager()
        self.window = window
        self.window.title("Task Manager - Мікуленко Андрій (ПЗ-11-11)")
        self.window.geometry("850x550")

        # Компоненти інтерфейсу: Панель введення
        input_frame = tk.LabelFrame(self.window, text=" Додавання нового завдання ")
        input_frame.pack(fill="x", padx=15, pady=10)

        tk.Label(input_frame, text="Назва:").grid(row=0, column=0, padx=5, pady=5)
        self.name_ent = tk.Entry(input_frame, width=20)
        self.name_ent.grid(row=0, column=1)

        tk.Label(input_frame, text="Категорія:").grid(row=0, column=2, padx=5)
        self.cat_ent = tk.Entry(input_frame, width=15)
        self.cat_ent.grid(row=0, column=3)

        tk.Label(input_frame, text="Дата (РРРР-ММ-ДД):").grid(row=1, column=0, padx=5)
        self.date_ent = tk.Entry(input_frame, width=20)
        self.date_ent.insert(0, datetime.now().strftime('%Y-%m-%d'))
        self.date_ent.grid(row=1, column=1)

        tk.Label(input_frame, text="Пріоритет:").grid(row=1, column=2, padx=5)
        self.prior_box = ttk.Combobox(input_frame, values=["Високий", "Середній", "Низький"], width=13)
        self.prior_box.current(1)
        self.prior_box.grid(row=1, column=3)

        tk.Button(input_frame, text="Додати завдання", command=self.action_add, bg="#4CAF50", fg="white").grid(row=0, column=4, rowspan=2, padx=20, sticky="nsew")

        # Таблиця (Treeview) для відображення завдань
        cols = ("ID", "Категорія", "Назва", "Дедлайн", "Пріоритет", "Статус")
        self.tree = ttk.Treeview(self.window, columns=cols, show='headings')
        for col in cols:
            self.tree.heading(col, text=col)
            self.tree.column(col, width=100 if col != "ID" else 40)
        self.tree.pack(fill="both", expand=True, padx=15)

        # Панель управління функціями
        btn_frame = tk.Frame(self.window)
        btn_frame.pack(fill="x", padx=15, pady=15)

        tk.Button(btn_frame, text="Відмітити як Виконано", command=self.action_done).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Тільки протерміновані", command=self.action_filter).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Оновити/Всі активні", command=self.action_refresh).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Видалити завершені", command=self.action_clear, fg="red").pack(side="right", padx=5)

        self.action_refresh()

    def action_add(self):
        if self.name_ent.get() and self.cat_ent.get():
            self.manager.add_task_to_manager(self.cat_ent.get(), self.name_ent.get(), "", self.date_ent.get(), self.prior_box.get())
            self.action_refresh()
            self.name_ent.delete(0, tk.END)
        else:
            messagebox.showwarning("Помилка", "Необхідно вказати назву та категорію!")

    def action_refresh(self, filter_overdue=False):
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        display_list = self.manager.get_tasks_list(only_overdue=filter_overdue)
        for cat_name, task in display_list:
            # Сортування завдань реалізовано всередині менеджера
            self.tree.insert("", "end", values=(task.id, cat_name, task.title, task.deadline, task.priority, task.status))

    def action_done(self):
        selected = self.tree.selection()
        if selected:
            t_id = self.tree.item(selected[0])['values'][0]
            if self.manager.update_status(t_id, "Виконано"):
                self.action_refresh()

    def action_filter(self):
        self.action_refresh(filter_overdue=True)

    def action_clear(self):
        self.manager.delete_completed()
        self.action_refresh()

# Точка входу в програму
if __name__ == "__main__":
    root = tk.Tk()
    app = TaskApp(root)
    root.mainloop()