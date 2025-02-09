import redis.asyncio as redis

redis_client = redis.Redis(host="localhost", port=6379, decode_responses=True)

async def get_cached_data(key: str):
    return await redis_client.get(key)

async def set_cached_data(key: str, value: str):
    await redis_client.set(key, value)

async def close_redis():
    """Функція для закриття підключення до Redis"""
    await redis_client.close()
