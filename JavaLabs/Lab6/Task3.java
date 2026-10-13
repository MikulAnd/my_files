import java.util.Map;

public class Task3 {
    public static void main(String[] args) {
        Map<String, String> parkingStatus = Map.of(
            "P1", "FREE",
            "P2", "BUSY",
            "P3", "CLOSED"
        );

        String zone = "P3";
        String status = parkingStatus.get(zone);

        System.out.println("Зона: " + zone);

        switch (status) {
            case "FREE":
                System.out.println("Є вільні місця");
                break;
            case "BUSY":
                System.out.println("Усі місця зайняті");
                break;
            case "CLOSED":
                System.out.println("Зона закрита");
                break;
            default:
                System.out.println("Невідомий стан");
                break;
        }
    }
}