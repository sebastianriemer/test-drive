package at.riemer.sebastian.TestDrive.model.party.character.body;

import at.riemer.sebastian.TestDrive.model.items.abstr.HandItem;

public class RightHand {
    private HandItem equipped;

    public void hold(HandItem handItem) {
        this.equipped = handItem;
    }

    public HandItem getEquipped() {
        return equipped;
    }
}
