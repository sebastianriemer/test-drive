define(['eventBus', 'gameState', 'mapManager', 'partyManager'], function (eventBus, gameState,
mapManager, partyManager) {
    const Navigation = function () {
        this.lastMovement;

        this.getUpcomingWallForDirection = function(direction, movement) {
            if (movement != 'FORWARD') {
                direction = getInvertedDirection(direction);
            }
            switch (direction) {
              case 'NORTH':
                return mapManager.regionalMap.mapData.blockMap[mapManager.regionalMap.partyPosition.y-1][mapManager.regionalMap.partyPosition.x].southWall;
              case 'EAST':
                return mapManager.regionalMap.mapData.blockMap[mapManager.regionalMap.partyPosition.y][mapManager.regionalMap.partyPosition.x+1].westWall;
              case 'SOUTH':
                return mapManager.regionalMap.mapData.blockMap[mapManager.regionalMap.partyPosition.y+1][mapManager.regionalMap.partyPosition.x].northWall;
              case 'WEST':
                return mapManager.regionalMap.mapData.blockMap[mapManager.regionalMap.partyPosition.y][mapManager.regionalMap.partyPosition.x-1].eastWall;
              default:
                console.error(`Invalid direction! direction:'${direction}'`);
            }
        }

        this.turnRight = function() {
            if (mapManager.regionalMap.partyPosition.direction == 'NORTH') {
                mapManager.regionalMap.partyPosition.direction = 'EAST';
            } else if (mapManager.regionalMap.partyPosition.direction == 'EAST') {
                mapManager.regionalMap.partyPosition.direction = 'SOUTH';
            } else if (mapManager.regionalMap.partyPosition.direction == 'SOUTH') {
                mapManager.regionalMap.partyPosition.direction = 'WEST';
            } else if (mapManager.regionalMap.partyPosition.direction == 'WEST') {
                mapManager.regionalMap.partyPosition.direction = 'NORTH';
            }
        }

        this.turnLeft = function() {
            if (mapManager.regionalMap.partyPosition.direction == 'NORTH') {
                mapManager.regionalMap.partyPosition.direction = 'WEST';
            } else if (mapManager.regionalMap.partyPosition.direction == 'EAST') {
                mapManager.regionalMap.partyPosition.direction = 'NORTH';
            } else if (mapManager.regionalMap.partyPosition.direction == 'SOUTH') {
                mapManager.regionalMap.partyPosition.direction = 'EAST';
            } else if (mapManager.regionalMap.partyPosition.direction == 'WEST') {
                mapManager.regionalMap.partyPosition.direction = 'SOUTH';
            }
        }

        this.invertDirection = function() {
            mapManager.regionalMap.partyPosition.direction = getInvertedDirection(mapManager.regionalMap.partyPosition.direction);
        }


        this.setNewPartyPositionAccordingToDirection = function(direction, movement) {
            if (movement != 'FORWARD') {
                direction = getInvertedDirection(direction);
            }
            switch (direction) {
              case 'NORTH':
                return mapManager.regionalMap.partyPosition.y -= 1;
              case 'EAST':
                return mapManager.regionalMap.partyPosition.x += 1;
              case 'SOUTH':
                return mapManager.regionalMap.partyPosition.y += 1;
              case 'WEST':
                return mapManager.regionalMap.partyPosition.x -= 1;
              default:
                console.error(`Invalid direction! direction:'${direction}'`);
            }
            eventBus.emit("partyMoved", mapManager.regionalMap.partyPosition);
        }

        this.moveForward = function() {
            let plannedMovement = 'FORWARD';
            let wall = this.getUpcomingWallForDirection(mapManager.regionalMap.partyPosition.direction, plannedMovement);
            if (wall.solid) {
                eventBus.emit("partyBumpedWall");
            } else {
                this.setNewPartyPositionAccordingToDirection(mapManager.regionalMap.partyPosition.direction, plannedMovement);
                this.lastMovement = plannedMovement;
            }
        }

        this.moveBackward = function() {
            let plannedMovement = 'BACKWARD';
            let wall = this.getUpcomingWallForDirection(mapManager.regionalMap.partyPosition.direction, plannedMovement);
            if (wall.solid) {
              eventBus.emit("partyBumpedWall");
            } else {
              this.setNewPartyPositionAccordingToDirection(mapManager.regionalMap.partyPosition.direction, plannedMovement);
              this.lastMovement = plannedMovement;
            }
        }
    }

    function getInvertedDirection(direction) {
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

    return new Navigation();

});