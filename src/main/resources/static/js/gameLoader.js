define([], function () {
    let map = {};
    let partyMembers = [];
    let textureMap = {textureCount : 0};

    let returnedModule = function() {

        this.name = 'GameLoader';
        this.map = map;
        this.partyMembers = partyMembers;
        this.textureMap = textureMap;

        this.loaded = function() {
            if (map !== undefined
                && map.worldMap !== undefined
                && partyMembers !== undefined
                && textureMap !== undefined
                && textureMap.textureCount > 0
                ) {
                    return true;
            }
            return false;
        }

        this.loadGameState = function() {
            fetch('/ajax/gameState/sebus')
                .then(response => response.json())
                .then(data => {
                    initWorldMap(data.worldMap, data.party.partyPosition);
                    initParty(data.party);
                    initTextureMap(data.textureMap);

                });
        }

        this.moveForward = function() {
            if (this.map.partyPosition.direction == 'NORTH') {
                this.map.partyPosition.y -= 1;
            } else if (this.map.partyPosition.direction == 'EAST') {
                this.map.partyPosition.x += 1;
            } else if (this.map.partyPosition.direction == 'SOUTH') {
                this.map.partyPosition.y += 1;
            } else if (this.map.partyPosition.direction == 'WEST') {
                this.map.partyPosition.x -= 1;
            }
        }

        this.moveBackward = function() {
            if (this.map.partyPosition.direction == 'NORTH') {
                this.map.partyPosition.y += 1;
            } else if (this.map.partyPosition.direction == 'EAST') {
                this.map.partyPosition.x -= 1;
            } else if (this.map.partyPosition.direction == 'SOUTH') {
                this.map.partyPosition.y -= 1;
            } else if (this.map.partyPosition.direction == 'WEST') {
                this.map.partyPosition.x += 1;
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

    function initWorldMap(worldMap, partyPosition) {
        map.worldMap = worldMap;
        map.partyPosition = partyPosition;
        let mapImage = new Image();
        mapImage.src = worldMap.resourceFilename;
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

    function initTextureMap(map) {
        let textureMapKeys = Object.keys(map);
        for (let i = 0; i < textureMapKeys.length; i++) {
            let textureValue = map[textureMapKeys[i]];
          console.log(textureMapKeys[i] + ' = ' + textureValue);
          let textureImage = new Image();
          textureImage.src = textureValue;
          textureImage.onload = function() {
              textureMap[textureMapKeys[i]] = textureImage;
              textureMap.textureCount += 1;
          }
        }
    }

    return returnedModule;
}
);