class Descriptor:
    """Data descriptor для керування атрибутом з обмеженнями min/max."""
    def __init__(self, name, min_value=0, max_value=100000):
        # Ініціалізація дескриптора
        self.name = name
        self.min_value = min_value
        self.max_value = max_value

    def __get__(self, instance, owner):
        # Отримання значення атрибуту
        if instance is None:
            return self
        # Повертаємо значення з instance.__dict__
        return instance.__dict__.get(self.name, None)

    def __set__(self, instance, value):
        # Встановлення значення атрибуту з умовою
        # Перевірка, що значення знаходиться в межах
        if self.min_value <= value <= self.max_value:
            instance.__dict__[self.name] = value
        else:
            print(f"Помилка: Значення '{self.name}' ({value}) має бути в межах від {self.min_value} до {self.max_value}.")

    def __delete__(self, instance):
        # Видалення атрибуту з повідомленням
        if self.name in instance.__dict__:
            del instance.__dict__[self.name]
            print(f"Атрибут '{self.name}' було видалено.")
        else:
            print(f"Атрибут '{self.name}' не знайдено.")


class NonDataDescriptor:
    """Non-data descriptor, що дозволяє встановити значення лише раз."""
    
    # Використовуємо __set_name__ для автоматичного отримання імені
    # (наприклад, 'bonus'), коли Python створює клас Employee
    def __set_name__(self, owner, name):
        self._name = name

    def __get__(self, instance, owner):
        # Повернення значення атрибуту
        if instance is None:
            return self
        return instance.__dict__.get(self._name, None)

    def __set__(self, instance, value):
        # Дозволяє встановити значення тільки один раз
        # Перевіряємо, чи значення вже встановлене
        if self._name in instance.__dict__:
            print(f"Помилка: Атрибут '{self._name}' можна встановити лише один раз.")
        else:
            # Встановлюємо значення, оскільки це вперше
            instance.__dict__[self._name] = value


class Employee:
    # Атрибут salary керується дескриптором Descriptor
    salary = Descriptor("salary", 0, 100000)
    
    # Атрибут bonus керується NonDataDescriptor
    bonus = NonDataDescriptor()

    def __init__(self, name, salary, bonus):
        # Ініціалізація атрибутів працівника
        self.name = name
        self.salary = salary  # Тут спрацює Descriptor.__set__
        self.bonus = bonus   # Тут спрацює NonDataDescriptor.__set__


# --- Тестовий код для перевірки коректної роботи ---

print("Створюємо працівника 'Іван Петров' (ЗП: 50000, Бонус: 5000)...")
employee = Employee("Іван Петров", 50000, 5000)
print(f"Поточна зарплата: {employee.salary}")
print(f"Поточний бонус: {employee.bonus}")

print("\n--- Перевірка 'salary' (Data Descriptor) ---")
print("Спроба встановити salary = 120000 (повинна бути помилка):")
employee.salary = 120000  # Не має встановитися
print(f"Зарплата після спроби: {employee.salary}") # Залишиться 50000

print("\nСпроба встановити salary = 70000 (коректне значення):")
employee.salary = 70000
print(f"Зарплата після спроби: {employee.salary}") # Має стати 70000

print("\n--- Перевірка 'bonus' (Non-Data Descriptor) ---")
print("Спроба встановити bonus = 10000 (повинна бути помилка, бо вже встановлено):")
employee.bonus = 10000  # Має заблокувати зміну
print(f"Бонус після спроби: {employee.bonus}") # Залишиться 5000

print("\n--- Перевірка 'delete' ---")
print("Видалення 'salary':")
del employee.salary  # Має вивести повідомлення про видалення
print(f"Зарплата після видалення: {employee.salary}") # Має бути None