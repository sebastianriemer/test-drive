define(['audioManager'], function (audioManager) {

    const NOT_IN_BATTLE_COLOR = 'ffffff';
    //const NOT_IN_ROOM_COLOR = 'ffffff';

    //let audio = new Audio();
    let regionalMap = {};
    let battleMap = {};
    let partyMembers = [];
    let lastMovement;

    let gameState = function() {
        this.name = 'GameState';
        this.regionalMap = regionalMap;
        this.battleMap = battleMap;
        this.partyMembers = partyMembers;

        this.getWallTexture = function(textureKey) {
            if (textureKey === 'ffffff' || textureKey === 'bcbcbc') {
                return undefined;
            }
            if (regionalMap.mapData.wallTextureMap[textureKey] && regionalMap.mapData.wallTextureMap[textureKey].image) {
                return regionalMap.mapData.wallTextureMap[textureKey].image;
            }
            return regionalMap.mapData.wallTextureMap['000000'].image;
        }
        this.getRoomTexture = function(textureKey) {
            if (regionalMap.mapData.roomTextureMap[textureKey] && regionalMap.mapData.roomTextureMap[textureKey].image) {
                return regionalMap.mapData.roomTextureMap[textureKey].image;
            }
            console.error(`Texture ${textureKey} not found in regionalMap.mapData.roomTextureMap!`);
            return undefined;
        }
        this.getBattleTexture = function(textureKey) {
            if (battleMap.mapData.battleTextureMap[textureKey] && battleMap.mapData.battleTextureMap[textureKey].image) {
                return battleMap.mapData.battleTextureMap[textureKey].image;
            }
            console.error(`Texture ${textureKey} not found in battleMap.mapData.battleTextureMap!`);
            return undefined;
        }

        this.inRoom = function() {
            if (regionalMap && regionalMap.mapData && regionalMap.mapData.blockMap) {
                let block = regionalMap.mapData.blockMap[regionalMap.partyPosition.y][regionalMap.partyPosition.x];
                return block.hasWalls;
                //return (this.getRoomTexture(block.center));
                //console.log(`inRoom-block.center=${block.center}`)
                //return NOT_IN_ROOM_COLOR != block.center;
            }
            return undefined;
        }
        this.inBattle = function() {
            if (battleMap && battleMap.mapData && battleMap.mapData.blockMap) {
                let block = battleMap.mapData.blockMap[regionalMap.partyPosition.y][regionalMap.partyPosition.x];
                //console.log(`inBattle-block.center=${block.center}`)
                return NOT_IN_BATTLE_COLOR != block.center;
            }
            return undefined;
        }

        this.getBlockFromRegionalMap = function() {
            return regionalMap.mapData.blockMap[regionalMap.partyPosition.y][regionalMap.partyPosition.x];
        }

        this.getBlockFromBattleMap = function() {
            return battleMap.mapData.blockMap[regionalMap.partyPosition.y][regionalMap.partyPosition.x];
        }

        this.onRegionalMap = function() {
            if (regionalMap && regionalMap.mapData && regionalMap.mapData.blockMap) {
                let block = regionalMap.mapData.blockMap[regionalMap.partyPosition.y][regionalMap.partyPosition.x];
                return block.hasNoWalls;
            }
            return undefined;
        }
        this.onGlobalMap = function() {
            return regionalMap === undefined;
        }

        this.leaveRoom = function() {
            if (lastMovement === 'FORWARD') {
                this.invertDirection();
            }
            this.moveForward();
        }

        this.loaded = function() {
            if (regionalMap !== undefined
                && battleMap !== undefined
                && partyMembers !== undefined
                && regionalMap.mapData.wallTextureMap !== undefined
                && battleMap.mapData.battleTextureMap !== undefined
                ) {
                    return true;
            }
            return false;
        }

        this.load = function() {
            fetch('/ajax/gameState/sebus')
                .then(response => response.json())
                .then(data => {
                    initRegionalMap(data.regionalMap, data.party.partyPosition);
                    initBattleMap(data.battleMap);
                    initParty(data.party);
                });
        }

        this.getInvertedDirection = function(direction) {
            switch (direction) {
              case 'NORTH':
                return 'SOUTH';
              case 'EAST':
                return 'WEST';
              case 'SOUTH':
                return 'NORTH';
              case 'WEST':
                return 'EAST';
              default:
                console.error(`Invalid direction! direction:'${direction}'`);
            }
        }

        this.getUpcomingWallForDirection = function(direction, movement) {
            if (movement != 'FORWARD') {
                direction = this.getInvertedDirection(direction);
            }
            switch (direction) {
              case 'NORTH':
                return regionalMap.mapData.blockMap[regionalMap.partyPosition.y-1][regionalMap.partyPosition.x].southWall;
              case 'EAST':
                return regionalMap.mapData.blockMap[regionalMap.partyPosition.y][regionalMap.partyPosition.x+1].westWall;
              case 'SOUTH':
                return regionalMap.mapData.blockMap[regionalMap.partyPosition.y+1][regionalMap.partyPosition.x].northWall;
              case 'WEST':
                return regionalMap.mapData.blockMap[regionalMap.partyPosition.y][regionalMap.partyPosition.x-1].eastWall;
              default:
                console.error(`Invalid direction! direction:'${direction}'`);
            }
        }

        this.setNewPartyPositionAccordingToDirection = function(direction, movement) {
            if (movement != 'FORWARD') {
                direction = this.getInvertedDirection(direction);
            }
            switch (direction) {
              case 'NORTH':
                return this.regionalMap.partyPosition.y -= 1;
              case 'EAST':
                return this.regionalMap.partyPosition.x += 1;
              case 'SOUTH':
                return this.regionalMap.partyPosition.y += 1;
              case 'WEST':
                return this.regionalMap.partyPosition.x -= 1;
              default:
                console.error(`Invalid direction! direction:'${direction}'`);
            }
        }

        this.moveForward = function() {
            let plannedMovement = 'FORWARD';
            let wall = this.getUpcomingWallForDirection(regionalMap.partyPosition.direction, plannedMovement);
            if (wall.solid) {
                playOuchSound(partyMembers, audioManager);
            } else {
                this.setNewPartyPositionAccordingToDirection(regionalMap.partyPosition.direction, plannedMovement);
                lastMovement = plannedMovement;
                this.doGameModeTransitionIfNecessary();
            }
        }

        this.moveBackward = function() {
            let plannedMovement = 'BACKWARD';
            let wall = this.getUpcomingWallForDirection(regionalMap.partyPosition.direction, plannedMovement);
            if (wall.solid) {
              playOuchSound(partyMembers, audioManager);
            } else {
              this.setNewPartyPositionAccordingToDirection(regionalMap.partyPosition.direction, plannedMovement);
              lastMovement = plannedMovement;
              this.doGameModeTransitionIfNecessary();
            }
        }

        this.doGameModeTransitionIfNecessary = function() {
            if (this.inBattle()) {
              // TODO: switch gameMode from world exploration to battle
              audioManager.playBattleStart("battleStart");
            };
        }

        this.turnRight = function() {
            if (regionalMap.partyPosition.direction == 'NORTH') {
                regionalMap.partyPosition.direction = 'EAST';
            } else if (regionalMap.partyPosition.direction == 'EAST') {
                regionalMap.partyPosition.direction = 'SOUTH';
            } else if (regionalMap.partyPosition.direction == 'SOUTH') {
                regionalMap.partyPosition.direction = 'WEST';
            } else if (regionalMap.partyPosition.direction == 'WEST') {
                regionalMap.partyPosition.direction = 'NORTH';
            }
        }

        this.turnLeft = function() {
            if (regionalMap.partyPosition.direction == 'NORTH') {
                regionalMap.partyPosition.direction = 'WEST';
            } else if (regionalMap.partyPosition.direction == 'EAST') {
                regionalMap.partyPosition.direction = 'NORTH';
            } else if (regionalMap.partyPosition.direction == 'SOUTH') {
                regionalMap.partyPosition.direction = 'EAST';
            } else if (regionalMap.partyPosition.direction == 'WEST') {
                regionalMap.partyPosition.direction = 'SOUTH';
            }
        }
        this.invertDirection = function() {
            this.regionalMap.partyPosition.direction = this.getInvertedDirection(this.regionalMap.partyPosition.direction);
        }
    }

    function playOuchSound(party, audioManager) {
        if (party.length === 0) {
            console.warn("Party is empty. Cannot determine first member.");
            return;
        }

        const firstMember = party[0]; // Get the first member
        const sex = firstMember.sex.toUpperCase(); // Normalize case to uppercase

        if (sex === "MALE") {
            audioManager.play('party.ouch_male_1');
        } else if (sex === "FEMALE") {
            audioManager.play('party.ouch_female_1');
        } else {
            console.warn(`Unknown sex "${sex}" for party member "${firstMember.name}".`);
        }
    }

    function initRegionalMap(regMap, partyPosition) {
        regionalMap.mapData = regMap;
        regionalMap.partyPosition = partyPosition;
        let mapImage = new Image();
        mapImage.src = regionalMap.mapData.mapFilename;
        mapImage.onload = function() {
            regionalMap.mapImage = mapImage
        }
        initWallTextureMap(regionalMap);
        initRoomTextureMap(regionalMap);
    }

    function initBattleMap(batMap) {
        battleMap.mapData = batMap;
        let mapImage = new Image();
        mapImage.src = battleMap.mapData.mapFilename;
        mapImage.onload = function() {
            battleMap.mapImage = mapImage
        }
        initBattleTextureMap(battleMap);
    }

    function initParty(party) {
        for (let i = 0; i < party.partyMembers.length; i++) {
            let partyMember = party.partyMembers[i];
            let portraitImage = new Image();
            portraitImage.src = partyMember.portraitFilename;
            portraitImage.onload = function() {
                partyMember.portraitImage = portraitImage;
                partyMembers[i] = partyMember;
            }
        }
    }

    function initWallTextureMap(regionalMap) {
        let mapKeys = Object.keys(regionalMap.mapData.wallTextureMap);
        for (let i = 0; i < mapKeys.length; i++) {
            let texture = regionalMap.mapData.wallTextureMap[mapKeys[i]];
          //console.log(mapKeys[i] + ' = ' + texture.fileName);
          let textureImage = new Image();
          textureImage.src = texture.fileName;
          textureImage.onload = function() {
                texture.image = textureImage;
                regionalMap.mapData.wallTextureMap[mapKeys[i]] = texture;
          }
        }
    }

    function initRoomTextureMap(regionalMap) {
        let mapKeys = Object.keys(regionalMap.mapData.roomTextureMap);
        for (let i = 0; i < mapKeys.length; i++) {
            let texture = regionalMap.mapData.roomTextureMap[mapKeys[i]];
          //console.log(mapKeys[i] + ' = ' + texture.fileName);
          let textureImage = new Image();
          textureImage.src = texture.fileName;
          textureImage.onload = function() {
                texture.image = textureImage;
                regionalMap.mapData.roomTextureMap[mapKeys[i]] = texture;
          }
        }
    }
    function initBattleTextureMap(battleMap) {
        let mapKeys = Object.keys(battleMap.mapData.battleTextureMap);
        for (let i = 0; i < mapKeys.length; i++) {
            let texture = battleMap.mapData.battleTextureMap[mapKeys[i]];
          //console.log(mapKeys[i] + ' = ' + texture.fileName);
          let textureImage = new Image();
          textureImage.src = texture.fileName;
          textureImage.onload = function() {
                texture.image = textureImage;
                battleMap.mapData.battleTextureMap[mapKeys[i]] = texture;
          }
        }
    }

    if (!gameState.instance) {
        gameState.instance = new gameState();
    }
    return gameState.instance;
}
);