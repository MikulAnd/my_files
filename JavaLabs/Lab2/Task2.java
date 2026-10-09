import java.util.Locale;
import java.util.Scanner;

public class Task2 {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in).useLocale(Locale.US);

        System.out.print("Введіть назву товару: ");
        String productName = input.nextLine();

        System.out.print("Введіть кількість товару: ");
        int quantity = input.nextInt();

        System.out.print("Введіть ціну одного товару (через крапку): ");
        double price = input.nextDouble();

        double total = quantity * price;
        int wholeGrn = (int) total;

        System.out.println("\n=== Підсумок покупки ===");
        System.out.println("Товар: " + productName);
        System.out.println("Кількість: " + quantity + " шт.");
        System.out.printf("Ціна за одиницю: %.2f грн%n", price);
        System.out.printf("Загальна сума: %.2f грн%n", total);
        System.out.println("Ціла частина суми: " + wholeGrn + " грн");

        input.close();
    }
}