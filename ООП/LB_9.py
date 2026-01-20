from abc import ABC, abstractmethod

class Processor(ABC):
    """
    Абстрактний базовий клас[cite: 7].
    """
    def __init__(self, name):
        self.name = name  # [cite: 8]

    @abstractmethod
    def process(self, data):
        pass  # [cite: 9]

    def info(self):
        return f"Процесор: {self.name}"  # [cite: 10]


class JSONProcessor(Processor):
    """
    Клас обробки JSON з використанням __slots__ та property.
    """
    __slots__ = ("name", "_version")  # Обмеження атрибутів [cite: 12]

    def __init__(self, name, version):
        super().__init__(name)
        self._version = version  # [cite: 14]

    @property
    def version(self):
        return self._version  # [cite: 15]

    @version.setter
    def version(self, val):
        print(f"Set version to {val}")
        self._version = val  # [cite: 15]

    def process(self, data):
        # Реалізація перевірки, чи є data валідним JSON (імітація) [cite: 11]
        if isinstance(data, str) and data.strip().startswith("{") and data.strip().endswith("}"):
            return f"JSON оброблено (версія {self.version})"
        return "Помилка: Невалідний JSON формат"


class CSVProcessor(Processor):
    """
    Клас обробки CSV з використанням __slots__.
    """
    __slots__ = ("name",)  # [cite: 12]

    def process(self, data):
        # Реалізація підрахунку кількості колонок у CSV-рядку [cite: 11]
        if isinstance(data, str):
            columns = data.count(',') + 1
            return f"CSV оброблено: {columns} стовпців"
        return "Помилка: Невалідні дані"


class LogMixin:
    """
    Міксин для журналювання[cite: 17].
    """
    def log(self, message):
        print(f"[LOG]: {message}")


class LoggedJSONProcessor(JSONProcessor, LogMixin):
    """
    Клас, що поєднує JSONProcessor та LogMixin (Множинне наслідування)[cite: 18].
    """
    def process(self, data):
        self.log(f"Початок обробки JSON '{data}'")  # [cite: 21]
        result = super().process(data)
        self.log(f"Завершення обробки JSON. Результат: {result}")  # [cite: 21]
        return result


class SmartJSONProcessor(LoggedJSONProcessor):
    """
    Клас для демонстрації розширення слотів[cite: 23].
    """
    __slots__ = ("mode",)  # Додатковий слот, успадковує слоти батьків

    def __init__(self, name, version, mode):
        super().__init__(name, version)
        self.mode = mode


# --- Виконання (Демонстрація поліморфізму) ---

if __name__ == "__main__":
    # Створення списку процесорів [cite: 26]
    processors = [
        JSONProcessor("JSON1", "1.0"),
        CSVProcessor("CSV1"),
        LoggedJSONProcessor("JSON_LOG", "2.1")
    ]

    print("--- Демонстрація поліморфізму ---")
    test_data_json = '{"key": "value"}'
    test_data_csv = "col1,col2,col3"

    for p in processors:
        # Вибір даних залежно від типу для наочності (або універсальні дані)
        data = test_data_csv if isinstance(p, CSVProcessor) else test_data_json
        
        # Поліморфний виклик методу process [cite: 31]
        print(f"[{p.name}]: {p.process(data)}") 

    print("\n--- Демонстрація MRO та Slots ---")
    # Перевірка роботи property зі slots
    jp = JSONProcessor("Demo", "1.0")
    jp.version = "1.5"  # Setter працює
    print(f"Version updated: {jp.version}")

    # Демонстрація SmartJSONProcessor (slots combine)
    smart = SmartJSONProcessor("Smart1", "3.0", "verbose")
    smart.mode = "silent"
    print(f"SmartProcessor mode: {smart.mode}, name: {smart.name}")
    
    # Спроба додати атрибут, якого немає в slots (викличе помилку, якщо розкоментувати)
    # try:
    #     smart.new_attr = 100
    # except AttributeError as e:
    #     print(f"Перевірка slots успішна: {e}") 