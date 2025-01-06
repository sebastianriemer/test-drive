package at.riemer.sebastian.TestDrive.model.party.character;

import at.riemer.sebastian.TestDrive.model.party.Level;

public class CharacterStats {

    private int constitution;
    private int strength;
    private int dexterity;
    private int intelligence;
    private int wisdom;
    private int charisma;

    public CharacterStats(int constitution, int strength, int dexterity, int intelligence, int wisdom, int charisma) {
        this.constitution = constitution;
        this.strength = strength;
        this.dexterity = dexterity;
        this.intelligence = intelligence;
        this.wisdom = wisdom;
        this.charisma = charisma;
    }

    public int getConstitution() {
        return constitution;
    }

    public int getStrength() {
        return strength;
    }

    public int getDexterity() {
        return dexterity;
    }

    public int getIntelligence() {
        return intelligence;
    }

    public int getWisdom() {
        return wisdom;
    }

    public int getCharisma() {
        return charisma;
    }

    public int calcuateMaximumHealth(Level level) {
        switch (level) {
            case ONE: return Math.round(constitution / 2);              // 18 -> 9
            case TWO: return (int) Math.round(constitution / 1.5);      // 18 -> 12
            case THREE: return (int) Math.round(constitution / 1.1);    // 18 -> 16
            case FOUR: return (int) Math.round(constitution / 0.7);    // 18 -> 26
            case FIVE: return (int) Math.round(constitution / 0.5);     // 18 -> 36
            case SIX: return (int) Math.round(constitution / 0.4);        // 18 -> 45
            case SEVEN: return (int) Math.round(constitution / 0.3);      // 18 -> 60
            case EIGHT: return (int) Math.round(constitution / 0.2);      // 18 -> 90
            case NINE: return (int) Math.round(constitution / 0.15);       // 18 -> 120
            default: return (int) Math.round(constitution / 0.12);         // 18 -> 150
        }
    }

    public int calculateMaximumMana(Level level, CharacterClass characterClass) {
        switch (level) {
            case ONE: return Math.round(intelligence / 4 * 1);              // 18 -> 4
            case TWO: return (int) Math.round(intelligence / 4 * 2);      // 18 -> 8
            case THREE: return (int) Math.round(intelligence / 4 * 3);    // 18 -> 12
            case FOUR: return (int) Math.round(intelligence / 4 * 4 );    // 18 -> 16
            case FIVE: return (int) Math.round(intelligence / 4 * 5);     // 18 -> 20
            case SIX: return (int) Math.round(intelligence / 4 * 6);        // 18 -> 24
            case SEVEN: return (int) Math.round(intelligence / 4 * 7);      // 18 -> 28
            case EIGHT: return (int) Math.round(intelligence / 4 * 8);      // 18 -> 32
            case NINE: return (int) Math.round(intelligence / 4 * 9);       // 18 -> 36
            default: return (int) Math.round(intelligence / 4* 10);         // 18 -> 40
        }
    }
}
