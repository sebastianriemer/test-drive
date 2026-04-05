define(['textureManager', 'mapManager', 'navigation',
'partyManager', 'gameModeManager', 'roamingMode', 'combatMode'], function (textureManager,
mapManager, navigation, partyManager, gameModeManager,
RoamingMode, CombatMode) {
    const roamingMode = new RoamingMode();
    const combatMode = new CombatMode();
    const NOT_IN_BATTLE_COLOR = 'ffffff';

    let gameState = function() {
        this.name = 'GameState';
        gameModeManager.setMode(roamingMode);
        this.load = function() {
              return fetch('/ajax/gameState/sebus')
                  .then(response => response.json())
                  .then(data => {
                      mapManager.initRegionalMap(data.world.regionalMap, data.party.partyPosition);
                      mapManager.initBattleMap(data.world.battleMap);
                      partyManager.init(data.party);
                      textureManager.init(mapManager.regionalMap, mapManager.battleMap);
                  });
          }


        this.getTextForBelowMainWindow = function() {
            return gameModeManager.getMode().getTextForBelowMainWindow();
        }
        this.inRoom = function() {
            if (mapManager.regionalMap &&
                    mapManager.regionalMap.mapData &&
                    mapManager.regionalMap.mapData.blockMap) {
                let block = mapManager.regionalMap.mapData.blockMap[mapManager.regionalMap.partyPosition.y][mapManager.regionalMap.partyPosition.x];
                return block.hasWalls;
            }
            return undefined;
        }
        this.inBattle = function() {
            if (mapManager.battleMap &&
                mapManager.battleMap.mapData &&
                mapManager.battleMap.mapData.blockMap) {
                let block = mapManager.battleMap.mapData.blockMap[mapManager.regionalMap.partyPosition.y][mapManager.regionalMap.partyPosition.x];
                // TODO currently there is no center anymore
                return NOT_IN_BATTLE_COLOR != block.center;
            }
            return undefined;
        }
        this.getFirstPartyMember = function() {
            return partyManager.getFirstPartyMember();
        }

        this.onRegionalMap = function() {
            if (mapManager.regionalMap &&
                mapManager.regionalMap.mapData &&
                mapManager.regionalMap.mapData.blockMap) {
                let block = mapManager.regionalMap.mapData.blockMap[mapManager.regionalMap.partyPosition.y][mapManager.regionalMap.partyPosition.x];
                return block.hasNoWalls;
            }
            return undefined;
        }
        this.onGlobalMap = function() {
            return mapManager.regionalMap === undefined;
        }

        this.leaveRoom = function() {
            if (navigation.lastMovement === 'FORWARD') {
                this.invertDirection();
            }
            navigation.moveForward();
        }

        this.loaded = function() {
            if (mapManager.regionalMap !== undefined
                && mapManager.battleMap !== undefined
                && partyManager.partyMembers !== undefined
                && mapManager.regionalMap.mapData.wallTextureMap !== undefined
                && mapManager.battleMap.mapData.battleTextureMap !== undefined
                ) {
                    return true;
            }
            return false;
        }

    // TODO: consider when to call this
        this.doGameModeTransitionIfNecessary = function() {
            if (this.inBattle()) {
              eventBus.emit("battleStart");
            };
        }
    }

    if (!gameState.instance) {
        gameState.instance = new gameState();
    }
    return gameState.instance;
}
);