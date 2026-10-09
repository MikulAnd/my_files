public class Task2 {
    public static void main(String[] args) {
        int energyUnits = 30;

        energyUnits += 12;
        energyUnits *= 2;
        energyUnits -= 14;

        energyUnits++;
        energyUnits--;

        int resultWithoutBrackets = 6 + 5 * 4;
        int resultWithBrackets = (6 + 5) * 4;

        int remainder = energyUnits % 6;

        System.out.println("Запас енергетичних одиниць: " + energyUnits);
        System.out.println("Результат без дужок: " + resultWithoutBrackets);
        System.out.println("Результат із дужками: " + resultWithBrackets);
        System.out.println("Остача від ділення на 6: " + remainder);
    }
}