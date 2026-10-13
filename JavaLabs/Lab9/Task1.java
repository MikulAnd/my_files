public class Task1 {
    static int sumDigits(int number) {
        if (number < 10) {
            return number;
        }
        return (number % 10) + sumDigits(number / 10);
    }

    public static void main(String[] args) {
        int number = 583;
        int result = sumDigits(number);
        System.out.println("Сума цифр: " + result);
    }
}