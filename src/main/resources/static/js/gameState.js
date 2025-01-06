define(['audio'], function (Audio) {
    let audio = new Audio();
    let regionalMap = {};
    let partyMembers = [];
    let lastMovement;

    let returnedModule = function() {
        this.name = 'GameState';
        this.regionalMap = regionalMap;
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
            return undefined;
        }
        this.getBattleTexture = function(textureKey) {
            if (regionalMap.mapData.battleTextureMap[textureKey] && regionalMap.mapData.battleTextureMap[textureKey].image) {
                return regionalMap.mapData.battleTextureMap[textureKey].image;
            }
            return undefined;
        }
        this.withinRoom = function() {
            if (regionalMap && regionalMap.mapData && regionalMap.mapData.blockMap) {
                let roomBlock = regionalMap.mapData.blockMap[regionalMap.partyPosition.y][regionalMap.partyPosition.x];
                return (this.getRoomTexture(roomBlock.center));
            }
            return undefined;
        }
        this.inBattle = function() {
            if (regionalMap && regionalMap.mapData && regionalMap.mapData.blockMap) {
                let roomBlock = regionalMap.mapData.blockMap[regionalMap.partyPosition.y][regionalMap.partyPosition.x];
                return (this.getBattleTexture(roomBlock.center));
            }
            return undefined;
        }

        this.getBlock = function() {
            return regionalMap.mapData.blockMap[regionalMap.partyPosition.y][regionalMap.partyPosition.x];
        }

        this.onRegionalMap = function() {
            if (regionalMap && regionalMap.mapData && regionalMap.mapData.blockMap) {
                let roomBlock = regionalMap.mapData.blockMap[regionalMap.partyPosition.y][regionalMap.partyPosition.x];
                return (!this.getRoomTexture(roomBlock.center));
            }
            return undefined;
        }
        this.onGlobalMap = function() {
            return regionalMap === undefined;
        }

        this.leaveRoom = function() {
            if (lastMovement === 'FORWARD') {
                invertDirection();
            }
            this.moveForward();
        }

        this.loaded = function() {
            if (regionalMap !== undefined
                && partyMembers !== undefined
                && regionalMap.mapData.wallTextureMap !== undefined
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
                    initParty(data.party);
                });
        }

        this.moveForward = function() {
            if (regionalMap.partyPosition.direction == 'NORTH') {
                if (!regionalMap.mapData.blockMap[regionalMap.partyPosition.y-1][regionalMap.partyPosition.x].southWall.solid) {
                    this.regionalMap.partyPosition.y -= 1;
                    lastMovement = 'FORWARD';
                    if (this.inBattle()) {
                        audio.playBattleStart("battleStart");
                    };
                } else {
                    audio.playAh("ungh");
                }
            } else if (regionalMap.partyPosition.direction == 'EAST') {
                if (!regionalMap.mapData.blockMap[regionalMap.partyPosition.y][regionalMap.partyPosition.x+1].westWall.solid) {
                    regionalMap.partyPosition.x += 1;
                    lastMovement = 'FORWARD';
                } else {
                    audio.playAh("ungh");
                }
            } else if (regionalMap.partyPosition.direction == 'SOUTH') {
                if (!regionalMap.mapData.blockMap[regionalMap.partyPosition.y+1][regionalMap.partyPosition.x].northWall.solid) {
                    regionalMap.partyPosition.y += 1;
                    lastMovement = 'FORWARD';
                } else {
                    audio.playAh("ungh");
                }
            } else if (regionalMap.partyPosition.direction == 'WEST') {
                if (!regionalMap.mapData.blockMap[regionalMap.partyPosition.y][regionalMap.partyPosition.x-1].eastWall.solid) {
                    regionalMap.partyPosition.x -= 1;
                    lastMovement = 'FORWARD';
                } else {
                    audio.playAh("ungh");
                }
            }
        }

        this.moveBackward = function() {
            if (regionalMap.partyPosition.direction == 'NORTH') {
                if (!regionalMap.mapData.blockMap[regionalMap.partyPosition.y+1][regionalMap.partyPosition.x].northWall.solid) {
                    regionalMap.partyPosition.y += 1;
                    lastMovement = 'BACKWARD';
                } else {
                    audio.playAh("ungh");
                }
            }
            else if (regionalMap.partyPosition.direction == 'EAST') {
                if (!regionalMap.mapData.blockMap[regionalMap.partyPosition.y][regionalMap.partyPosition.x-1].eastWall.solid) {
                    regionalMap.partyPosition.x -= 1;
                    lastMovement = 'BACKWARD';
                } else {
                    audio.playAh("ungh");
                }
            } else if (regionalMap.partyPosition.direction == 'SOUTH') {
                if (!regionalMap.mapData.blockMap[regionalMap.partyPosition.y-1][regionalMap.partyPosition.x].southWall.solid) {
                    regionalMap.partyPosition.y -= 1;
                    lastMovement = 'BACKWARD';
                } else {
                    audio.playAh("ungh");
                }
            } else if (regionalMap.partyPosition.direction == 'WEST') {
                if (!regionalMap.mapData.blockMap[regionalMap.partyPosition.y][regionalMap.partyPosition.x+1].westWall.solid) {
                    regionalMap.partyPosition.x += 1;
                    lastMovement = 'BACKWARD';
                 } else {
                    audio.playAh("ungh");
                }
            }
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
    }

    function invertDirection(direction) {
        if (regionalMap.partyPosition.direction == 'NORTH') {
            regionalMap.partyPosition.direction = 'SOUTH';
        } else if (regionalMap.partyPosition.direction == 'EAST') {
            regionalMap.partyPosition.direction = 'WEST';
        } else if (regionalMap.partyPosition.direction == 'SOUTH') {
            regionalMap.partyPosition.direction = 'NORTH';
        } else if (regionalMap.partyPosition.direction == 'WEST') {
            regionalMap.partyPosition.direction = 'EAST';
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
        initBattleTextureMap(regionalMap);
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
          console.log(mapKeys[i] + ' = ' + texture.fileName);
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
          console.log(mapKeys[i] + ' = ' + texture.fileName);
          let textureImage = new Image();
          textureImage.src = texture.fileName;
          textureImage.onload = function() {
                texture.image = textureImage;
                regionalMap.mapData.roomTextureMap[mapKeys[i]] = texture;
          }
        }
    }
    function initBattleTextureMap(regionalMap) {
        let mapKeys = Object.keys(regionalMap.mapData.battleTextureMap);
        for (let i = 0; i < mapKeys.length; i++) {
            let texture = regionalMap.mapData.battleTextureMap[mapKeys[i]];
          console.log(mapKeys[i] + ' = ' + texture.fileName);
          let textureImage = new Image();
          textureImage.src = texture.fileName;
          textureImage.onload = function() {
                texture.image = textureImage;
                regionalMap.mapData.battleTextureMap[mapKeys[i]] = texture;
          }
        }
    }

    return returnedModule;
}
);