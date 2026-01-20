import pandas as pd

# 2. Завантаження CSV-файлу
file_path = "data.csv"  # Замініть на ваш шлях до файлу

data = pd.read_csv(file_path)

# Відображення перших 5 рядків
print("Перші 5 рядків даних:")
print(data.head())

# 3. Основний аналіз даних
print("\nОписова статистика:")
print(data.describe())

# Вибір окремих стовпців
column_name = "назва_стовпця"  # Замініть на реальну назву стовпця
if column_name in data.columns:
    print(f"\nПерші 5 значень стовпця {column_name}:")
    print(data[column_name].head())
else:
    print(f"\nСтовпець '{column_name}' не знайдено у файлі.")
