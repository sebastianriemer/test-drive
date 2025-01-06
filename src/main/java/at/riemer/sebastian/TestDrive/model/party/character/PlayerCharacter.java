package at.riemer.sebastian.TestDrive.model.party.character;

import at.riemer.sebastian.TestDrive.model.battle.attack.Attack;
import at.riemer.sebastian.TestDrive.model.items.abstr.HandItem;
import at.riemer.sebastian.TestDrive.model.items.abstr.HeadItem;
import at.riemer.sebastian.TestDrive.model.party.Level;

import java.util.ArrayList;
import java.util.List;

public class PlayerCharacter {
    private final String name;
    private final String portraitFilename;
    private final CharacterClass characterClass;
    private CharacterStats characterStats;

    private int xpPoints;
    private int currentHealth;
    private int currentMana;

    private String biography = "";
    private List<Attack> attackList = new ArrayList<>();
    private Equipment equipment = new Equipment();
    private Affections affections = new Affections();

    public PlayerCharacter(String name,
                           String portraitFilename,
                           CharacterClass characterClass) {
        this.name = name;
        this.portraitFilename = portraitFilename;
        this.characterClass = characterClass;
    }

    public PlayerCharacter withBiography(String biography) {
        this.biography = biography;
        return this;
    }

    public PlayerCharacter withCharacterStats(CharacterStats characterStats){
        this.characterStats = characterStats;
        return this;
    }

    public PlayerCharacter withXpPoints(int xpPoints){
        this.xpPoints = xpPoints;
        return this;
    }

    public PlayerCharacter withCurrentHealth(int currentHealth) {
        this.currentHealth = currentHealth;
        return this;
    }

    public PlayerCharacter withCurrentMana(int currentMana) {
        this.currentMana = currentMana;
        return this;
    }

    public PlayerCharacter putInLeftHand(HandItem handItem) {
        this.equipment.getLeftHand().hold(handItem);
        return this;
    }

    public PlayerCharacter putInRightHand(HandItem handItem) {
        this.equipment.getRightHand().hold(handItem);
        return this;
    }

    public PlayerCharacter putOnHead(HeadItem headItem) {
        this.equipment.getHead().putOn(headItem);
        return this;
    }

    public String getName() {
        return name;
    }

    public String getPortraitFilename() {
        return portraitFilename;
    }

    public CharacterClass getCharacterClass() {
        return characterClass;
    }

    public CharacterStats getCharacterStats() {
        return characterStats;
    }

    public int getXpPoints() {
        return xpPoints;
    }

    public int getCurrentHealth() {
        return currentHealth;
    }

    public int getCurrentMana() {
        return currentMana;
    }

    public String getBiography() {
        return biography;
    }

    public List<Attack> getAttackList() {
        return attackList;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public Affections getAffections() {
        return affections;
    }

    public Level getLevel() {
        return Level.getLevelAtXpPoints(xpPoints);
    }

    public int getMaximumHealth() {
        return this.characterStats.calcuateMaximumHealth(this.getLevel());
    }

    public int getMaximumMana() {
        return this.characterStats.calculateMaximumMana(this.getLevel(), this.getCharacterClass());
    }


}
