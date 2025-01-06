package at.riemer.sebastian.TestDrive.model.battle;

import at.riemer.sebastian.TestDrive.model.battle.monster.Monster;

import java.util.ArrayList;
import java.util.List;

public class MonsterGroup {
    List<Monster> monsterList = new ArrayList<>();

    public MonsterGroup(Monster monster, int count) {
        int i = 1;
        while (i < count) {
            monsterList.add(monster.createMonster());
            i++;
        }

    }
}
