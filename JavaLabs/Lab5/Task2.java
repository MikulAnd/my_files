import java.util.ArrayList;

public class Task2 {
    public static void main(String[] args) {
        ArrayList<String> shoppingList = new ArrayList<>();

        shoppingList.add("Чай");
        shoppingList.add("Сік");
        shoppingList.add("Печиво");
        shoppingList.add("Молоко");

        shoppingList.add(1, "Хліб");
        shoppingList.set(0, "Кава");
        shoppingList.remove("Сік");

        System.out.println("Список покупок: " + shoppingList);
        System.out.println("Кількість елементів: " + shoppingList.size());
        System.out.println("Перший елемент: " + shoppingList.get(0));
        System.out.println("Хліб є у списку: " + shoppingList.contains("Хліб"));
    }
}