package at.riemer.sebastian.TestDrive.model.party.character.body;

import at.riemer.sebastian.TestDrive.model.items.abstr.HeadItem;

public class Head {

    private HeadItem equipped;

    public void putOn(HeadItem headItem) {
        this.equipped = headItem;
    }

    public HeadItem getEquipped() {
        return equipped;
    }
}
