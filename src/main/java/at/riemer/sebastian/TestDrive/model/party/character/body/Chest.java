package at.riemer.sebastian.TestDrive.model.party.character.body;

import at.riemer.sebastian.TestDrive.model.items.abstr.ChestItem;

public class Chest {
    private ChestItem equipped;

    public void putOn(ChestItem chestItem) {
        this.equipped = chestItem;
    }

    public ChestItem getEquipped() {
        return equipped;
    }
}
