Опис проєкту
Цей проєкт демонструє масштабування веб-додатка, створеного за допомогою FastAPI. Він включає:
✅ Асинхронну обробку HTTP-запитів (asyncio, aiohttp)
✅ Кешування даних у Redis
✅ Тестування продуктивності за допомогою Locust
✅ Моніторинг за допомогою Prometheus та Grafana

Структура проєкту

my_project/
│── services/            # Логіка роботи сервісів
│   ├── fetch_service.py # Асинхронні HTTP-запити
│   ├── cache_service.py # Робота з Redis
│── tests/               # Тестування продуктивності
│   ├── locustfile.py    # Locust-скрипт
│── main.py              # Головний файл FastAPI
│── requirements.txt     # Залежності проєкту
│── docker-compose.yml   # Конфігурація контейнеризації
│── README.md            # Опис проєкту
Встановлення та запуск
🔹 1. Клонування репозиторію
git clone https://github.com/MikulAnd/my_files.git
cd my_files/LB/LB_28/my_project
🔹 2. Встановлення залежностей
pip install -r requirements.txt
🔹 3. Запуск FastAPI-сервера
uvicorn main:app --reload
Додаток буде доступний за адресою: http://127.0.0.1:8000

🔹 4. Запуск Redis-кешу (Docker)
docker-compose up -d
🔹 5. Тестування продуктивності (Locust)
locust -f tests/locustfile.py --host=http://127.0.0.1:8000
Панель управління Locust: http://localhost:8089

🔹 6. Моніторинг (Prometheus & Grafana)
docker-compose up -d
Prometheus: http://localhost:9090
Grafana: http://localhost:3000
API-ендпоінти
Метод	URL	Опис
GET	/	Перевірка роботи сервера
GET	/async-requests	Виконання 10 асинхронних запитів
GET	/cached/{key}	Отримання кешованих даних
POST	/cached/{key}/{value}	Додавання даних у кеш
Автор
👨‍💻 MikulAnd