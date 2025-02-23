import sqlite3

def create_table():
    with sqlite3.connect("library.db") as conn:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS books (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            title TEXT NOT NULL,
                            author TEXT NOT NULL,
                            year INTEGER,
                            genre TEXT)''')
        conn.commit()

def add_books():
    books = [
        ("1984", "George Orwell", 1949, "Dystopian"),
        ("To Kill a Mockingbird", "Harper Lee", 1960, "Fiction"),
        ("The Great Gatsby", "F. Scott Fitzgerald", 1925, "Classic"),
        ("Moby-Dick", "Herman Melville", 1851, "Adventure"),
        ("War and Peace", "Leo Tolstoy", 1869, "Historical")
    ]
    with sqlite3.connect("library.db") as conn:
        cursor = conn.cursor()
        cursor.executemany("INSERT INTO books (title, author, year, genre) VALUES (?, ?, ?, ?)", books)
        conn.commit()

def fetch_all_books():
    with sqlite3.connect("library.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM books")
        for row in cursor.fetchall():
            print(row)

def fetch_books_by_genre():
    genre = input("Enter genre: ")
    with sqlite3.connect("library.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM books WHERE genre = ?", (genre,))
        for row in cursor.fetchall():
            print(row)

def update_book_year():
    title = input("Enter book title: ")
    year = input("Enter new publication year: ")
    with sqlite3.connect("library.db") as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE books SET year = ? WHERE title = ?", (year, title))
        conn.commit()

def delete_book():
    title = input("Enter book title to delete: ")
    with sqlite3.connect("library.db") as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM books WHERE title = ?", (title,))
        conn.commit()

def main():
    create_table()
    add_books()
    while True:
        print("\n1. Show all books\n2. Show books by genre\n3. Update book year\n4. Delete book\n5. Exit")
        choice = input("Choose an option: ")
        try:
            if choice == "1":
                fetch_all_books()
            elif choice == "2":
                fetch_books_by_genre()
            elif choice == "3":
                update_book_year()
            elif choice == "4":
                delete_book()
            elif choice == "5":
                break
            else:
                print("Invalid choice.")
        except sqlite3.Error as e:
            print(f"Database error: {e}")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    main()
