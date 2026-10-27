class MuseumExhibit {
    String name;
    int hallNumber;

    MuseumExhibit(String name, int hallNumber) {
        this.name = name;
        this.hallNumber = hallNumber;
    }

    public void showInfo() {
        System.out.println(this.name + ", зала " + this.hallNumber);
    }
}

public class Task1 {
    public static void main(String[] args) {
        MuseumExhibit exhibit = new MuseumExhibit("Модель літака", 3);
        exhibit.showInfo();
    }
}