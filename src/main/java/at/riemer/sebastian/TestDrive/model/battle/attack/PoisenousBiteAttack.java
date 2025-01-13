package at.riemer.sebastian.TestDrive.model.battle.attack;

import at.riemer.sebastian.TestDrive.model.battle.Charges;
import at.riemer.sebastian.TestDrive.model.battle.Range;
import at.riemer.sebastian.TestDrive.model.battle.Target;
import at.riemer.sebastian.TestDrive.model.battle.attack.Attack;

public class PoisenousBiteAttack implements Attack {

    public PoisenousBiteAttack() {
    }

    @Override
    public String getAttackDescription(String enemyName) {
        return " beisst " + enemyName;
    }

    @Override
    public Target getTarget() {
        return Target.SINGLE;
    }

    @Override
    public Range getRange() {
        return Range.MELEE;
    }

    @Override
    public Charges getCharges() {
        return Charges.UNLIMITED;
    }
}
