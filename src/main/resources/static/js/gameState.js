define(['audio'], function (Audio) {
    let audio = new Audio();
    let map = {};
    let partyMembers = [];
    let wallMap = {textureCount : 0};
    let roomMap = {textureCount : 0};

    let returnedModule = function() {
        this.name = 'GameState';
        this.map = map;
        this.partyMembers = partyMembers;
        this.wallMap = wallMap;
        this.roomMap = roomMap;

        this.getWallTexture = function(texture) {
            if (texture === 'ffffff' || texture === 'bcbcbc') {
                return undefined;
            }
            if (wallMap[texture]) {
                return wallMap[texture];
            }
            return wallMap['000000'];
        }
        this.getRoomTexture = function(texture) {
            if (roomMap[texture]) {
                return roomMap[texture];
            }
            return undefined;
        }

        this.withinRoom = function() {
            if (map && map.regionalMap && map.regionalMap.blockMap) {
                let roomBlock = map.regionalMap.blockMap[map.partyPosition.y][map.partyPosition.x];
                return (this.getRoomTexture(roomBlock.center));
            }
            return undefined;
        }

        this.getBlock = function() {
            return map.regionalMap.blockMap[map.partyPosition.y][map.partyPosition.x];
        }

        this.onRegionalMap = function() {
            if (map && map.regionalMap && map.regionalMap.blockMap) {
                let roomBlock = map.regionalMap.blockMap[map.partyPosition.y][map.partyPosition.x];
                return (!this.getRoomTexture(roomBlock.center));
            }
            return undefined;
        }
        this.onGlobalMap = function() {
            return map.regionalMap === undefined;
        }

        this.leaveRoom = function() {
            invertDirection(map.partyPosition.direction);
            this.moveForward();
        }

        this.loaded = function() {
            if (map !== undefined
                && map.regionalMap !== undefined
                && partyMembers !== undefined
                && wallMap !== undefined
                && wallMap.textureCount > 0
                ) {
                    return true;
            }
            return false;
        }

        this.loadGameState = function() {
            fetch('/ajax/gameState/sebus')
                .then(response => response.json())
                .then(data => {
                    initRegionalMap(data.regionalMap, data.party.partyPosition);
                    initParty(data.party);
                    initWallMap(data.wallMap);
                    initRoomMap(data.roomMap);

                });
        }

        this.moveForward = function() {
            if (this.map.partyPosition.direction == 'NORTH') {
                if (!map.regionalMap.blockMap[this.map.partyPosition.y-1][this.map.partyPosition.x].southWall.solid) {
                    this.map.partyPosition.y -= 1;
                } else {
                    audio.playSound("ungh");
                }
            } else if (this.map.partyPosition.direction == 'EAST') {
            if (!map.regionalMap.blockMap[this.map.partyPosition.y][this.map.partyPosition.x+1].westWall.solid) {
                    this.map.partyPosition.x += 1;
                } else {
                    audio.playSound("ungh");
                }
            } else if (this.map.partyPosition.direction == 'SOUTH') {
                if (!map.regionalMap.blockMap[this.map.partyPosition.y+1][this.map.partyPosition.x].northWall.solid) {
                    this.map.partyPosition.y += 1;
                } else {
                    audio.playSound("ungh");
                }
            } else if (this.map.partyPosition.direction == 'WEST') {
                if (!map.regionalMap.blockMap[this.map.partyPosition.y][this.map.partyPosition.x-1].eastWall.solid) {
                    this.map.partyPosition.x -= 1;
                } else {
                    audio.playSound("ungh");
                }
            }
        }

        this.moveBackward = function() {
            if (this.map.partyPosition.direction == 'NORTH') {
                if (!map.regionalMap.blockMap[this.map.partyPosition.y+1][this.map.partyPosition.x].northWall.solid) {
                    this.map.partyPosition.y += 1;
                } else {
                    audio.playSound("ungh");
                }
            }
            else if (this.map.partyPosition.direction == 'EAST') {
                if (!map.regionalMap.blockMap[this.map.partyPosition.y][this.map.partyPosition.x-1].eastWall.solid) {
                    this.map.partyPosition.x -= 1;
                } else {
                    audio.playSound("ungh");
                }
            } else if (this.map.partyPosition.direction == 'SOUTH') {
                if (!map.regionalMap.blockMap[this.map.partyPosition.y-1][this.map.partyPosition.x].southWall.solid) {
                    this.map.partyPosition.y -= 1;
                } else {
                    audio.playSound("ungh");
                }
            } else if (this.map.partyPosition.direction == 'WEST') {
                if (!map.regionalMap.blockMap[this.map.partyPosition.y][this.map.partyPosition.x+1].westWall.solid) {
                    this.map.partyPosition.x += 1;
                 } else {
                    audio.playSound("ungh");
                }
            }
        }

        this.turnRight = function() {
            if (this.map.partyPosition.direction == 'NORTH') {
                this.map.partyPosition.direction = 'EAST';
            } else if (this.map.partyPosition.direction == 'EAST') {
                this.map.partyPosition.direction = 'SOUTH';
            } else if (this.map.partyPosition.direction == 'SOUTH') {
                this.map.partyPosition.direction = 'WEST';
            } else if (this.map.partyPosition.direction == 'WEST') {
                this.map.partyPosition.direction = 'NORTH';
            }
        }

        this.turnLeft = function() {
            if (this.map.partyPosition.direction == 'NORTH') {
                this.map.partyPosition.direction = 'WEST';
            } else if (this.map.partyPosition.direction == 'EAST') {
                this.map.partyPosition.direction = 'NORTH';
            } else if (this.map.partyPosition.direction == 'SOUTH') {
                this.map.partyPosition.direction = 'EAST';
            } else if (this.map.partyPosition.direction == 'WEST') {
                this.map.partyPosition.direction = 'SOUTH';
            }
        }
    }

    function invertDirection() {
        if (map.partyPosition.direction == 'NORTH') {
            map.partyPosition.direction = 'SOUTH';
        } else if (map.partyPosition.direction == 'EAST') {
            map.partyPosition.direction = 'WEST';
        } else if (map.partyPosition.direction == 'SOUTH') {
            map.partyPosition.direction = 'NORTH';
        } else if (map.partyPosition.direction == 'WEST') {
            map.partyPosition.direction = 'EAST';
        }
    }

    function initRegionalMap(regionalMap, partyPosition) {
        map.regionalMap = regionalMap;
        map.partyPosition = partyPosition;
        let mapImage = new Image();
        mapImage.src = regionalMap.resourceFilename;
        mapImage.onload = function() {
            map.mapImage = mapImage
        }
    }

    function initParty(party) {
        for (let i = 0; i < party.partyMembers.length; i++) {
            let partyMember = party.partyMembers[i];
            let portraitImage = new Image();
            portraitImage.src = partyMember.portraitFileName;
            portraitImage.onload = function() {
                partyMember.portraitImage = portraitImage;
                partyMembers[i] = partyMember;
            }
        }
    }

    function initWallMap(map) {
        let mapKeys = Object.keys(map);
        for (let i = 0; i < mapKeys.length; i++) {
            let textureValue = map[mapKeys[i]];
          console.log(mapKeys[i] + ' = ' + textureValue);
          let textureImage = new Image();
          textureImage.src = textureValue;
          textureImage.onload = function() {
              wallMap[mapKeys[i]] = textureImage;
              wallMap.textureCount += 1;
          }
        }
    }

    function initRoomMap(map) {
        let mapKeys = Object.keys(map);
        for (let i = 0; i < mapKeys.length; i++) {
            let textureValue = map[mapKeys[i]];
          console.log(mapKeys[i] + ' = ' + textureValue);
          let textureImage = new Image();
          textureImage.src = textureValue;
          textureImage.onload = function() {
              roomMap[mapKeys[i]] = textureImage;
              roomMap.textureCount += 1;
          }
        }
    }

    return returnedModule;
}
);