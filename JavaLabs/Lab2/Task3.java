import java.util.Scanner;

public class Task3 {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Введіть ціле число: ");
        int number = input.nextInt();

        // Арифметичні операції
        int nextNumber = number;
        nextNumber++;

        int previousNumber = number;
        previousNumber--;

        int square = number * number;
        int remainder = number % 2;
        double half = (double) number / 2;

        // Логічні перевірки
        boolean positive = number > 0;
        boolean inRange = number >= 1 && number <= 100;
        boolean outOfRange = number < 1 || number > 100;
        boolean notPositive = !positive;

        System.out.println("\n=== Результати аналізу числа ===");
        System.out.println("Введене число: " + number);
        System.out.println("Наступне число (++): " + nextNumber);
        System.out.println("Попереднє число (--): " + previousNumber);
        System.out.println("Квадрат числа: " + square);
        System.out.println("Остача від ділення на 2 (% 2): " + remainder);
        System.out.println("Половина числа: " + half);
        System.out.println("Число додатне (> 0): " + positive);
        System.out.println("У межах [1..100]: " + inRange);
        System.out.println("Поза межами [1..100]: " + outOfRange);
        System.out.println("Не додатне (!positive): " + notPositive);

        input.close();
    }
}