package at.riemer.sebastian.TestDrive.model.battle.attack;

import at.riemer.sebastian.TestDrive.model.battle.Charges;
import at.riemer.sebastian.TestDrive.model.battle.Range;
import at.riemer.sebastian.TestDrive.model.battle.Target;
import at.riemer.sebastian.TestDrive.model.battle.attack.Attack;

public class StabAttack implements Attack {

    public StabAttack() {
    }


    @Override
    public String getAttackDescription(String enemyName) {
        return " sticht auf " + enemyName;
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
