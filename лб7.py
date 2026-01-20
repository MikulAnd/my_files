from graphviz import Digraph

# Створення схеми асинхронного зворотного лічильника на D-тригерах
dot = Digraph(comment='Практична робота №7 - Зворотний лічильник на D-тригерах')

# Тригерні елементи
for i in range(4):
    dot.node(f'D{i+1}', f'DD{i+1}\nD-тригер\nQ{i+1}', shape='box')

# Підключення імпульсів
dot.edge('CLK', 'D1', label='CLK')
dot.node('CLK', 'CLK', shape='circle')

# З’єднання тригерів
dot.edge('D1', 'D2', label='Q1')
dot.edge('D2', 'D3', label='Q2')
dot.edge('D3', 'D4', label='Q3')

# D входи підключені до інверсій Q̅
for i in range(4):
    dot.node(f'NOT{i+1}', f'NOT\nQ̅{i+1}', shape='circle')
    dot.edge(f'NOT{i+1}', f'D{i+1}', label='→ D')

# Генерація PDF
pdf_path = "/mnt/data/PR7_AsynchDownCounter.pdf"
dot.render(pdf_path, format='pdf', cleanup=True)
pdf_path
