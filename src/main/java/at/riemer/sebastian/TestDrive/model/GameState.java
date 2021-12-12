package at.riemer.sebastian.TestDrive.model;

import at.riemer.sebastian.TestDrive.model.map.RegionalMap;

import java.util.Map;

public class GameState {
    private RegionalMap regionalMap;
    private Party party;
    private Map<String, String> wallMap;
    private Map<String, String> roomMap;

    public GameState(RegionalMap regionalMap,
                     Party party,
                     Map<String, String> wallMap,
                     Map<String, String> roomMap
    ) {
        this.regionalMap = regionalMap;
        this.party = party;
        this.wallMap = wallMap;
        this.roomMap = roomMap;
    }

    public RegionalMap getRegionalMap() {
        return regionalMap;
    }

    public Party getParty() {
        return party;
    }

    public Map<String, String> getWallMap() {
        return wallMap;
    }

    public Map<String, String> getRoomMap() {
        return roomMap;
    }
}
