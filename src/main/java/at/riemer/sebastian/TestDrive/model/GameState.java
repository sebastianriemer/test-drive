package at.riemer.sebastian.TestDrive.model;

import at.riemer.sebastian.TestDrive.model.map.RegionalMap;
import at.riemer.sebastian.TestDrive.model.party.Party;

public class GameState {
    private RegionalMap regionalMap;
    private Party party;

    public GameState(RegionalMap regionalMap,
                     Party party
    ) {
        this.regionalMap = regionalMap;
        this.party = party;
    }

    public RegionalMap getRegionalMap() {
        return regionalMap;
    }

    public Party getParty() {
        return party;
    }

}
