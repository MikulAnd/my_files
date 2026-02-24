class Library:
    def __init__(self, books):
        # Приймає список книг при створенні 
        self.books = list(books)
        self.index = 0

    def __str__(self):
        # Красиве відображення списку книг 
        return f"Бібліотека: {self.books}"

    def __repr__(self):
        # Представлення для розробника 
        return f"Library({self.books})"

    def __len__(self):
        # Повертає кількість книг 
        return len(self.books)

    def __add__(self, other):
        # Підтримує оператор + (об'єднання бібліотек) 
        if isinstance(other, Library):
            return Library(self.books + other.books)
        raise TypeError("Можна додавати тільки об'єкти класу Library")

    def __eq__(self, other):
        # Порівняння бібліотек 
        if isinstance(other, Library):
            return self.books == other.books
        return False

    def __bool__(self):
        # Підтримує перевірку if library: 
        return len(self.books) > 0

    def __getitem__(self, index):
        # Дозволяє отримувати книги через індекс 
        return self.books[index]

    def __setitem__(self, index, value):
        # Зміна книги по індексу 
        self.books[index] = value

    def __call__(self):
        # Може бути викликаний як функція 
        return len(self.books)

    def __iter__(self):
        # Підготовка до циклу for 
        self.index = 0
        return self

    def __next__(self):
        # Ітерація по книгах 
        if self.index < len(self.books):
            book = self.books[self.index]
            self.index += 1
            return book
        else:
            raise StopIteration

# Головна частина програми для демонстрації всіх методів [cite: 34]
lib1 = Library(["Python Crash Course", "Clean Code"])
lib2 = Library(["The Pragmatic Programmer"])

print(f"1. __str__: {lib1}")
print(f"2. __repr__: {repr(lib1)}")
print(f"3. __len__ (кількість): {len(lib1)}")

# Об'єднання бібліотек (+)
lib3 = lib1 + lib2
print(f"4. __add__ (результат +): {lib3}")

print(f"5. __eq__ (lib1 == lib2): {lib1 == lib2}")

# Перевірка if library:
if lib1:
    print("6. __bool__: Бібліотека не порожня")

# Робота з індексами
print(f"7. __getitem__ (індекс 0): {lib1[0]}")
lib1[0] = "Fluent Python"
print(f"8. __setitem__ (після зміни): {lib1}")

# Робота в циклі for
print("9. __iter__ та __next__ (цикл for):")
for book in lib1:
    print(f"   - {book}")

# Виклик як функції
print(f"10. __call__: Кількість книг через виклик об'єкта = {lib1()}")