class Parcel {
    static int totalParcels = 0;
    String code;
    double weight;

    Parcel(String code, double weight) {
        this.code = code;
        this.weight = weight;
        totalParcels++;
    }

    public void showInfo() {
        System.out.println("Посилка " + this.code + ", вага: " + this.weight + " кг");
    }

    public static void showTotal() {
        System.out.println("Усього посилок: " + totalParcels);
    }
}

public class Task3 {
    public static void main(String[] args) {
        Parcel parcel1 = new Parcel("PX101", 2.5);
        Parcel parcel2 = new Parcel("PX102", 4.0);

        parcel1.showInfo();
        parcel2.showInfo();

        Parcel.showTotal();
    }
}