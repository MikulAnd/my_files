from fastapi import FastAPI
from services.fetch_service import fetch_urls
from services.cache_service import get_cached_data, set_cached_data

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "FastAPI сервер працює"}

@app.get("/async-requests")
async def async_requests():
    urls = ["https://jsonplaceholder.typicode.com/todos/1"] * 10
    results = await fetch_urls(urls)
    return {"results": results}

@app.get("/cached/{key}")
async def get_cache(key: str):
    data = await get_cached_data(key)
    return {"cached_data": data or "Немає даних"}

@app.post("/cached/{key}")
async def set_cache(key: str, value: str):
    await set_cached_data(key, value)
    return {"message": f"Дані збережено для ключа: {key}"}

@app.on_event("shutdown")
async def shutdown():
    """Закриваємо підключення до Redis при вимкненні сервера."""
    from services.cache_service import close_redis
    await close_redis()
