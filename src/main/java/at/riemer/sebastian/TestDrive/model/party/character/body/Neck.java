package at.riemer.sebastian.TestDrive.model.party.character.body;

import at.riemer.sebastian.TestDrive.model.items.abstr.NeckItem;

public class Neck {
    private NeckItem equipped;

    public void putOn(NeckItem neckItem) {
        this.equipped = neckItem;
    }

    public NeckItem getEquipped() {
        return equipped;
    }
}
