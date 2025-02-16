import requests

# Виконання GET-запиту до публічного API
url = "https://jsonplaceholder.typicode.com/posts/1"
response = requests.get(url)

# Перевірка статусу відповіді та вивід результату
if response.status_code == 200:
    print("Отримані дані:")
    print(response.json())
else:
    print(f"Помилка: {response.status_code}")
