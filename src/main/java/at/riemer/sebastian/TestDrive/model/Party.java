package at.riemer.sebastian.TestDrive.model;

import java.util.ArrayList;
import java.util.List;

public class Party {
    private List<PartyMember> partyMembers = new ArrayList<>();
    private PartyPosition partyPosition;

    public Party() {
        this.partyPosition = new PartyPosition(0, 0, Direction.EAST);
    }

    public PartyPosition getPartyPosition() {
        return partyPosition;
    }

    public List<PartyMember> getPartyMembers() {
        return partyMembers;
    }

    public void addPartyMember(PartyMember partyMember) {
        this.partyMembers.add(partyMember);
    }

    public void setPartyPosition(PartyPosition partyPosition) {
        this.partyPosition = partyPosition;
    }
}
