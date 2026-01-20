class Analyzer:
    def __init__(self, name, level):
        self.name = name
        self._level = level  # protected-рівень критичності

    def analyze(self, event):
        return "Базовий аналіз події"

    def get_level(self):
        return self._level

    def __str__(self):
        return f"Модуль: {self.name}, рівень: {self._level}"


class SignatureAnalyzer(Analyzer):
    def analyze(self, event):
        # Аналізує подію на збіг з відомими сигнатурами
        return "Сигнатурний аналіз: збіг знайдено"


class HeuristicAnalyzer(Analyzer):
    def analyze(self, event):
        # Використання super().analyze(event)
        base_analysis = super().analyze(event)
        return f"{base_analysis} -> Виявлено аномальну поведінку"


class AIMLAnalyzer(Analyzer):
    def __init__(self, name, level, model_version):
        super().__init__(name, level)
        self.__model_version = model_version  # приватний атрибут

    def update_model(self, version):
        self.__model_version = version

    def analyze(self, event):
        return "AI scoring"


class EventLog(list):
    def __init__(self):
        super().__init__()
        self.__count = 0  # приватний атрибут

    def append(self, event):
        self.__count += 1  # збільшує лічильник
        super().append(event)

    def get_count(self):
        return self.__count


def run_analysis(analyzers, event):
    # Функція поліморфізму
    for analyzer in analyzers:
        print(f"[{analyzer.name}]: {analyzer.analyze(event)}")


# --- Перевірка роботи ---

if __name__ == "__main__":
    # 1. Робота з EventLog
    log = EventLog()
    log.append({"src": "192.168.0.10", "msg": "login failed"})
    log.append({"src": "10.0.0.7", "msg": "port scan"})
    print(f"Кількість подій: {log.get_count()}")

    # 2. Створення аналізаторів
    analyzers = [
        SignatureAnalyzer("SIG-1", 2),
        HeuristicAnalyzer("HEUR-2", 3),
        AIMLAnalyzer("AI-X", 5, "v1.3")
    ]

    # 3. Запуск поліморфного аналізу
    event = {"type": "auth_fail", "ip": "10.0.0.1"}
    run_analysis(analyzers, event)

    # 4. Перевірка issubclass() та isinstance()
    print(f"issubclass(AIMLAnalyzer, Analyzer): {issubclass(AIMLAnalyzer, Analyzer)}")
    print(f"isinstance(HeuristicAnalyzer('H1', 3), Analyzer): {isinstance(HeuristicAnalyzer('H1', 3), Analyzer)}")