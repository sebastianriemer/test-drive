package at.riemer.sebastian.TestDrive.model;

import at.riemer.sebastian.TestDrive.model.map.WorldMap;

import java.util.Map;

public class GameState {
    private WorldMap worldMap;
    private Party party;
    private Map<Integer, String> textureMap;

    public GameState(WorldMap worldMap, Party party, Map<Integer, String> textureMap) {
        this.worldMap = worldMap;
        this.party = party;
        this.textureMap = textureMap;
    }

    public WorldMap getWorldMap() {
        return worldMap;
    }

    public Party getParty() {
        return party;
    }

    public Map<Integer, String> getTextureMap() {
        return textureMap;
    }
}
