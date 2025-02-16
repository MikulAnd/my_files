import numpy as np

# 2. Створення одновимірного та двовимірного масивів
one_dim_array = np.array([1, 2, 3, 4, 5])
two_dim_array = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

print("Одновимірний масив:", one_dim_array)
print("Двовимірний масив:\n", two_dim_array)

# 3. Базові операції
print("Сума елементів одновимірного масиву:", np.sum(one_dim_array))
print("Середнє значення одновимірного масиву:", np.mean(one_dim_array))
print("Максимум у двовимірному масиві:", np.max(two_dim_array))
print("Мінімум у двовимірному масиві:", np.min(two_dim_array))

# 4. Створення матриці 3x3 та її транспонування
matrix_3x3 = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
transposed_matrix = np.transpose(matrix_3x3)

print("Матриця 3x3:\n", matrix_3x3)
print("Транспонована матриця:\n", transposed_matrix)
