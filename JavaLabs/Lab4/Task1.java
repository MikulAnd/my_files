public class Task1 {
    public static void main(String[] args) {
        String stationName = "Метеостанція Харків";
        int sensorNumber = 4;
        final double NORMAL_PRESSURE = 1013.25;

        var measurementUnit = "°C";
        var sensorActive = true;

        System.out.println("Назва станції: " + stationName);
        System.out.println("Номер датчика: " + sensorNumber);
        System.out.println("Нормальний тиск: " + NORMAL_PRESSURE + " гПа");
        System.out.println("Одиниця вимірювання: " + measurementUnit);
        System.out.println("Датчик активний: " + sensorActive);

        {
            int calibrationOffset = 2;
            System.out.println("Поправка калібрування: " + calibrationOffset);
        }
    }
}