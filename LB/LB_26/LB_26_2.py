import logging
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Задаємо рівень логування, щоб тільки основні повідомлення відображались
logging.basicConfig(level=logging.INFO)

Base = declarative_base()

# Описуємо модель продукту
class Product(Base):
    __tablename__ = 'products'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)

# Створення бази даних та налаштування сесії
engine = create_engine('sqlite:///products.db', echo=False)  # echo=False вимикає SQL запити в консолі
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

# Функція для оновлення кількості продукту
def update_quantity(session, product_id, new_quantity):
    product = session.query(Product).filter(Product.id == product_id).first()
    if product:
        old_quantity = product.quantity
        product.quantity = new_quantity
        session.commit()
        logging.info(f"Кількість продукту '{product.name}' оновлено на {new_quantity}.")
    else:
        logging.info(f"Продукт з id={product_id} не знайдено.")

# Функція для видалення продукту
def delete_product(session, product_id):
    product = session.query(Product).filter(Product.id == product_id).first()
    if product:
        session.delete(product)
        session.commit()
        logging.info(f"Продукт з id={product_id} було видалено.")
    else:
        logging.info(f"Продукт з id={product_id} не знайдено.")

# Функція для додавання нового продукту
def add_product(session, product_id, name, price, quantity):
    existing_product = session.query(Product).filter(Product.id == product_id).first()
    if existing_product:
        logging.info(f"Продукт з id={product_id} вже існує в базі.")
    else:
        new_product = Product(id=product_id, name=name, price=price, quantity=quantity)
        session.add(new_product)
        session.commit()
        logging.info(f"Продукт '{name}' додано до бази з id={product_id}.")

# Додавання декількох продуктів
add_product(session, 1, 'Яблуко', 1.2, 100)
add_product(session, 2, 'Банан', 0.5, 50)
add_product(session, 3, 'Апельсин', 0.8, 200)
add_product(session, 4, 'Картофель', 0.6, 80)
add_product(session, 5, 'Морква', 0.4, 150)

# Оновлення кількості продукту
update_quantity(session, 1, 120)  # Оновлення кількості для Яблука
update_quantity(session, 2, 50)   # Оновлення кількості для Банана

# Видалення продукту
delete_product(session, 3)  # Видалення Апельсина

# Виведення всіх продуктів після змін
products = session.query(Product).all()
for product in products:
    logging.info(f"Product ID: {product.id}, Name: {product.name}, Price: {product.price}, Quantity: {product.quantity}")

# Закриття сесії
session.close()
