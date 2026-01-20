import asyncio
import aiohttp

# Завдання 1: Асинхронне отримання даних з трьох URL
async def fetch_data(session, url):
    async with session.get(url) as response:
        return await response.json()

async def fetch_all():
    urls = [
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/posts/2",
        "https://jsonplaceholder.typicode.com/posts/3"
    ]
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_data(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        for result in results:
            print(result)

# Завдання 2: Асинхронний генератор
async def async_generator():
    for i in range(1, 6):
        await asyncio.sleep(0.5)
        yield i

async def print_generated_values():
    async for value in async_generator():
        print(value)

# Завдання 3: Асинхронна обробка помилок
async def fetch_with_error_handling(url):
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                if response.status == 200:
                    return await response.json()
                else:
                    print(f"Помилка: статус {response.status}")
    except aiohttp.ClientError as e:
        print(f"Помилка з'єднання: {e}")

# Запуск асинхронних функцій
async def main():
    print("Отримання даних:")
    await fetch_all()
    
    print("\nГенератор значень:")
    await print_generated_values()
    
    print("\nОбробка помилок:")
    await fetch_with_error_handling("https://jsonplaceholder.typicode.com/posts/10000")

if __name__ == "__main__":
    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:
        loop = None
    
    if loop and loop.is_running():
        asyncio.ensure_future(main())
    else:
        asyncio.run(main())
