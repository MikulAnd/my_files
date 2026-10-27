import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.Map;

public class Task2 {
    public static void main(String[] args) {
        ObjectMapper mapper = new ObjectMapper();
        Path file = Path.of("preferences.json");

        Map<String, Object> preferences = new LinkedHashMap<>();
        preferences.put("language", "uk");
        preferences.put("volume", 70);

        try {
            mapper.writeValue(file.toFile(), preferences);
            Map<?, ?> saved = mapper.readValue(file.toFile(), Map.class);
            System.out.println(saved);
        } catch (IOException e) {
            System.err.println("Помилка роботи з JSON: " + e.getMessage());
        }
    }
}