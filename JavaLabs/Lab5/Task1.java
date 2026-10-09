import java.util.Arrays;
import java.util.Scanner;

public class Task1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Введіть п'ять цілих чисел:");
        int first = scanner.nextInt();
        int second = scanner.nextInt();
        int third = scanner.nextInt();
        int fourth = scanner.nextInt();
        int fifth = scanner.nextInt();

        int[] numbers = {first, second, third, fourth, fifth};

        System.out.println("Початковий масив: " + Arrays.toString(numbers));

        Arrays.sort(numbers);

        System.out.println("Відсортований масив: " + Arrays.toString(numbers));
        System.out.println("Найменше число: " + numbers[0]);
        System.out.println("Найбільше число: " + numbers[numbers.length - 1]);

        scanner.close();
    }
}