import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# Встановлення бібліотек (виконати у терміналі перед запуском коду)
# pip install matplotlib seaborn

# Завантаження CSV-файлу
file_path = "data.csv"  # Замініть на ваш шлях до файлу
data = pd.read_csv(file_path)

# Побудова лінійного графіка
x = [1, 2, 3, 4, 5]
y = [2, 3, 5, 7, 11]
plt.plot(x, y, marker='o', linestyle='-', color='b')
plt.title("Лінійний графік")
plt.xlabel("X")
plt.ylabel("Y")
plt.grid(True)
plt.show()

# Побудова гістограми
column_name = "назва_стовпця"  # Замініть на реальну назву стовпця
if column_name in data.columns:
    plt.figure(figsize=(8, 6))
    sns.histplot(data[column_name], bins=10, kde=True, color='g')
    plt.title(f"Гістограма для {column_name}")
    plt.xlabel(column_name)
    plt.ylabel("Частота")
    plt.grid(True)
    plt.show()
else:
    print(f"Стовпець '{column_name}' не знайдено у файлі.")
