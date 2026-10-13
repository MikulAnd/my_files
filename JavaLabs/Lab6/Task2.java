import java.util.Map;

public class Task2 {
    public static void main(String[] args) {
        Map<String, Integer> humidityLevels = Map.of(
            "Аудиторія", 38,
            "Лабораторія", 64,
            "Бібліотека", 48
        );

        String room = "Лабораторія";
        int humidity = humidityLevels.get(room);

        System.out.println("Приміщення: " + room);
        System.out.println("Вологість: " + humidity + "%");

        if (humidity < 40) {
            System.out.println("Низька вологість");
        } else if (humidity <= 60) {
            System.out.println("Нормальна вологість");
        } else {
            System.out.println("Висока вологість");
        }
    }
}