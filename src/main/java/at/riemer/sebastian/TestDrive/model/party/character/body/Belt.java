package at.riemer.sebastian.TestDrive.model.party.character.body;

import at.riemer.sebastian.TestDrive.model.items.abstr.BeltItem;

public class Belt {

    private BeltItem equipped;

    public void putOn(BeltItem beltItem) {
        this.equipped = beltItem;
    }

    public BeltItem getEquipped() {
        return equipped;
    }
}
