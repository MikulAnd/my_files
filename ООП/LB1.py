class Person:
    def __init__(self, name, age, address):
        self.name = name
        self.age = age
        self.address = address

    def introduce(self):
        print(f"Привіт, мене звати {self.name}, мені {self.age} років, я живу в {self.address}.")

    def __del__(self):
        print(f"Об'єкт {self.name} видалено.")


# Створення об'єктів
p1 = Person("Іван", 20, "Київ")
p2 = Person("Оля", 25, "Львів")

# Виклик методу introduce
p1.introduce()
p2.introduce()

# Видалення одного об'єкта
del p1

# Перевірка залишкового об'єкта
p2.introduce()
