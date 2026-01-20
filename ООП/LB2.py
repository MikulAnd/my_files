import datetime

class Logger:
    # Змінна для єдиного екземпляра класу (Singleton)
    _instance = None
    
    # Реалізація Singleton через __new__
    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            # Якщо екземпляр не створений, створюємо його
            cls._instance = super(Logger, cls).__new__(cls)
        return cls._instance # Повертаємо єдиний екземпляр

    def __init__(self):
        # Ініціалізуйте список для логів лише один раз
        if not hasattr(self, 'logs'):
            self.logs = [] 

    # 1. Реалізація методу log()
    # 4. Додаткове завдання: додавання мітки часу
    def log(self, message):
        """
        Додає повідомлення до списку логів з міткою часу.
        """
        # Додавання мітки часу (Завдання 4)
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = f"[{timestamp}] {message}"
        
        # Додавання запису до списку логів (Завдання 1)
        self.logs.append(log_entry)

    # 2. Реалізація методу show_logs()
    def show_logs(self):
        """
        Виводить усі збережені повідомлення з журналу.
        """
        print("--- ЖУРНАЛ ЛОГІВ ---")
        if self.logs:
            # Виведення кожного запису
            for entry in self.logs:
                print(entry)
        else:
            print("Журнал порожній.")
        print("--------------------")

# --- Тестування та Перевірка (Завдання 3) ---

# Створення об'єктів Logger
logger1 = Logger()
logger2 = Logger()

# Додавання логів
logger1.log("Тест логування від logger1")
logger2.log("Тест логування від logger2")

# Показати всі логи (Завдання 2)
logger1.show_logs()

# Перевірка Singleton (Завдання 3)
print("\n--- Перевірка Singleton (logger1 is logger2) ---")
print(logger1 is logger2) # Має вивести True