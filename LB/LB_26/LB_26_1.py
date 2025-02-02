import sqlite3

# 1. Підключення до бази даних (створення нової, якщо стара зіпсована)
conn = sqlite3.connect('books.db')
conn.text_factory = lambda x: str(x, 'utf-8')  # Встановлення правильного кодування UTF-8
cursor = conn.cursor()

# 2. Видалення таблиці, якщо вона вже існує, щоб очистити базу
cursor.execute('DROP TABLE IF EXISTS books')
conn.commit()

# 3. Створення таблиці
cursor.execute('''
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        year_published INTEGER NOT NULL
    )
''')
conn.commit()

# 4. Додавання записів
books = [
    ("1984", "Джордж Орвелл", 1949),
    ("Майстер і Маргарита", "Михайло Булгаков", 1967),
    ("Фауст", "Йоганн Вольфганг фон Гете", 1808),
    ("Гаррі Поттер і філософський камінь", "Дж.К. Роулінг", 1997),
    ("Собаче серце", "Михайло Булгаков", 1925),
    ("Тарас Бульба", "Микола Гоголь", 1835),
    ("Вій", "Микола Гоголь", 1835)
]

cursor.executemany('''
    INSERT INTO books (title, author, year_published) VALUES (?, ?, ?)
''', books)
conn.commit()

# 5. Вибірка всіх книг
cursor.execute('SELECT * FROM books')
books = cursor.fetchall()
print("Список книг:")
for book in books:
    print(book)

# 6. Оновлення року видання книги
cursor.execute('''
    UPDATE books SET year_published = 1966 WHERE title = "Майстер і Маргарита"
''')
conn.commit()

# 7. Видалення книги
cursor.execute('''
    DELETE FROM books WHERE title = "Фауст"
''')
conn.commit()

# 8. Закриття з'єднання
conn.close()
