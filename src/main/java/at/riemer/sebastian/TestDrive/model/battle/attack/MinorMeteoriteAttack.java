package at.riemer.sebastian.TestDrive.model.battle.attack;

import at.riemer.sebastian.TestDrive.model.battle.Charges;
import at.riemer.sebastian.TestDrive.model.battle.Range;
import at.riemer.sebastian.TestDrive.model.battle.Target;
import at.riemer.sebastian.TestDrive.model.battle.attack.Attack;

public class MinorMeteoriteAttack implements Attack {

    public MinorMeteoriteAttack() {
    }

    @Override
    public String getAttackDescription(String enemyNames) {
        return " feuert Mikro-Meteoriten auf " + enemyNames;
    }

    @Override
    public Target getTarget() {
        return Target.ROW;
    }

    @Override
    public Range getRange() {
        return Range.RANGE;
    }

    @Override
    public Charges getCharges() {
        return Charges.THREE;
    }
}
