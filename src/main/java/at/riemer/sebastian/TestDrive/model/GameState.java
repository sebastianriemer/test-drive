package at.riemer.sebastian.TestDrive.model;

import at.riemer.sebastian.TestDrive.model.map.WorldMap;

import java.util.Map;

public class GameState {
    private WorldMap worldMap;
    private Party party;
    private Map<String, String> textureMap;

    public GameState(WorldMap worldMap, Party party, Map<String, String> textureMap) {
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

    public Map<String, String> getTextureMap() {
        return textureMap;
    }
}
