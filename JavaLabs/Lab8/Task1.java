public class Task1 {
    static int calculateCost(int distance, int pricePerKilometer) {
        return distance * pricePerKilometer;
    }

    static void changeDistance(int distance) {
        distance = 50;
        System.out.println("Відстань у методі: " + distance);
    }

    public static void main(String[] args) {
        int distance = 12;
        int pricePerKilometer = 8;

        int totalCost = calculateCost(distance, pricePerKilometer);
        System.out.println("Вартість поїздки: " + totalCost);

        changeDistance(distance);
        System.out.println("Відстань у main: " + distance);
    }
}