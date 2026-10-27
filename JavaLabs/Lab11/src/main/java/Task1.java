import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Task1 {
    public static void main(String[] args) {
        Path reminder = Path.of("reminder.txt");

        try (BufferedWriter writer = Files.newBufferedWriter(reminder)) {
            writer.write("Підготувати лабораторну роботу");
            writer.newLine();
            writer.write("Перевірити створений файл");
        } catch (IOException e) {
            System.err.println("Помилка запису: " + e.getMessage());
        }

        try (BufferedReader reader = Files.newBufferedReader(reminder)) {
            String firstLine = reader.readLine();
            System.out.println("Перший запис: " + firstLine);
        } catch (IOException e) {
            System.err.println("Помилка читання: " + e.getMessage());
        }
    }
}