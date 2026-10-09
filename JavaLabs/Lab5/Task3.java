import java.util.LinkedHashSet;

public class Task3 {
    public static void main(String[] args) {
        LinkedHashSet<String> participants = new LinkedHashSet<>();

        participants.add("Анна");
        participants.add("Олег");
        participants.add("Ірина");
        participants.add("Анна");
        participants.add("Максим");
        participants.add("Олег");

        System.out.println("Унікальні учасники: " + participants);
        System.out.println("Кількість учасників: " + participants.size());
        System.out.println("Ірина є у множині: " + participants.contains("Ірина"));
        System.out.println("Софія є у множині: " + participants.contains("Софія"));
    }
}