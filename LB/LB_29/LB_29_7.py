import torch
import torch.nn as nn
import torch.optim as optim

# Визначення простої нейронної мережі
class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(2, 4)
        self.fc2 = nn.Linear(4, 1)
        
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.sigmoid(self.fc2(x))
        return x

# Ініціалізація моделі, функції втрат і оптимізатора
model = SimpleNN()
criterion = nn.BCELoss()
optimizer = optim.SGD(model.parameters(), lr=0.01)

# Генерація випадкових даних для навчання
X = torch.randn(10, 2)
y = torch.randint(0, 2, (10, 1)).float()

# Виконання однієї ітерації навчання
optimizer.zero_grad()
predictions = model(X)
loss = criterion(predictions, y)
loss.backward()
optimizer.step()

print("Одна ітерація навчання завершена. Втрата:", loss.item())
