public class Task2 {
    static int countEven(int[] numbers, int index) {
        if (index == numbers.length) {
            return 0;
        }

        int currentCount = 0;
        if (numbers[index] % 2 == 0) {
            currentCount = 1;
        }

        return currentCount + countEven(numbers, index + 1);
    }

    public static void main(String[] args) {
        int[] numbers = {7, 12, 5, 18, 21, 30};
        int evenCount = countEven(numbers, 0);
        System.out.println("Кількість парних чисел: " + evenCount);
    }
}