from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Створення бази даних SQLite
engine = create_engine('sqlite:///test.db')
Base = declarative_base()

# Опис моделі таблиці
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)

# Створення таблиці
Base.metadata.create_all(engine)

# Створення сесії
Session = sessionmaker(bind=engine)
session = Session()

# Додавання нового користувача
new_user = User(name="Олександр")
session.add(new_user)
session.commit()

# Отримання всіх користувачів
users = session.query(User).all()
print("Список користувачів:")
for user in users:
    print(f"ID: {user.id}, Name: {user.name}")
