public class Task1 {
    public static void main(String[] args) {
        // Оголошення даних учня
        String name = "Андрій Мікуленко";
        int age = 16;
        double averageScore = 10.4;
        char classLetter = 'A';
        boolean studiesJava = true;

        final int MAX_SCORE = 12;
        // Обчислення різниці до максимального бала
        double scoreNeeded = MAX_SCORE - averageScore;

        System.out.println("=== Картка учня ===");
        System.out.print("Учень: ");
        System.out.println(name);
        System.out.println("Вік: " + age + " років");
        System.out.println("Клас: 11-" + classLetter);
        System.out.printf("Середній бал: %.1f%n", averageScore);
        System.out.println("Вивчає Java: " + studiesJava);
        System.out.printf("До максимального бала (12) бракує: %.1f%n", scoreNeeded);
    }
}