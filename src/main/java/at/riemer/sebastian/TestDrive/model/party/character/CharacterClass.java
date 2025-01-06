package at.riemer.sebastian.TestDrive.model.party.character;

import at.riemer.sebastian.TestDrive.model.party.Initiative;

public interface CharacterClass {

    boolean isUsingMana();

    boolean isUsingArmor();

    boolean isUsingHeavyArmor();

    boolean isUsingRunes();

    boolean isUsingTwoWeaponBattleing();

    boolean isUsingHeavyWeapons();

    boolean isUsingBows();

    boolean isUsingMuskets();

    boolean isUsingDrainLife();

    boolean isProneToSilver();

    boolean isMasterOfGunPowder();

    boolean isRegeneratingOverTime();

    boolean isMovingQuickly();

    boolean isExpertClimber();

    boolean isHarmedBySunlight();

    Initiative getInitiative();

}
