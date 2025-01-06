package at.riemer.sebastian.TestDrive.model.battle.monster;

import at.riemer.sebastian.TestDrive.model.party.character.CharacterStats;
import at.riemer.sebastian.TestDrive.model.battle.attack.Attack;
import at.riemer.sebastian.TestDrive.model.battle.attack.BiteAttack;

import java.util.ArrayList;
import java.util.List;

public class MonsterRat extends Monster {

    private String name;
    private String portraitFilename;
    private CharacterStats characterStats;
    private List<Attack> attacks = new ArrayList<>();

    public MonsterRat() {
        this.name = "Ratte";
        this.portraitFilename = "static/img/monsters/rat.png";
        this.characterStats = new CharacterStats(4, 7, 6, 3, 1, 0);
        this.attacks.add(new BiteAttack());
    }

    public String getName() {
        return name;
    }

    public String getPortraitFilename() {
        return portraitFilename;
    }

    public CharacterStats getCharacterStats() {
        return characterStats;
    }

    @Override
    public int getCurrentHealth() {
        return 5;
    }

    @Override
    public int getCurrentMana() {
        return 0;
    }

    @Override
    public Monster createMonster() {
        return new MonsterRat();
    }
}
