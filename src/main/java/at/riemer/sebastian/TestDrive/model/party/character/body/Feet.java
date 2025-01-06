package at.riemer.sebastian.TestDrive.model.party.character.body;

import at.riemer.sebastian.TestDrive.model.items.abstr.FeetItem;

public class Feet {
    private FeetItem equipped;

    public void putOn(FeetItem feetItem) {
        this.equipped = feetItem;
    }

    public FeetItem getEquipped() {
        return equipped;
    }
}
