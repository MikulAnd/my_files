import aiohttp
import asyncio

async def fetch(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def fetch_urls(urls):
    tasks = [fetch(url) for url in urls]
    return await asyncio.gather(*tasks)
