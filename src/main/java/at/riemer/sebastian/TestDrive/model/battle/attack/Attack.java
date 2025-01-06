package at.riemer.sebastian.TestDrive.model.battle.attack;

import at.riemer.sebastian.TestDrive.model.battle.Charges;
import at.riemer.sebastian.TestDrive.model.battle.Range;
import at.riemer.sebastian.TestDrive.model.battle.Target;

public interface Attack {

    String getAttackDescription(String enemyName);

    Target getTarget();

    Range getRange();

    Charges getCharges();


}
