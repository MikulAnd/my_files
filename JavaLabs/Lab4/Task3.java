public class Task3 {
    public static void main(String[] args) {
        double itemPrice = 250.0;
        int quantity = 3;
        double customerMoney = 1000.0;
        boolean userConfirmed = true;

        final double DELIVERY_COST = 80.0;
        final double FREE_DELIVERY_LIMIT = 700.0;

        var subtotal = itemPrice * quantity;
        boolean freeDelivery = subtotal >= FREE_DELIVERY_LIMIT;

        double totalWithDelivery = subtotal + DELIVERY_COST;
        double totalWithoutDelivery = subtotal;

        boolean enoughMoney = customerMoney >= totalWithDelivery;
        boolean orderCanBeProcessed = enoughMoney && userConfirmed && quantity > 0;
        boolean needsAttention = !orderCanBeProcessed || !freeDelivery;

        System.out.println("Вартість товарів: " + subtotal);
        System.out.println("Безкоштовна доставка: " + freeDelivery);
        System.out.println("Сума з доставкою: " + totalWithDelivery);
        System.out.println("Сума без доставки: " + totalWithoutDelivery);
        System.out.println("Коштів достатньо: " + enoughMoney);
        System.out.println("Замовлення можна обробити: " + orderCanBeProcessed);
        System.out.println("Потребує уваги: " + needsAttention);
    }
}