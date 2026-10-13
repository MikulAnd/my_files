import java.util.Map;

public class Task1 {
    public static void main(String[] args) {
        Map<String, Integer> parcelWeights = Map.of(
            "PK-10", 120,
            "PK-24", 260,
            "PK-35", 90
        );

        String parcelCode = "PK-24";
        int weight = parcelWeights.get(parcelCode);

        System.out.println("Код: " + parcelCode);
        System.out.println("Маса: " + weight + " г");

        if (weight >= 200) {
            System.out.println("Велике відправлення");
        } else {
            System.out.println("Стандартне відправлення");
        }
    }
}