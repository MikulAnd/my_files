import requests
from bs4 import BeautifulSoup

# Виконання запиту до веб-сторінки
url = 'https://example.com'
response = requests.get(url)

# Перевірка статусу відповіді
if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    print("Заголовок сторінки:", soup.title.text)
else:
    print(f"Помилка: {response.status_code}")
