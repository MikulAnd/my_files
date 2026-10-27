import org.apache.commons.lang3.StringUtils;

public class Main {
    public static void main(String[] args) {
        String emptyText = "   ";
        String sampleText = "Харківський фаховий коледж";
        String word = "Java";

        System.out.println("Рядок порожній або з пробілів: " + StringUtils.isBlank(emptyText));
        System.out.println("Реверс рядка: " + StringUtils.reverse(word));
        System.out.println("Скорочений текст: " + StringUtils.abbreviate(sampleText, 15));
        System.out.println("Містить тільки літери: " + StringUtils.isAlpha(word));
    }
}