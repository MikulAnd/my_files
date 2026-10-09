public class Task2 {
    public static void main(String[] args) {
        double horizontalShift = -6.0;
        double verticalShift = 8.0;

        double absHorizontal = Math.abs(horizontalShift);
        double absVertical = Math.abs(verticalShift);

        double routeLength = Math.sqrt(Math.pow(horizontalShift, 2) + Math.pow(verticalShift, 2));

        int maxValue = 2147483647;
        int overflowValue = maxValue + 1;
        long correctValue = (long) maxValue + 1;

        double precisionResult = 0.1 + 0.2;

        System.out.println("Модуль горизонтального зміщення: " + absHorizontal);
        System.out.println("Модуль вертикального зміщення: " + absVertical);
        System.out.println("Довжина маршруту: " + routeLength);
        System.out.println("maxValue + 1 у типі int: " + overflowValue);
        System.out.println("maxValue + 1 у типі long: " + correctValue);
        System.out.println("0.1 + 0.2: " + precisionResult);
    }
}