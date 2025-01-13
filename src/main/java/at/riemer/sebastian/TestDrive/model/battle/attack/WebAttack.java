package at.riemer.sebastian.TestDrive.model.battle.attack;

import at.riemer.sebastian.TestDrive.model.battle.Charges;
import at.riemer.sebastian.TestDrive.model.battle.Range;
import at.riemer.sebastian.TestDrive.model.battle.Target;

public class WebAttack implements Attack {

    public WebAttack() {
    }

    @Override
    public String getAttackDescription(String enemyName) {
        return " wickelt " + enemyName + " in ein Netz ein.";
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
