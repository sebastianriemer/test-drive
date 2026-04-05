package at.riemer.sebastian.TestDrive.model;

import at.riemer.sebastian.TestDrive.model.map.BattleMap;
import at.riemer.sebastian.TestDrive.model.map.RegionalMap;
import at.riemer.sebastian.TestDrive.model.party.Party;

public class GameState {
    private World world;
    private Party party;

    public GameState(World world,
                     Party party
    ) {
        this.world = world;
        this.party = party;
    }

    public World getWorld() {
        return world;
    }

    public Party getParty() {
        return party;
    }

}
