package at.riemer.sebastian.TestDrive.model;

import at.riemer.sebastian.TestDrive.model.map.BattleMap;
import at.riemer.sebastian.TestDrive.model.map.RegionalMap;
import at.riemer.sebastian.TestDrive.model.party.Party;

public class GameState {
    private RegionalMap regionalMap;
    private BattleMap battleMap;
    private Party party;

    public GameState(RegionalMap regionalMap,
                     BattleMap battleMap,
                     Party party
    ) {
        this.regionalMap = regionalMap;
        this.battleMap = battleMap;
        this.party = party;
    }

    public RegionalMap getRegionalMap() {
        return regionalMap;
    }
    public BattleMap getBattleMap() {
        return battleMap;
    }

    public Party getParty() {
        return party;
    }

}
