public class Task2 {
    public static void main(String[] args) {
        int[] measurements = {18, 21, 24, -1, 27, 30};

        for (int measurement : measurements) {
            if (measurement == -1) {
                System.out.println("Отримано сигнал зупинки");
                break;
            }
            System.out.println("Показник: " + measurement);
        }
    }
}