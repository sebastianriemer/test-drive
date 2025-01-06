package at.riemer.sebastian.TestDrive.model.battle.monster;

import at.riemer.sebastian.TestDrive.model.battle.attack.Attack;
import at.riemer.sebastian.TestDrive.model.battle.attack.BiteAttack;
import at.riemer.sebastian.TestDrive.model.party.character.CharacterStats;

import java.util.ArrayList;
import java.util.List;

public class MonsterSpider extends Monster {

    private String name;
    private String portraitFilename;
    private CharacterStats characterStats;
    private List<Attack> attacks = new ArrayList<>();

    public MonsterSpider() {
        this.name = "Riesenspinne";
        this.portraitFilename = "static/img/monsters/spider.png";
        this.characterStats = new CharacterStats(10, 13, 13, 4, 1, 0);
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
        return 13;
    }

    @Override
    public int getCurrentMana() {
        return 0;
    }

    @Override
    public Monster createMonster() {
        return new MonsterSpider();
    }
}
