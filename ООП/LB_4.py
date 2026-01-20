class SecureData:
    def __init__(self, public_data, protected_data, private_data):
        # Ініціалізація атрибутів різних рівнів доступу
        super().__setattr__('public_data', public_data)
        super().__setattr__('_protected_data', protected_data)
        super().__setattr__('_SecureData__private_data', private_data)

    def __getattribute__(self, name):
        print(f"[INFO] Отримання атрибуту: {name}")
        return super().__getattribute__(name)

    def __getattr__(self, name):
        print(f"[ПОПЕРЕДЖЕННЯ] Атрибут '{name}' не існує або недоступний!")
        return f"Атрибут '{name}' відсутній."

    def __setattr__(self, name, value):
        if name == "_SecureData__private_data":
            print(f"[ЗАБОРОНЕНО] Зміна приватного атрибуту '{name}' неможлива!")
        else:
            print(f"[INFO] Змінюємо атрибут '{name}' на '{value}'")
            super().__setattr__(name, value)

    def __delattr__(self, name):
        if name == "_SecureData__private_data":
            print(f"[ЗАБОРОНЕНО] Видалення приватного атрибуту '{name}' заборонене!")
        else:
            print(f"[INFO] Видаляємо атрибут '{name}'")
            super().__delattr__(name)


# Приклади використання
data = SecureData("публічне", "захищене", "приватне")

print(data.public_data)          # Публічний атрибут
print(data._protected_data)      # Захищений атрибут
print(data.__dict__)             # Перегляд усіх атрибутів

# Спроби змінити атрибути
data.public_data = "нове публічне"
data._protected_data = "нове захищене"
data.__private_data = "нове приватне"  # Не зміниться

# Видалення атрибутів
del data.public_data
del data._protected_data
del data.__private_data  # Заборонено

# Спроба доступу до неіснуючого атрибуту
print(data.unknown)
