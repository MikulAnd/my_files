class Student:
    def __init__(self, name, age, grade):
        # Ініціалізація атрибутів [cite: 15]
        self.name = name
        self.age = age
        self.grade = grade
        # Список для ітерації, як вказано у прикладі [cite: 15]
        self._attributes = iter([name, age, grade])

    def __eq__(self, other):
        # Реалізація порівняння студентів за оцінкою (grade) [cite: 7, 21]
        if isinstance(other, Student):
            return self.grade == other.grade
        return False

    def __lt__(self, other):
        # Реалізація порівняння за віком (age) для сортування [cite: 8, 22]
        return self.age < other.age

    def __gt__(self, other):
        # Реалізація порівняння за віком (age) [cite: 8]
        return self.age > other.age

    def __hash__(self):
        # Хешування об'єкта на основі його унікальних атрибутів (name та age) [cite: 9, 25]
        # Це дозволяє використовувати об'єкт як ключ у словнику
        return hash((self.name, self.age))

    def __iter__(self):
        # Метод повертає сам об'єкт як ітератор [cite: 10, 27]
        # (Оновлюємо ітератор, щоб можна було проходити по об'єкту кілька разів)
        self._attributes = iter([self.name, self.age, self.grade])
        return self

    def __next__(self):
        # Повертає наступний атрибут з ітератора [cite: 28]
        return next(self._attributes)

    def __repr__(self):
        # Додатковий метод для гарного виводу (не обов'язковий, але корисний для перевірки)
        return f'Student("{self.name}", {self.age}, {self.grade})'

# --- Перевірка роботи (згідно із завданням) ---

# 1. Створення списку студентів [cite: 12]
students = [
    Student("Іван", 20, 85),
    Student("Марія", 22, 90),
    Student("Олексій", 19, 88),
]

# 2. Сортування студентів за віком [cite: 12, 30]
# Працює завдяки методу __lt__
sorted_students = sorted(students)
print("Сортування студентів (за віком):")
print(sorted_students)
print("-" * 20)

# 3. Використання студентів як ключів словника [cite: 12, 36]
# Працює завдяки методу __hash__
students_dict = {
    Student("Іван", 20, 85): "Група A", 
    Student("Марія", 22, 90): "Група B"
}
print("Словник із студентами:")
print(students_dict)
print("-" * 20)

# 4. Ітерація за атрибутами студента [cite: 13, 31]
# Працює завдяки __iter__ та __next__
student = Student("Іван", 20, 85)
print(f"Ітерація за атрибутами для {student.name}:")
for attribute in student:
    print(attribute)