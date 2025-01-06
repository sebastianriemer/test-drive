package at.riemer.sebastian.TestDrive.model.battle.monster;

import at.riemer.sebastian.TestDrive.model.party.character.CharacterStats;
import at.riemer.sebastian.TestDrive.model.battle.attack.Attack;
import at.riemer.sebastian.TestDrive.model.battle.attack.MinorMeteoriteAttack;
import at.riemer.sebastian.TestDrive.model.battle.attack.SliceAttack;

import java.util.ArrayList;
import java.util.List;

public class MonsterGoblinShaman extends Monster {

    private String name;
    private String portraitFilename;
    private CharacterStats characterStats;
    private List<Attack> attacks = new ArrayList<>();

    public MonsterGoblinShaman() {
        this.name = "Goblin-Schamane";
        this.portraitFilename = "static/img/monsters/goblin_shaman.png";
        this.characterStats = new CharacterStats(6, 8, 6, 12, 8, 8);
        this.attacks.add(new MinorMeteoriteAttack());
        this.attacks.add(new SliceAttack());
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
        return 17;
    }

    @Override
    public Monster createMonster() {
        return new MonsterGoblinShaman();
    }
}
