import sqlite3
import asyncio
from datetime import datetime
from aiogram import Bot, Dispatcher, types, F
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters import Command, StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup

# Ініціалізація бота
TOKEN = "7627039122:AAHalxFd_WFyXzFLR22fnnHA1gzVYCQ1WGQ"
bot = Bot(token=TOKEN)
dp = Dispatcher()

# Функція для створення бази даних
def create_db():
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS tasks (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER,
                        title TEXT,
                        description TEXT,
                        deadline DATE,
                        status TEXT)''')
    conn.commit()
    conn.close()

# FSM для додавання, редагування та видалення задач
class AddTask(StatesGroup):
    title = State()
    description = State()
    deadline = State()

class EditTask(StatesGroup):
    task_id = State()
    field = State()
    new_value = State()

class DeleteTask(StatesGroup):
    task_id = State()

# Головне меню
def main_menu():
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="Додати задачу", callback_data="add")],
        [InlineKeyboardButton(text="Переглянути задачі", callback_data="view")],
        [InlineKeyboardButton(text="Редагувати задачу", callback_data="edit")],
        [InlineKeyboardButton(text="Видалити задачу", callback_data="delete")]
    ])
    return keyboard

# Команда /start
@dp.message(Command("start"))
async def start_command(message: types.Message):
    await message.answer("Привіт! Я бот для керування задачами.", reply_markup=main_menu())

# Додавання задачі
@dp.callback_query(F.data == "add")
async def process_add(callback_query: types.CallbackQuery, state: FSMContext):
    await bot.send_message(callback_query.from_user.id, "Введіть заголовок задачі:")
    await state.set_state(AddTask.title)

@dp.message(StateFilter(AddTask.title))
async def process_title(message: types.Message, state: FSMContext):
    await state.update_data(title=message.text)
    await message.answer("Введіть опис:")
    await state.set_state(AddTask.description)

@dp.message(StateFilter(AddTask.description))
async def process_description(message: types.Message, state: FSMContext):
    await state.update_data(description=message.text)
    await message.answer("Введіть дедлайн (YYYY-MM-DD):")
    await state.set_state(AddTask.deadline)

@dp.message(StateFilter(AddTask.deadline))
async def process_deadline(message: types.Message, state: FSMContext):
    user_data = await state.get_data()
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tasks (user_id, title, description, deadline, status) VALUES (?, ?, ?, ?, ?)",
                   (message.from_user.id, user_data['title'], user_data['description'], message.text, "Pending"))
    conn.commit()
    conn.close()
    await state.clear()
    await message.answer("Задача додана!", reply_markup=main_menu())

# Перегляд задач
@dp.callback_query(F.data == "view")
async def process_view(callback_query: types.CallbackQuery):
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks WHERE user_id = ? ORDER BY deadline ASC", (callback_query.from_user.id,))
    tasks = cursor.fetchall()
    conn.close()
    response = "\n".join([f"ID: {t[0]}, {t[2]} (Дедлайн: {t[4]}, Статус: {t[5]})" for t in tasks]) if tasks else "Задач поки немає."
    await bot.send_message(callback_query.from_user.id, response, reply_markup=main_menu())

# Редагування задачі
@dp.callback_query(F.data == "edit")
async def process_edit(callback_query: types.CallbackQuery, state: FSMContext):
    await bot.send_message(callback_query.from_user.id, "Введіть ID задачі для редагування:")
    await state.set_state(EditTask.task_id)

@dp.message(StateFilter(EditTask.task_id))
async def process_edit_task_id(message: types.Message, state: FSMContext):
    await state.update_data(task_id=message.text)
    await message.answer("Яке поле ви хочете змінити? (title, description, deadline, status)")
    await state.set_state(EditTask.field)

@dp.message(StateFilter(EditTask.field))
async def process_edit_field(message: types.Message, state: FSMContext):
    await state.update_data(field=message.text)
    await message.answer("Введіть нове значення:")
    await state.set_state(EditTask.new_value)

@dp.message(StateFilter(EditTask.new_value))
async def process_edit_value(message: types.Message, state: FSMContext):
    user_data = await state.get_data()
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute(f"UPDATE tasks SET {user_data['field']} = ? WHERE id = ? AND user_id = ?", (message.text, user_data['task_id'], message.from_user.id))
    conn.commit()
    conn.close()
    await state.clear()
    await message.answer("Задача оновлена!", reply_markup=main_menu())

# Видалення задачі
@dp.callback_query(F.data == "delete")
async def process_delete(callback_query: types.CallbackQuery, state: FSMContext):
    await bot.send_message(callback_query.from_user.id, "Введіть ID задачі для видалення:")
    await state.set_state(DeleteTask.task_id)

@dp.message(StateFilter(DeleteTask.task_id))
async def delete_task(message: types.Message, state: FSMContext):
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = ? AND user_id = ?", (message.text, message.from_user.id))
    conn.commit()
    conn.close()
    await state.clear()
    await message.answer("Задача видалена!", reply_markup=main_menu())

# Функція для нагадувань
async def check_deadlines():
    while True:
        conn = sqlite3.connect("tasks.db")
        cursor = conn.cursor()
        cursor.execute("SELECT user_id, id, title FROM tasks WHERE deadline <= ? AND status = 'Pending'", (datetime.now().strftime('%Y-%m-%d'),))
        tasks = cursor.fetchall()
        conn.close()
        for task in tasks:
            await bot.send_message(task[0], f"Ваш Task ID {task[1]} ('{task[2]}') має дедлайн сьогодні!")
        await asyncio.sleep(3600)

# Запуск бота
async def main():
    create_db()
    asyncio.create_task(check_deadlines())
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
