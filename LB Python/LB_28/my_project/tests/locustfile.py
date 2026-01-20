from locust import HttpUser, task, between

class MyUser(HttpUser):
    host = "http://127.0.0.1:8000"  # Вказуємо базову URL-адресу FastAPI
    wait_time = between(1, 3)  # Час очікування між запитами (1-3 секунди)

    @task
    def test_root(self):
        """Тестування головної сторінки FastAPI"""
        self.client.get("/")

    @task
    def test_async_requests(self):
        """Тестування асинхронних HTTP-запитів"""
        self.client.get("/async-requests")

    @task
    def test_cache_set_get(self):
        """Тестування кешування: запис та зчитування"""
        key = "test_key"
        value = "test_value"

        # Запис у кеш
        self.client.post(f"/cached/{key}", json={"value": value})

        # Читання з кешу
        self.client.get(f"/cached/{key}")
