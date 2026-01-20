# Клас-функтор для множення чисел
class Multiplier:
    def __call__(self, a, b):
        return a * b

# Клас-декоратор для логування викликів функції
class Logger:
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        print(f"Виклик функції {self.func.__name__} з аргументами {args}")
        result = self.func(*args, **kwargs)
        print(f"Результат: {result}")
        return result

# Функція для додавання чисел
@Logger
def add(a, b):
    return a + b

# --- Використання ---

mult = Multiplier()
result_mult = mult(3, 5)

result_add = add(10, 20)

print("---")
print("Результат множення:", result_mult)
print("Результат додавання:", result_add)