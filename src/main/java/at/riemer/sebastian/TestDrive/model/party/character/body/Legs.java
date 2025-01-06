package at.riemer.sebastian.TestDrive.model.party.character.body;

import at.riemer.sebastian.TestDrive.model.items.abstr.LegsItem;

public class Legs {
    private LegsItem equipped;

    public void putOn(LegsItem legsItem) {
        this.equipped = legsItem;
    }

    public LegsItem getEquipped() {
        return equipped;
    }
}
