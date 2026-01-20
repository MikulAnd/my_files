import requests
import json
import sys

sys.stdout.reconfigure(encoding="utf-8")

# API-ключ (замініть на власний, якщо потрібно)
API_KEY = "95b2578d52602f17cf227822565ac3c5"
CITY = "Kharkiv"
URL = f"https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}&units=metric&lang=uk"

try:
    response = requests.get(URL)
    response.encoding = response.apparent_encoding
    data = response.json()

    print(json.dumps(data, ensure_ascii=False, indent=4))

    with open("weather_kharkiv.txt", "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

    print("Дані збережено в 'weather_kharkiv.txt'")

except requests.exceptions.RequestException as e:
    print(f"Помилка запиту: {e}")
except json.JSONDecodeError as e:
    print(f"Помилка JSON: {e}")
