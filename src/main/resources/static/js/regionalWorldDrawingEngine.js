define(['canvas', 'gameState'], function (canvas, gameState) {
    //let canvas = new Canvas();
    //let gameState = new GameState();
    let map = gameState.regionalMap;
    // let battleMap = gameState.battleMap;
    const mainWindowOffsetX = 90;
    const mainWindowOffsetY = 10;

    let regionalWorldDrawingEngine = function() {
        this.draw = function() {
            if (gameState.loaded()) {
                //drawDebugMap();
                //drawDebugBattleMap();
                draw();
            } else {
                console.log('GameState not yet loaded.')
            }
        }
    }

    function draw() {
        let backgroundCeilingColor = '#6fc9f9';
        let backgroundCeilingGradient1Color = '#4fa9e9';
        let backgroundCeilingGradient2Color = '#5063d9';
        let backgroundFloorGradient1Color = '#b9923e';
        let backgroundFloorGradient2Color = '#c9a24e';
        let backgroundFloorGradient3Color = '#d9b25e';
        let backgroundFloorColor = '#e9c26e';

        canvas.contextHolder.context.fillStyle = backgroundCeilingColor;
        canvas.contextHolder.context.fillRect(90, 10, 265, 145);
        canvas.contextHolder.context.fillStyle = backgroundCeilingGradient1Color;
        canvas.contextHolder.context.fillRect(90, 145, 265, 5);
        canvas.contextHolder.context.fillStyle = backgroundCeilingGradient2Color;
        canvas.contextHolder.context.fillRect(90, 150, 265, 1);
        canvas.contextHolder.context.fillStyle = backgroundFloorGradient1Color;
        canvas.contextHolder.context.fillRect(90, 151, 265, 2);
        canvas.contextHolder.context.fillStyle = backgroundFloorGradient2Color;
        canvas.contextHolder.context.fillRect(90, 153, 265, 3);
        canvas.contextHolder.context.fillStyle = backgroundFloorGradient3Color;
        canvas.contextHolder.context.fillRect(90, 156, 265, 5);
        canvas.contextHolder.context.fillStyle = backgroundFloorColor;
        canvas.contextHolder.context.fillRect(90, 161, 265, 114);
        canvas.contextHolder.context.beginPath();
        canvas.contextHolder.context.lineWidth = 1;
        canvas.contextHolder.context.strokeStyle = '#00F0E5';
        canvas.contextHolder.context.stroke();
        canvas.contextHolder.context.beginPath();

        canvas.contextHolder.context.beginPath();
        drawRow(4);
        drawRow(3);
        drawRow(2);
        drawRow(1);
        drawRow(0);
        canvas.contextHolder.context.beginPath();
        canvas.contextHolder.context.lineWidth = 1;
    }


    function drawBlockOnDebugMap(block) {
        canvas.contextHolder.mapDebugContext.strokeStyle = '#FFD800';
        canvas.contextHolder.mapDebugContext.strokeRect((block.x*3*4)-1, (block.y*3*4)-1, (3*4)+1, (3*4)+1);
    }


    function drawRow(row) {
        let thirdLeftBlock = getBlockIfInbound(calculate3rdLeftBlockY(row), calculate3rdLeftBlockX(row));
        let secondLeftBlock = getBlockIfInbound(calculate2ndLeftBlockY(row), calculate2ndLeftBlockX(row));
        let leftBlock = getBlockIfInbound(calculateLeftBlockY(row), calculateLeftBlockX(row));
        let centerBlock = getBlockIfInbound(calculateCenterBlockY(row), calculateCenterBlockX(row));
        let rightBlock = getBlockIfInbound(calculateRightBlockY(row), calculateRightBlockX(row));
        let secondRightBlock = getBlockIfInbound(calculate2ndRightBlockY(row), calculate2ndRightBlockX(row));
        let thirdRightBlock = getBlockIfInbound(calculate3rdRightBlockY(row), calculate3rdRightBlockX(row));

        if (thirdLeftBlock) {
            drawBlockAs3rdLeft(thirdLeftBlock, row);
        }
        if (thirdRightBlock) {
            drawBlockAs3rdRight(thirdRightBlock, row);
        }

        if (secondLeftBlock) {
            drawBlockAs2ndLeft(secondLeftBlock, row);
        }
        if (secondRightBlock) {
            drawBlockAs2ndRight(secondRightBlock, row);
        }
        if (leftBlock) {
            drawBlockAsLeft(leftBlock, row);
        }
        if (rightBlock) {
            drawBlockAsRight(rightBlock, row);
        }
        if (centerBlock) {
            drawBlockAsCenter(centerBlock, row);
        }
    }

    function getBlockIfInbound(y, x) {
        if (x >= 0 && x < map.mapData.blockMap[0].length) {
            if (y >= 0 && y < map.mapData.blockMap.length) {
                return map.mapData.blockMap[y][x];
            }
        }
        return undefined;
    }

    function drawBlockAs3rdLeft(block, row) {

        let wallTextureFacingTowards;
        let wallTextureFacingTowardsX;
        let wallTextureFacingTowardsY;
        let wallTextureFacingTowardsScaleX;
        let wallTextureFacingTowardsScaleY;
        let wallTextureFacingRight;
        let wallTextureFacingRightX;
        let wallTextureFacingRightY;

        if (map.partyPosition.direction === 'NORTH') {
            wallTextureFacingTowards = gameState.getWallTexture(block.southWall.texture);
            wallTextureFacingRight = gameState.getWallTexture(block.eastWall.texture);
        }
        else if (map.partyPosition.direction === 'EAST') {
           wallTextureFacingTowards = gameState.getWallTexture(block.westWall.texture);
           wallTextureFacingRight = gameState.getWallTexture(block.southWall.texture);
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            wallTextureFacingTowards = gameState.getWallTexture(block.northWall.texture);
            wallTextureFacingRight = gameState.getWallTexture(block.westWall.texture);
        }
        else if (map.partyPosition.direction === 'WEST') {
            wallTextureFacingTowards = gameState.getWallTexture(block.eastWall.texture);
            wallTextureFacingRight = gameState.getWallTexture(block.northWall.texture);
        }
        if (wallTextureFacingTowards) {
            if (row == 4) {
                wallTextureFacingTowardsX = 488;
                wallTextureFacingTowardsY = 831;
                wallTextureFacingTowardsScaleX = .185;
                wallTextureFacingTowardsScaleY = .16;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                    200);
            }
        }

        if (wallTextureFacingRight) {
            if (row == 4) {
                wallTextureFacingRightX = 8;
                wallTextureFacingRightY = 144;
                drawBlockOnDebugMap(block);
                transformAndDrawTexture(wallTextureFacingRight, mainWindowOffsetX+wallTextureFacingRightX, mainWindowOffsetY+wallTextureFacingRightY,
                    row, 1, -3);
            } else if (row == 3) {
                wallTextureFacingRightX = 0;
                wallTextureFacingRightY = 144;
                drawBlockOnDebugMap(block);
                transformAndDrawTexture(wallTextureFacingRight, mainWindowOffsetX+wallTextureFacingRightX, mainWindowOffsetY+wallTextureFacingRightY,
                    row, 1, -3)
            }
        }

    }

    function drawBlockAs2ndLeft(block, row) {
        let wallTextureFacingTowards;
        let wallTextureFacingTowardsX;
        let wallTextureFacingTowardsY;
        let wallTextureFacingTowardsScaleX;
        let wallTextureFacingTowardsScaleY;
        let wallTextureFacingRight;
        let wallTextureFacingRightX;
        let wallTextureFacingRightY;

        if (map.partyPosition.direction === 'NORTH') {
            wallTextureFacingTowards = gameState.getWallTexture(block.southWall.texture);
            wallTextureFacingRight = gameState.getWallTexture(block.eastWall.texture);
        }
        else if (map.partyPosition.direction === 'EAST') {
           wallTextureFacingTowards = gameState.getWallTexture(block.westWall.texture);
           wallTextureFacingRight = gameState.getWallTexture(block.southWall.texture);
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            wallTextureFacingTowards = gameState.getWallTexture(block.northWall.texture);
            wallTextureFacingRight = gameState.getWallTexture(block.westWall.texture);
        }
        else if (map.partyPosition.direction === 'WEST') {
            wallTextureFacingTowards = gameState.getWallTexture(block.eastWall.texture);
            wallTextureFacingRight = gameState.getWallTexture(block.northWall.texture);
        }
        if (wallTextureFacingTowards) {
            if (row == 4) {
                wallTextureFacingTowardsX = 543;
                wallTextureFacingTowardsY = 831;
                wallTextureFacingTowardsScaleX = .185;
                wallTextureFacingTowardsScaleY = .16;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
            } else if (row == 3) {
                wallTextureFacingTowardsX = 344;
                wallTextureFacingTowardsY = 511;
                wallTextureFacingTowardsScaleX = .262;
                wallTextureFacingTowardsScaleY = .24;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                     195);
            }
        }
        if (wallTextureFacingRight && row > 1) {
            if (row == 4) {
                wallTextureFacingRightX = 59;
                wallTextureFacingRightY = 144;
                drawBlockOnDebugMap(block);
                transformAndDrawTexture(wallTextureFacingRight, mainWindowOffsetX+wallTextureFacingRightX, mainWindowOffsetY+wallTextureFacingRightY,
                    row,
                    1,
                    -2);
            } else if (row == 3) {
                wallTextureFacingRightX = 18;
                wallTextureFacingRightY = 144;
                drawBlockOnDebugMap(block);
                transformAndDrawTexture(wallTextureFacingRight, mainWindowOffsetX+wallTextureFacingRightX, mainWindowOffsetY+wallTextureFacingRightY,
                    row,
                    1,
                    -2);
            } else if (row == 2) {
                wallTextureFacingRightX = 0;
                wallTextureFacingRightY = 144;
                drawBlockOnDebugMap(block);
                transformAndDrawTexture(wallTextureFacingRight, mainWindowOffsetX+wallTextureFacingRightX, mainWindowOffsetY+wallTextureFacingRightY,
                    row,
                    1, -2, 218, wallTextureFacingRight.width);

            }

        }
    }

    function drawBlockAsLeft(block, row) {
        let wallTextureFacingTowards;
        let wallTextureFacingTowardsX;
        let wallTextureFacingTowardsY;
        let wallTextureFacingTowardsScaleX;
        let wallTextureFacingTowardsScaleY;
        let wallTextureFacingRight;
        let wallTextureFacingRightX;
        let wallTextureFacingRightY;

        if (map.partyPosition.direction === 'NORTH') {
            wallTextureFacingTowards = gameState.getWallTexture(block.southWall.texture);
            wallTextureFacingRight = gameState.getWallTexture(block.eastWall.texture);
        }
        else if (map.partyPosition.direction === 'EAST') {
           wallTextureFacingTowards = gameState.getWallTexture(block.westWall.texture);
           wallTextureFacingRight = gameState.getWallTexture(block.southWall.texture);
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            wallTextureFacingTowards = gameState.getWallTexture(block.northWall.texture);
            wallTextureFacingRight = gameState.getWallTexture(block.westWall.texture);
        }
        else if (map.partyPosition.direction === 'WEST') {
            wallTextureFacingTowards = gameState.getWallTexture(block.eastWall.texture);
            wallTextureFacingRight = gameState.getWallTexture(block.northWall.texture);
        }
        if (wallTextureFacingTowards) {
            if (row == 4) {
               wallTextureFacingTowardsX = 805;
               wallTextureFacingTowardsY = 831;
               wallTextureFacingTowardsScaleX = .185;
               wallTextureFacingTowardsScaleY = .16;
               drawBlockOnDebugMap(block);
               drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                   wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
            } else if (row == 3) {
                wallTextureFacingTowardsX = 355;
                wallTextureFacingTowardsY = 511;
                wallTextureFacingTowardsScaleX = .305;
                wallTextureFacingTowardsScaleY = .24;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
            } else if (row == 2) {
                wallTextureFacingTowardsX = 182;
                wallTextureFacingTowardsY = 212;
                wallTextureFacingTowardsScaleX = .495;
                wallTextureFacingTowardsScaleY = .45;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                    128);
            } else if (row == 1) {
                wallTextureFacingTowardsX = 100;
                wallTextureFacingTowardsY = 58;
                wallTextureFacingTowardsScaleX = .9;
                wallTextureFacingTowardsScaleY = .81;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                    245);
            }
        }
        if (wallTextureFacingRight) {
            if (row == 4) {
                wallTextureFacingRightX = 108;
                wallTextureFacingRightY = 144;
            } else if (row == 3) {
                wallTextureFacingRightX = 97;
                wallTextureFacingRightY = 144;
            } else if (row == 2) {
                wallTextureFacingRightX = 65;
                wallTextureFacingRightY = 144;
            } else if (row == 1) {
                wallTextureFacingRightX = 16;
                wallTextureFacingRightY = 144;
            } else if (row == 0) {
              wallTextureFacingRightX = 0;
              wallTextureFacingRightY = 144;
          }
          drawBlockOnDebugMap(block);
            transformAndDrawTexture(wallTextureFacingRight, mainWindowOffsetX+wallTextureFacingRightX, mainWindowOffsetY+wallTextureFacingRightY,
                row,
                1,
                -1);
        }
    }

    function drawBlockAsCenter(block, row) {
        let wallTextureFacingTowards;
        let wallTextureFacingTowardsX;
        let wallTextureFacingTowardsY;
        let wallTextureFacingTowardsScaleX;
        let wallTextureFacingTowardsScaleY;

        if (map.partyPosition.direction === 'NORTH') {
            wallTextureFacingTowards = gameState.getWallTexture(block.southWall.texture);
        }
        else if (map.partyPosition.direction === 'EAST') {
           wallTextureFacingTowards = gameState.getWallTexture(block.westWall.texture);
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            wallTextureFacingTowards = gameState.getWallTexture(block.northWall.texture);
        }
        else if (map.partyPosition.direction === 'WEST') {
            wallTextureFacingTowards = gameState.getWallTexture(block.eastWall.texture);
        }
        if (wallTextureFacingTowards) {
            if (row == 4) {
                wallTextureFacingTowardsX = 1069;
                wallTextureFacingTowardsY = 831;
                wallTextureFacingTowardsScaleX = .185;
                wallTextureFacingTowardsScaleY = .16;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
            } else if (row == 3) {
                wallTextureFacingTowardsX = 690;
                wallTextureFacingTowardsY = 511;
                wallTextureFacingTowardsScaleX = .270;
                wallTextureFacingTowardsScaleY = .24;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
            } else if (row == 2) {
                wallTextureFacingTowardsX = 298;
                wallTextureFacingTowardsY = 212;
                wallTextureFacingTowardsScaleX = .52;
                wallTextureFacingTowardsScaleY = .45;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
            } else {
                wallTextureFacingTowardsX = 115;
                wallTextureFacingTowardsY = 58;
                wallTextureFacingTowardsScaleX = .9;
                wallTextureFacingTowardsScaleY = .81;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
            }
        }
    }

    function drawBlockAsRight(block, row) {
        let wallTextureFacingTowards;
        let wallTextureFacingTowardsX;
        let wallTextureFacingTowardsY;
        let wallTextureFacingTowardsScaleX;
        let wallTextureFacingTowardsScaleY;
        let wallTextureFacingLeft;
        let wallTextureFacingLeftX;
        let wallTextureFacingLeftY;

        if (map.partyPosition.direction === 'NORTH') {
            wallTextureFacingTowards = gameState.getWallTexture(block.southWall.texture);
            wallTextureFacingLeft = gameState.getWallTexture(block.westWall.texture);
        }
        else if (map.partyPosition.direction === 'EAST') {
           wallTextureFacingTowards = gameState.getWallTexture(block.westWall.texture);
           wallTextureFacingLeft = gameState.getWallTexture(block.northWall.texture);
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            wallTextureFacingTowards = gameState.getWallTexture(block.northWall.texture);
            wallTextureFacingLeft = gameState.getWallTexture(block.eastWall.texture);
        }
        else if (map.partyPosition.direction === 'WEST') {
            wallTextureFacingTowards = gameState.getWallTexture(block.eastWall.texture);
            wallTextureFacingLeft = gameState.getWallTexture(block.southWall.texture);
        }
        if (wallTextureFacingTowards) {
            if (row == 4) {
                wallTextureFacingTowardsX = 1332;
                wallTextureFacingTowardsY = 831;
                wallTextureFacingTowardsScaleX = .185;
                wallTextureFacingTowardsScaleY = .16;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
            } else if (row == 3) {
                wallTextureFacingTowardsX = 840;
                wallTextureFacingTowardsY = 511;
                wallTextureFacingTowardsScaleX = .305;
                wallTextureFacingTowardsScaleY = .24;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
            } else if (row == 2) {
                wallTextureFacingTowardsX = 582
                wallTextureFacingTowardsY = 212;
                wallTextureFacingTowardsScaleX = .495;
                wallTextureFacingTowardsScaleY = .45;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                    0, 138);
            } else if (row == 1) {
                wallTextureFacingTowardsX = 374;
                wallTextureFacingTowardsY = 58;
                wallTextureFacingTowardsScaleX = .9;
                wallTextureFacingTowardsScaleY = .81;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                    0, 20);
            }
        }
        if (wallTextureFacingLeft) {
            if (row == 4) {
                wallTextureFacingLeftX = 157;
                wallTextureFacingLeftY = 144;
            } else if (row == 3) {
                wallTextureFacingLeftX = 167;
                wallTextureFacingLeftY = 144;
            } else if (row == 2) {
                wallTextureFacingLeftX = 200;
                wallTextureFacingLeftY = 144;
            } else if (row == 1) {
                wallTextureFacingLeftX = 250;
                wallTextureFacingLeftY = 144;
            } else if (row == 0) {
              wallTextureFacingLeftX = 266;
              wallTextureFacingLeftY = 144;
            }
            drawBlockOnDebugMap(block);
            transformAndDrawTexture(wallTextureFacingLeft, mainWindowOffsetX+wallTextureFacingLeftX, mainWindowOffsetY+wallTextureFacingLeftY,
            row, -1, 1);
        }
    }

    function drawBlockAs2ndRight(block, row) {
        let wallTextureFacingTowards;
        let wallTextureFacingTowardsX;
        let wallTextureFacingTowardsY;
        let wallTextureFacingTowardsScaleX;
        let wallTextureFacingTowardsScaleY;
        let wallTextureFacingLeft;
        let wallTextureFacingLeftX;
        let wallTextureFacingLeftY;

        if (map.partyPosition.direction === 'NORTH') {
            wallTextureFacingTowards = gameState.getWallTexture(block.southWall.texture);
            wallTextureFacingLeft = gameState.getWallTexture(block.westWall.texture);
        }
        else if (map.partyPosition.direction === 'EAST') {
           wallTextureFacingTowards = gameState.getWallTexture(block.westWall.texture);
           wallTextureFacingLeft = gameState.getWallTexture(block.northWall.texture);
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            wallTextureFacingTowards = gameState.getWallTexture(block.northWall.texture);
            wallTextureFacingLeft = gameState.getWallTexture(block.eastWall.texture);
        }
        else if (map.partyPosition.direction === 'WEST') {
            wallTextureFacingTowards = gameState.getWallTexture(block.eastWall.texture);
            wallTextureFacingLeft = gameState.getWallTexture(block.southWall.texture);
        }
        if (wallTextureFacingTowards) {
            if (row == 4) {
                wallTextureFacingTowardsX = 1600;
                wallTextureFacingTowardsY = 831;
                wallTextureFacingTowardsScaleX = .185;
                wallTextureFacingTowardsScaleY = .16;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
            } else if (row == 3) {
                //wallTextureFacingTowardsX = 1242;
                wallTextureFacingTowardsX = 1286;
                wallTextureFacingTowardsY = 511;
                wallTextureFacingTowardsScaleX = .262;
                wallTextureFacingTowardsScaleY = .24;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                    0, 70);
            }
        }
        if (wallTextureFacingLeft && row > 1) {
            if (row == 4) {
                wallTextureFacingLeftX = 206;
                wallTextureFacingLeftY = 144;
                drawBlockOnDebugMap(block);
                transformAndDrawTexture(wallTextureFacingLeft, mainWindowOffsetX+wallTextureFacingLeftX, mainWindowOffsetY+wallTextureFacingLeftY,
                    row, -1,
                    2);
            } else if (row == 3) {
                wallTextureFacingLeftX = 247;
                wallTextureFacingLeftY = 144;
                drawBlockOnDebugMap(block);
                transformAndDrawTexture(wallTextureFacingLeft, mainWindowOffsetX+wallTextureFacingLeftX, mainWindowOffsetY+wallTextureFacingLeftY,
                    row, -1,
                    2);
            } else if (row == 2) {
                wallTextureFacingLeftX = 266;
                wallTextureFacingLeftY = 144;
                drawBlockOnDebugMap(block);
                transformAndDrawTexture(wallTextureFacingLeft, mainWindowOffsetX+wallTextureFacingLeftX, mainWindowOffsetY+wallTextureFacingLeftY,
                    row, -1, 2, 216, wallTextureFacingLeft.width);
            }

        }
    }

    function drawBlockAs3rdRight(block, row) {
        let wallTextureFacingTowards;
        let wallTextureFacingTowardsX;
        let wallTextureFacingTowardsY;
        let wallTextureFacingTowardsScaleX;
        let wallTextureFacingTowardsScaleY;
        let wallTextureFacingLeft;
        let wallTextureFacingLeftX;
        let wallTextureFacingLeftY;

        if (map.partyPosition.direction === 'NORTH') {
            wallTextureFacingTowards = gameState.getWallTexture(block.southWall.texture);
            wallTextureFacingLeft = gameState.getWallTexture(block.westWall.texture);
        }
        else if (map.partyPosition.direction === 'EAST') {
           wallTextureFacingTowards = gameState.getWallTexture(block.westWall.texture);
           wallTextureFacingLeft = gameState.getWallTexture(block.northWall.texture);
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            wallTextureFacingTowards = gameState.getWallTexture(block.northWall.texture);
            wallTextureFacingLeft = gameState.getWallTexture(block.eastWall.texture);
        }
        else if (map.partyPosition.direction === 'WEST') {
            wallTextureFacingTowards = gameState.getWallTexture(block.eastWall.texture);
            wallTextureFacingLeft = gameState.getWallTexture(block.southWall.texture);
        }
        if (wallTextureFacingTowards) {
            if (row == 4) {
                wallTextureFacingTowardsX = 1869;
                wallTextureFacingTowardsY = 831;
                wallTextureFacingTowardsScaleX = .185;
                wallTextureFacingTowardsScaleY = .16;
                drawBlockOnDebugMap(block);
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                    0, 50);
            }
        }
        if (wallTextureFacingLeft) {
            if (row == 4) {
                wallTextureFacingLeftX = 256;
                wallTextureFacingLeftY = 144;
                drawBlockOnDebugMap(block);
                transformAndDrawTexture(wallTextureFacingLeft, mainWindowOffsetX+wallTextureFacingLeftX, mainWindowOffsetY+wallTextureFacingLeftY,
                    row, -1, 3);
            } else if (row == 3) {
                wallTextureFacingLeftX = 266;
                wallTextureFacingLeftY = 144;
                drawBlockOnDebugMap(block);
                transformAndDrawTexture(wallTextureFacingLeft, mainWindowOffsetX+wallTextureFacingLeftX, mainWindowOffsetY+wallTextureFacingLeftY,
                    row, -1, -3)
            }
        }
    }

    /*function drawSingleFrontWall() {
        let centerBlockX = calulateCenterBlockX(1);
        let centerBlockY = calulateCenterBlockY(1);
    }*/

    function drawWallTextureFacingForwards(texture, x, y, scaleX, scaleY, offsetX, widthX) {
        if (offsetX == undefined) {
            offsetX = 0;
        }
        if (widthX == undefined) {
            widthX = texture.width;
        }
        canvas.contextHolder.context.resetTransform();
        canvas.contextHolder.context.scale(scaleX, scaleY);
        canvas.contextHolder.context.drawImage(texture, offsetX, 0, widthX, texture.height, x, y, widthX, texture.height);
        canvas.contextHolder.context.resetTransform();
    }

   function transformAndDrawTexture(texture, x, y, row, flipFactor, columnIdx, offsetX, widthX) {
        if (offsetX == undefined) {
           offsetX = 0;
        }
        if (widthX == undefined) {
           widthX = texture.width;
        }
        canvas.contextHolder.context.resetTransform();
        let height = texture.height;
        let scaleX;
        let scaleY;
        let skew;

        if (row == 4) {
            if (Math.abs(columnIdx) == 3) {
                scaleX = .025;
                scaleY = .156;
                skew = .015;
            } else if (Math.abs(columnIdx) == 2) {
                scaleX = .100;
                scaleY = .162;
                skew = .065;
            } else if (Math.abs(columnIdx) == 1) {
                scaleX = .027;
                scaleY = .162;
                skew = .05;
            } else {
                // nichts nötig;
            }
        } else if (row == 3) {
            if (Math.abs(columnIdx) == 3) {
                scaleX = .030;
                scaleY = .175;
                skew = .025;
            } else if (Math.abs(columnIdx) == 2) {
                scaleX = .158;
                scaleY = .240;
                skew = .08;
            } else if (Math.abs(columnIdx) == 1) {
                scaleX = .038;
                scaleY = .240;
                skew = .07;
            } else {
                // nichts nötig;
            }

        } else if (row == 2) {
            if (Math.abs(columnIdx) == 2) {
                scaleX = .388;
                scaleY = .284;
            } else if (Math.abs(columnIdx) == 1) {
                scaleX = .118;
                scaleY = .462;
            } else {
                // nichts nötig;
            }

            skew = .21;
        } else if (row == 1) {
            scaleX = .183;
            scaleY = .805;
            skew = .340;
        } else if (row == 0) {
             scaleX = .055;
             scaleY = .925;
             skew = .100;
        }

        for (var i = 0; i <= height / 2; ++i) {
           canvas.contextHolder.context.setTransform(flipFactor * scaleX, -skew * i / height, 0, scaleY, x, y);
           canvas.contextHolder.context.drawImage(texture, offsetX, height / 2 + i, widthX, 2, 0, 0 + i, widthX, 2);
           canvas.contextHolder.context.setTransform(flipFactor * scaleX, skew * i / height, 0, scaleY, x, y);
           canvas.contextHolder.context.drawImage(texture, offsetX, height / 2 - i, widthX, 2, 0, 0 - i, widthX, 2);
        }
        canvas.contextHolder.context.resetTransform();
        /* if (row == 2 && Math.abs(columnIdx) == 2) {
            let itbe = 0;
        }

        if (flipFactor == -1) {
            //canvas.contextHolder.context.fillRect(x-5,y,5,5);
        } else {
            //canvas.contextHolder.context.fillRect(x,y,5,5);
        }*/
    }

    function calculate3rdLeftBlockX(depth) {
        if (map.partyPosition.direction === 'NORTH') {
            return map.partyPosition.x - 3;
        }
        else if (map.partyPosition.direction === 'EAST') {
            return map.partyPosition.x + depth;
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            return map.partyPosition.x + 3;
        }
        else if (map.partyPosition.direction === 'WEST') {
            return map.partyPosition.x - depth;
        }
        return undefined;
    }

    function calculate2ndLeftBlockX(depth) {
        if (map.partyPosition.direction === 'NORTH') {
            return map.partyPosition.x - 2;
        }
        else if (map.partyPosition.direction === 'EAST') {
            return map.partyPosition.x + depth;
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            return map.partyPosition.x + 2;
        }
        else if (map.partyPosition.direction === 'WEST') {
            return map.partyPosition.x - depth;
        }
        return undefined;
    }

    function calculateLeftBlockX(depth) {
        if (map.partyPosition.direction === 'NORTH') {
            return map.partyPosition.x - 1;
        }
        else if (map.partyPosition.direction === 'EAST') {
            return map.partyPosition.x + depth;
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            return map.partyPosition.x + 1;
        }
        else if (map.partyPosition.direction === 'WEST') {
            return map.partyPosition.x - depth;
        }
        return undefined;
    }

    function calculateCenterBlockX(depth) {
        if (map.partyPosition.direction === 'NORTH') {
            return map.partyPosition.x;
        }
        else if (map.partyPosition.direction === 'EAST') {
            return map.partyPosition.x + depth;
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            return map.partyPosition.x;
        }
        else if (map.partyPosition.direction === 'WEST') {
            return map.partyPosition.x - depth;
        }
        return undefined;
    }

    function calculateRightBlockX(depth) {
        if (map.partyPosition.direction === 'NORTH') {
            return map.partyPosition.x + 1;
        }
        else if (map.partyPosition.direction === 'EAST') {
            return map.partyPosition.x + depth;
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            return map.partyPosition.x - 1;
        }
        else if (map.partyPosition.direction === 'WEST') {
            return map.partyPosition.x - depth;
        }
        return undefined;
    }

    function calculate2ndRightBlockX(depth) {
        if (map.partyPosition.direction === 'NORTH') {
            return map.partyPosition.x + 2;
        }
        else if (map.partyPosition.direction === 'EAST') {
            return map.partyPosition.x + depth;
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            return map.partyPosition.x - 2;
        }
        else if (map.partyPosition.direction === 'WEST') {
            return map.partyPosition.x - depth;
        }
        return undefined;
    }

    function calculate3rdRightBlockX(depth) {
        if (map.partyPosition.direction === 'NORTH') {
            return map.partyPosition.x + 3;
        }
        else if (map.partyPosition.direction === 'EAST') {
            return map.partyPosition.x + depth;
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            return map.partyPosition.x - 3;
        }
        else if (map.partyPosition.direction === 'WEST') {
            return map.partyPosition.x - depth;
        }
        return undefined;
    }

    function calculate3rdLeftBlockY(depth) {
        if (map.partyPosition.direction === 'NORTH') {
            return map.partyPosition.y - depth;
        }
        else if (map.partyPosition.direction === 'EAST') {
            return map.partyPosition.y - 3;
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            return map.partyPosition.y + depth;
        }
        else if (map.partyPosition.direction === 'WEST') {
            return map.partyPosition.y + 3;
        }
        return undefined;
    }

    function calculate2ndLeftBlockY(depth) {
        if (map.partyPosition.direction === 'NORTH') {
            return map.partyPosition.y - depth;
        }
        else if (map.partyPosition.direction === 'EAST') {
            return map.partyPosition.y - 2;
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            return map.partyPosition.y + depth;
        }
        else if (map.partyPosition.direction === 'WEST') {
            return map.partyPosition.y + 2;
        }
        return undefined;
    }

    function calculateLeftBlockY(depth) {
        if (map.partyPosition.direction === 'NORTH') {
            return map.partyPosition.y - depth;
        }
        else if (map.partyPosition.direction === 'EAST') {
            return map.partyPosition.y - 1;
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            return map.partyPosition.y + depth;
        }
        else if (map.partyPosition.direction === 'WEST') {
            return map.partyPosition.y + 1;
        }
        return undefined;
    }

    function calculateCenterBlockY(depth) {
        if (map.partyPosition.direction === 'NORTH') {
            return map.partyPosition.y - depth;
        }
        else if (map.partyPosition.direction === 'EAST') {
            return map.partyPosition.y;
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            return map.partyPosition.y + depth;
        }
        else if (map.partyPosition.direction === 'WEST') {
            return map.partyPosition.y;
        }
        return undefined;
    }

    function calculateRightBlockY(depth) {
        if (map.partyPosition.direction === 'NORTH') {
            return map.partyPosition.y - depth ;
        }
        else if (map.partyPosition.direction === 'EAST') {
            return map.partyPosition.y + 1;
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            return map.partyPosition.y + depth;
        }
        else if (map.partyPosition.direction === 'WEST') {
            return map.partyPosition.y - 1;
        }
        return undefined;
    }

    function calculate2ndRightBlockY(depth) {
        if (map.partyPosition.direction === 'NORTH') {
            return map.partyPosition.y - depth ;
        }
        else if (map.partyPosition.direction === 'EAST') {
            return map.partyPosition.y + 2;
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            return map.partyPosition.y + depth;
        }
        else if (map.partyPosition.direction === 'WEST') {
            return map.partyPosition.y - 2;
        }
        return undefined;
    }

    function calculate3rdRightBlockY(depth) {
        if (map.partyPosition.direction === 'NORTH') {
            return map.partyPosition.y - depth ;
        }
        else if (map.partyPosition.direction === 'EAST') {
            return map.partyPosition.y + 3;
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            return map.partyPosition.y + depth;
        }
        else if (map.partyPosition.direction === 'WEST') {
            return map.partyPosition.y - 3;
        }
        return undefined;
    }

   if (!regionalWorldDrawingEngine.instance) {
        regionalWorldDrawingEngine.instance = new regionalWorldDrawingEngine();
    }
    return regionalWorldDrawingEngine.instance;
}
);