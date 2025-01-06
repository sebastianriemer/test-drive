package at.riemer.sebastian.TestDrive.model.battle.monster;

import at.riemer.sebastian.TestDrive.model.battle.attack.StabAttack;
import at.riemer.sebastian.TestDrive.model.party.character.CharacterStats;
import at.riemer.sebastian.TestDrive.model.battle.attack.Attack;
import at.riemer.sebastian.TestDrive.model.battle.attack.SliceAttack;

import java.util.ArrayList;
import java.util.List;

public class MonsterGoblin extends Monster {

    private String name;
    private String portraitFilename;
    private CharacterStats characterStats;
    private List<Attack> attacks = new ArrayList<>();


    public MonsterGoblin() {
        this.name = "Goblin";
        this.portraitFilename = "static/img/monsters/goblin.png";
        this.characterStats = new CharacterStats(8, 12, 16, 7, 4, 4);
        this.attacks.add(new SliceAttack());
        this.attacks.add(new StabAttack());
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
        return 8;
    }

    @Override
    public int getCurrentMana() {
        return 0;
    }

    @Override
    public Monster createMonster() {
        return new MonsterGoblin();
    }
}
