public class Task2 {
    static void showResult(String text) {
        System.out.println(text);
    }

    static void showResult(int number) {
        System.out.println("Результат: " + number);
    }

    static int sum(int... numbers) {
        int total = 0;
        for (int number : numbers) {
            total += number;
        }
        return total;
    }

    public static void main(String[] args) {
        showResult("Сума першого набору");
        showResult(sum(4, 6, 8));

        showResult("Сума другого набору");
        showResult(sum(3, 5, 7, 9));
    }
}