class WaterDispenser {
    private void prepareCup() {
        System.out.println("Стакан підготовлено");
    }

    public void pourWater(int milliliters) {
        prepareCup();
        System.out.println("Налито води: " + milliliters + " мл");
    }
}

public class Task2 {
    public static void main(String[] args) {
        WaterDispenser dispenser = new WaterDispenser();
        dispenser.pourWater(250);
    }
}