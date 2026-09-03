import os

def process_log_data(input_filename, output_filename):
    """
    Функція для безпечного зчитування лог-файлу, фільтрації критичних подій
    та запису результатів у новий текстовий файл.
    """
    # Перевіряємо фізичну наявність вхідного файлу перед початком операції
    if not os.path.exists(input_filename):
        print(f"Критична помилка: Конфігураційний файл {input_filename} відсутній.")
        return False

    try:
        # Одночасне відкриття двох файлів через один контекстний менеджер
        with open(input_filename, 'r', encoding='utf-8') as src_file, \
             open(output_filename, 'w', encoding='utf-8') as dest_file:
            
            dest_file.write("=== ЗВІТ ПРО КРИТИЧНІ ПОМИЛКИ ІНФОКОМУНІКАЦІЙНОЇ СИСТЕМИ ===\n")
            dest_file.write(f"Вихідний файл: {input_filename}\n\n")
            
            counter = 0
            # Ітерація по файлу рядок за рядком (економія оперативної пам'яті)
            for line_number, current_line in enumerate(src_file, start=1):
                clean_line = current_line.strip()
                
                # Логіка фільтрації специфічного контенту інфокомунікаційного журналу
                if "ERROR" in clean_line or "CRITICAL" in clean_line:
                    formatted_line = f"Рядок {line_number:04d}: {clean_line.upper()}\n"
                    dest_file.write(formatted_line)
                    counter += 1
            
            dest_file.write(f"\nЗагальна кількість зафіксованих інцидентів: {counter}\n")
            dest_file.write("=== КІНЕЦЬ ЗВІТУ ===")
            
        print(f"Обробка завершена успішно. Сформовано файл: {output_filename}")
        return True

    except PermissionError:
        print(f"Помилка доступу: Відсутні права на запис/читання файлів.")
    except IOError as io_err:
        print(f"Критична помилка введення-виведення на рівні ОС: {io_err}")
    except Exception as general_err:
        print(f"Непередбачувана системна помилка: {general_err}")
    
    return False

# Демонстраційний запуск розробленого модуля
input_log = "network_traffic_log.txt"
output_report = "filtered_error_report.txt"

# Емуляція створення вхідних даних для демонстрації працездатності коду
with open(input_log, 'w', encoding='utf-8') as f:
    f.write("info: connection established with switch_1\n")
    f.write("error: packet drop occurred on port 5\n")
    f.write("info: backup process started successfully\n")
    f.write("critical: high latency detected on gateway 192.168.1.1\n")

# Виклик основної функції обробки
process_log_data(input_log, output_report)