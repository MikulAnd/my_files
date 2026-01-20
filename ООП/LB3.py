class BankAccount:
    def __init__(self, account_holder, balance=0):
        # Ініціалізація приватних атрибутів власника та балансу
        self._account_holder = account_holder
        self._balance = balance

    @property
    def balance(self):
        """Геттер для балансу"""
        return self._balance

    @balance.setter
    def balance(self, amount):
        """Сетер для балансу з перевіркою"""
        if amount >= 0:
            self._balance = amount
        else:
            print("Помилка: баланс не може бути від’ємним!")

    def show_account_info(self):
        """Метод для виведення інформації про рахунок"""
        print(f"Власник рахунку: {self._account_holder}")
        print(f"Поточний баланс: {self._balance} грн")

# ======= Приклади використання =======

account = BankAccount("Олександр Іваненко", 1000)

# Отримання балансу
print("Поточний баланс:", account.balance)

# Встановлення нового значення (коректного)
account.balance = 500

# Спроба встановити від’ємне значення
account.balance = -200  # Має вивести повідомлення про помилку

# Виведення інформації
account.show_account_info()
