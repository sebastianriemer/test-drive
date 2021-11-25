package at.riemer.sebastian.TestDrive.model;

public class PartyMember {
    private String name;
    private int health;
    private int mana;
    private String portraitFileName;

    public PartyMember(String name, int health, int mana, String portraitFileName) {
        this.name = name;
        this.health = health;
        this.mana = mana;
        this.portraitFileName = portraitFileName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getHealth() {
        return health;
    }

    public void setHealth(int health) {
        this.health = health;
    }

    public int getMana() {
        return mana;
    }

    public void setMana(int mana) {
        this.mana = mana;
    }

    public String getPortraitFileName() {
        return portraitFileName;
    }

    public void setPortraitFileName(String portraitFileName) {
        this.portraitFileName = portraitFileName;
    }
}
