package at.riemer.sebastian.TestDrive.model.party.character.body;

import at.riemer.sebastian.TestDrive.model.items.abstr.RingFingerItem;

public class RightHandRingFinger {
    private RingFingerItem equipped;

    public void putOn(RingFingerItem handItem) {
        this.equipped = handItem;
    }

    public RingFingerItem getEquipped() {
        return equipped;
    }
}
