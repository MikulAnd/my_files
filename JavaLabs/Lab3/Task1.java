public class Task1 {
    public static void main(String[] args) {
        String courseName = "Java";
        String copiedName = courseName;
        String enteredName = "Java";

        boolean sameName = courseName.equals(enteredName);

        String note = null;
        if (note != null) {
            System.out.println("Примітка: " + note);
        }
        System.out.println("Перевірку примітки завершено");

        String scoreText = "9.7";
        double exactScore = Double.parseDouble(scoreText);
        long roundedScore = Math.round(exactScore);

        System.out.println("Назва курсу: " + courseName);
        System.out.println("Скопійована назва: " + copiedName);
        System.out.println("Назви однакові: " + sameName);
        System.out.println("Точний бал: " + exactScore);
        System.out.println("Округлений бал: " + roundedScore);
    }
}