package at.riemer.sebastian.TestDrive.model.party.character.body;

import at.riemer.sebastian.TestDrive.model.items.abstr.ArmsItem;

public class Arms {

    private ArmsItem equipped;

    public void putOn(ArmsItem armsItem) {
        this.equipped = armsItem;
    }

    public ArmsItem getEquipped() {
        return equipped;
    }

}
