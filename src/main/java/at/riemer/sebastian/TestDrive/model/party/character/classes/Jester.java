package at.riemer.sebastian.TestDrive.model.party.character.classes;

import at.riemer.sebastian.TestDrive.model.party.Initiative;
import at.riemer.sebastian.TestDrive.model.party.character.CharacterClass;

public class Jester implements CharacterClass {
    private boolean usingMana;

    private boolean usingArmor;

    private boolean usingHeavyArmor;

    private boolean usingRunes;

    private boolean usingTwoWeaponBattleing;

    private boolean usingHeavyWeapons;

    private boolean usingBows;

    private boolean usingMuskets;

    private boolean usingDrainLife;

    private boolean proneToSilver;

    private boolean masterOfGunPowder;

    private boolean regeneratingOverTime;

    private boolean movingQuickly;

    private boolean expertClimber;

    private boolean harmedBySunlight;

    private Initiative initiative = Initiative.RIGID;

    public Jester() {
        super();
        this.usingArmor = true;
        this.usingTwoWeaponBattleing = true;
        this.usingBows = true;
        this.movingQuickly = true;
        this.expertClimber = true;
    }

    @Override
    public boolean isUsingMana() {
        return usingMana;
    }

    @Override
    public boolean isUsingArmor() {
        return usingArmor;
    }

    @Override
    public boolean isUsingHeavyArmor() {
        return usingHeavyArmor;
    }

    @Override
    public boolean isUsingRunes() {
        return usingRunes;
    }

    @Override
    public boolean isUsingTwoWeaponBattleing() {
        return usingTwoWeaponBattleing;
    }

    @Override
    public boolean isUsingHeavyWeapons() {
        return usingHeavyWeapons;
    }

    @Override
    public boolean isUsingBows() {
        return usingBows;
    }

    @Override
    public boolean isUsingMuskets() {
        return usingMuskets;
    }

    @Override
    public boolean isUsingDrainLife() {
        return usingDrainLife;
    }

    @Override
    public boolean isProneToSilver() {
        return proneToSilver;
    }

    @Override
    public boolean isMasterOfGunPowder() {
        return masterOfGunPowder;
    }

    @Override
    public boolean isRegeneratingOverTime() {
        return regeneratingOverTime;
    }

    @Override
    public boolean isMovingQuickly() {
        return movingQuickly;
    }

    @Override
    public boolean isExpertClimber() {
        return expertClimber;
    }

    @Override
    public boolean isHarmedBySunlight() {
        return harmedBySunlight;
    }

    @Override
    public Initiative getInitiative() {
        return Initiative.WHIRLWIND;
    }
}
