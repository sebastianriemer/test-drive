define(['canvas', 'gameLoader'], function (Canvas, GameLoader) {
    let canvas = new Canvas();
    let gameLoader = new GameLoader();
    let map = gameLoader.map;
    let textureMap = gameLoader.textureMap;
    const mainWindowOffsetX = 90;
    const mainWindowOffsetY = 10;

    let returnedModule = function() {
        this.draw = function() {
            if (gameLoader.loaded()) {
                drawDebugMap();
                drawMainWindow();
            } else {
                console.log('GameLoader not yet loaded.')
            }
        }
    }

    function drawDebugMap() {
        if (gameLoader.map.mapImage) {
            canvas.contextHolder.mapDebugContext.drawImage(gameLoader.map.mapImage, 0, 0, 60*4, 69*4);
            drawPartyPositionOnMap();
        }
    }

    function drawPartyPositionOnMap() {
        canvas.contextHolder.mapDebugContext.fillStyle = '#E200BD';
        canvas.contextHolder.mapDebugContext.fillRect(gameLoader.map.partyPosition.x*3*4, gameLoader.map.partyPosition.y*3*4, 3*4, 3*4);
    }

    function drawMainWindow() {
        let backgroundCeilingColor = '#6fc9f9';
        let backgroundCeilingGradient1Color = '#4fa9e9';
        let backgroundCeilingGradient2Color = '#5063d9';
        let backgroundFloorGradient1Color = '#b9923e';
        let backgroundFloorGradient2Color = '#c9a24e';
        let backgroundFloorGradient3Color = '#d9b25e';
        let backgroundFloorColor = '#e9c26e';

        // 265
        // 145:120
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

        // Diagonalen
        canvas.contextHolder.context.moveTo(90, 33);
        canvas.contextHolder.context.lineTo(355, 275);
        canvas.contextHolder.context.moveTo(90, 275);
        canvas.contextHolder.context.lineTo(355, 33);

        canvas.contextHolder.context.moveTo(90, 132);
        canvas.contextHolder.context.lineTo(355, 176);
        canvas.contextHolder.context.moveTo(355, 132);
        canvas.contextHolder.context.lineTo(90, 176)

        canvas.contextHolder.context.moveTo(90, 117);
        canvas.contextHolder.context.lineTo(355, 191);
        canvas.contextHolder.context.moveTo(355, 117);
        canvas.contextHolder.context.lineTo(90, 191)
        //
        canvas.contextHolder.context.strokeStyle = '#ff0000';
        canvas.contextHolder.context.stroke();
        canvas.contextHolder.context.beginPath();
        // linke Senkrechten Ebene 4
        canvas.contextHolder.context.moveTo(198, 10);
        canvas.contextHolder.context.lineTo(198, 275);
        canvas.contextHolder.context.moveTo(149, 10);
        canvas.contextHolder.context.lineTo(149, 275);
        canvas.contextHolder.context.moveTo(100, 10);
        canvas.contextHolder.context.lineTo(100, 275);
        // rechte Senkrechten Ebene 4
        canvas.contextHolder.context.moveTo(247, 10);
        canvas.contextHolder.context.lineTo(247, 275);
        canvas.contextHolder.context.moveTo(296, 10);
        canvas.contextHolder.context.lineTo(296, 275);
        canvas.contextHolder.context.moveTo(345, 10);
        canvas.contextHolder.context.lineTo(345, 275);

        /*        // linke Senkrechten Ebene 3
        context.moveTo(198, 10);
        context.lineTo(198, 275);
        context.moveTo(149, 10);
        context.lineTo(149, 275);
        context.moveTo(100, 10);
        context.lineTo(100, 275);
        // rechte Senkrechten Ebene 3
        context.moveTo(247, 10);
        context.lineTo(247, 275);
        context.moveTo(296, 10);
        context.lineTo(296, 275);
        context.moveTo(345, 10);
        context.lineTo(345, 275);*/

        canvas.contextHolder.context.strokeStyle = '#00F0E5';
        canvas.contextHolder.context.stroke();
        canvas.contextHolder.context.beginPath();
        // linke Senkrechten Ebene 2
        /* context.moveTo(50, 10);
        context.lineTo(50, 275);
        context.moveTo(119, 10);
        context.lineTo(119, 275);
        context.moveTo(188, 10);
        context.lineTo(188, 275);
        // rechte Senkrechten Ebene 2
        context.moveTo(257, 10);
        context.lineTo(257, 275);
        context.moveTo(326, 10);
        context.lineTo(326, 275);
        context.moveTo(395, 10);
        context.lineTo(395, 275);

        context.strokeStyle = '#00BEE5';
        context.stroke();
        context.beginPath();*/
        /*
        // linke Senkrechte Ebene 1
        context.moveTo(156, 10);
        context.lineTo(156, 275);
        // rechte Senkrechte Ebene 1
        context.moveTo(288, 10);
        context.lineTo(288, 275);
        context.strokeStyle = '#0088E5';
        context.stroke();*/
        canvas.contextHolder.context.beginPath();

        drawBlockRow(4);
        drawBlockRow(3);
        drawBlockRow(2);
        drawBlockRow(1);
        drawBlockRow(0);
        // drawSingleFrontWall();
        canvas.contextHolder.context.beginPath();
        canvas.contextHolder.context.lineWidth = 1;

        // Diagonalen
        canvas.contextHolder.context.moveTo(90, 33);
        canvas.contextHolder.context.lineTo(355, 275);
        canvas.contextHolder.context.moveTo(90, 275);
        canvas.contextHolder.context.lineTo(355, 33);

        canvas.contextHolder.context.moveTo(90, 132);
        canvas.contextHolder.context.lineTo(355, 176);
        canvas.contextHolder.context.moveTo(355, 132);
        canvas.contextHolder.context.lineTo(90, 176)

        canvas.contextHolder.context.moveTo(90, 117);
        canvas.contextHolder.context.lineTo(355, 191);
        canvas.contextHolder.context.moveTo(355, 117);
        canvas.contextHolder.context.lineTo(90, 191)

        canvas.contextHolder.context.strokeStyle = '#ff0000';
        canvas.contextHolder.context.stroke();
        canvas.contextHolder.context.beginPath();
    }

    function drawBlockOnDebugMap(block) {
        canvas.contextHolder.mapDebugContext.strokeStyle = '#FFD800';
        canvas.contextHolder.mapDebugContext.strokeRect((block.x*3*4)-1, (block.y*3*4)-1, (3*4)+1, (3*4)+1);
    }


        function drawBlockRow(row) {
            let secondLeftBlock = map.worldMap.blockMap[calulate2ndLeftBlockY(row)][calulate2ndLeftBlockX(row)];
            let leftBlock = map.worldMap.blockMap[calulateLeftBlockY(row)][calulateLeftBlockX(row)];
            let centerBlock = map.worldMap.blockMap[calulateCenterBlockY(row)][calulateCenterBlockX(row)];
            let rightBlock = map.worldMap.blockMap[calulateRightBlockY(row)][calulateRightBlockX(row)];
            let secondRightBlock = map.worldMap.blockMap[calulate2ndRightBlockY(row)][calulate2ndRightBlockX(row)];

            drawBlockAs2ndLeft(secondLeftBlock, row);
            drawBlockAs2ndRight(secondRightBlock, row);
            drawBlockAsLeft(leftBlock, row);
            drawBlockAsRight(rightBlock, row);;
            drawBlockAsCenter(centerBlock, row);


        }

        function drawBlockAs2ndLeft(block, row) {
            drawBlockOnDebugMap(block);
            let wallTextureFacingTowards;
            let wallTextureFacingTowardsX;
            let wallTextureFacingTowardsY;
            let wallTextureFacingTowardsScaleX;
            let wallTextureFacingTowardsScaleY;
            let wallTextureFacingRight;
            let wallTextureFacingRightX;
            let wallTextureFacingRightY;

            if (map.partyPosition.direction === 'NORTH') {
                wallTextureFacingTowards = textureMap[block.southWall];
                wallTextureFacingRight = textureMap[block.eastWall];
            }
            else if (map.partyPosition.direction === 'EAST') {
               wallTextureFacingTowards = textureMap[block.westWall];
               wallTextureFacingRight = textureMap[block.southWall];
            }
            else if (map.partyPosition.direction === 'SOUTH') {
                wallTextureFacingTowards = textureMap[block.northWall];
                wallTextureFacingRight = textureMap[block.westWall];
            }
            else if (map.partyPosition.direction === 'WEST') {
                wallTextureFacingTowards = textureMap[block.eastWall];
                wallTextureFacingRight = textureMap[block.northWall];
            }
            if (wallTextureFacingTowards) {
                if (row == 4) {
                    wallTextureFacingTowardsX = 543;
                    wallTextureFacingTowardsY = 831;
                    wallTextureFacingTowardsScaleX = .185;
                    wallTextureFacingTowardsScaleY = .16;
                    drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                        wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
                } else if (row == 3) {
                    wallTextureFacingTowardsX = 344;
                    wallTextureFacingTowardsY = 511;
                    wallTextureFacingTowardsScaleX = .262;
                    wallTextureFacingTowardsScaleY = .24;
                    drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                        wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                         195);
                } else if (row == 2) {
                    // Bei dieser Nähe sieht man diesen Block gar nicht mehr
                } else {
                     // Bei dieser Nähe sieht man diesen Block gar nicht mehr
                }
            }
            if (wallTextureFacingRight && row > 1) {
                if (row == 4) {
                    wallTextureFacingRightX = 59;
                    wallTextureFacingRightY = 144;
                    transformAndDrawTexture(wallTextureFacingRight, mainWindowOffsetX+wallTextureFacingRightX, mainWindowOffsetY+wallTextureFacingRightY,
                        row,
                        1,
                        -2);
                } else if (row == 3) {
                    wallTextureFacingRightX = 18;
                    wallTextureFacingRightY = 144;
                    transformAndDrawTexture(wallTextureFacingRight, mainWindowOffsetX+wallTextureFacingRightX, mainWindowOffsetY+wallTextureFacingRightY,
                        row,
                        1,
                        -2);
                } else if (row == 2) {
                    wallTextureFacingRightX = 0;
                    wallTextureFacingRightY = 144;
                    transformAndDrawTexture(wallTextureFacingRight, mainWindowOffsetX+wallTextureFacingRightX, mainWindowOffsetY+wallTextureFacingRightY,
                        row,
                        1, -2, 218, wallTextureFacingRight.width);

                }

            }
        }

        function drawBlockAsLeft(block, row) {
            drawBlockOnDebugMap(block);
            let wallTextureFacingTowards;
            let wallTextureFacingTowardsX;
            let wallTextureFacingTowardsY;
            let wallTextureFacingTowardsScaleX;
            let wallTextureFacingTowardsScaleY;
            let wallTextureFacingRight;
            let wallTextureFacingRightX;
            let wallTextureFacingRightY;


            if (map.partyPosition.direction === 'NORTH') {
                wallTextureFacingTowards = textureMap[block.southWall];
                wallTextureFacingRight = textureMap[block.eastWall];
            }
            else if (map.partyPosition.direction === 'EAST') {
               wallTextureFacingTowards = textureMap[block.westWall];
               wallTextureFacingRight = textureMap[block.southWall];
            }
            else if (map.partyPosition.direction === 'SOUTH') {
                wallTextureFacingTowards = textureMap[block.northWall];
                wallTextureFacingRight = textureMap[block.westWall];
            }
            else if (map.partyPosition.direction === 'WEST') {
                wallTextureFacingTowards = textureMap[block.eastWall];
                wallTextureFacingRight = textureMap[block.northWall];
            }
            if (wallTextureFacingTowards) {
                if (row == 4) {
                   wallTextureFacingTowardsX = 805;
                   wallTextureFacingTowardsY = 831;
                   wallTextureFacingTowardsScaleX = .185;
                   wallTextureFacingTowardsScaleY = .16;
                   drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                       wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
                } else if (row == 3) {
                    wallTextureFacingTowardsX = 355;
                    wallTextureFacingTowardsY = 511;
                    wallTextureFacingTowardsScaleX = .305;
                    wallTextureFacingTowardsScaleY = .24;
                    drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                        wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
                } else if (row == 2) {
                    wallTextureFacingTowardsX = 182;
                    wallTextureFacingTowardsY = 212;
                    wallTextureFacingTowardsScaleX = .495;
                    wallTextureFacingTowardsScaleY = .45;
                    drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                        wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                        128);
                } else {
                    wallTextureFacingTowardsX = 100;
                    wallTextureFacingTowardsY = 58;
                    wallTextureFacingTowardsScaleX = .9;
                    wallTextureFacingTowardsScaleY = .81;
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
                    wallTextureFacingRightX = 98;
                    wallTextureFacingRightY = 144;
                } else if (row == 2) {
                    wallTextureFacingRightX = 66;
                    wallTextureFacingRightY = 144;
                } else {
                    wallTextureFacingRightX = 16;
                    wallTextureFacingRightY = 144;
                }
                transformAndDrawTexture(wallTextureFacingRight, mainWindowOffsetX+wallTextureFacingRightX, mainWindowOffsetY+wallTextureFacingRightY,
                    row,
                    1,
                    -1);
            }
        }

        function drawBlockAsCenter(block, row) {
            drawBlockOnDebugMap(block);
            let wallTextureFacingTowards;
            let wallTextureFacingTowardsX;
            let wallTextureFacingTowardsY;
            let wallTextureFacingTowardsScaleX;
            let wallTextureFacingTowardsScaleY;

            if (map.partyPosition.direction === 'NORTH') {
                wallTextureFacingTowards = textureMap[block.southWall];
            }
            else if (map.partyPosition.direction === 'EAST') {
               wallTextureFacingTowards = textureMap[block.westWall];
            }
            else if (map.partyPosition.direction === 'SOUTH') {
                wallTextureFacingTowards = textureMap[block.northWall];
            }
            else if (map.partyPosition.direction === 'WEST') {
                wallTextureFacingTowards = textureMap[block.eastWall];
            }
            if (wallTextureFacingTowards) {
                if (row == 4) {
                    wallTextureFacingTowardsX = 1070;
                    wallTextureFacingTowardsY = 831;
                    wallTextureFacingTowardsScaleX = .185;
                    wallTextureFacingTowardsScaleY = .16;
                    drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                        wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
                } else if (row == 3) {
                    wallTextureFacingTowardsX = 720;
                    wallTextureFacingTowardsY = 511;
                    wallTextureFacingTowardsScaleX = .261;
                    wallTextureFacingTowardsScaleY = .24;
                    drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                        wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
                } else if (row == 2) {
                    wallTextureFacingTowardsX = 316;
                    wallTextureFacingTowardsY = 212;
                    wallTextureFacingTowardsScaleX = .495;
                    wallTextureFacingTowardsScaleY = .45;
                    drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                        wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
                } else {
                    wallTextureFacingTowardsX = 115;
                    wallTextureFacingTowardsY = 58;
                    wallTextureFacingTowardsScaleX = .9;
                    wallTextureFacingTowardsScaleY = .81;
                    drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                        wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
                }
            }
        }

        function drawBlockAsRight(block, row) {
            drawBlockOnDebugMap(block);
            let wallTextureFacingTowards;
            let wallTextureFacingTowardsX;
            let wallTextureFacingTowardsY;
            let wallTextureFacingTowardsScaleX;
            let wallTextureFacingTowardsScaleY;
            let wallTextureFacingLeft;
            let wallTextureFacingLeftX;
            let wallTextureFacingLeftY;

            if (map.partyPosition.direction === 'NORTH') {
                wallTextureFacingTowards = textureMap[block.southWall];
                wallTextureFacingLeft = textureMap[block.westWall];
            }
            else if (map.partyPosition.direction === 'EAST') {
               wallTextureFacingTowards = textureMap[block.westWall];
               wallTextureFacingLeft = textureMap[block.northWall];
            }
            else if (map.partyPosition.direction === 'SOUTH') {
                wallTextureFacingTowards = textureMap[block.northWall];
                wallTextureFacingLeft = textureMap[block.eastWall];
            }
            else if (map.partyPosition.direction === 'WEST') {
                wallTextureFacingTowards = textureMap[block.eastWall];
                wallTextureFacingLeft = textureMap[block.southWall];
            }
            if (wallTextureFacingTowards) {
                if (row == 4) {
                    wallTextureFacingTowardsX = 1339;
                    wallTextureFacingTowardsY = 831;
                    wallTextureFacingTowardsScaleX = .185;
                    wallTextureFacingTowardsScaleY = .16;
                    drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                        wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
                } else if (row == 3) {
                    wallTextureFacingTowardsX = 840;
                    wallTextureFacingTowardsY = 511;
                    wallTextureFacingTowardsScaleX = .305;
                    wallTextureFacingTowardsScaleY = .24;
                    drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                        wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
                } else if (row == 2) {
                    wallTextureFacingTowardsX = 580
                    wallTextureFacingTowardsY = 212;
                    wallTextureFacingTowardsScaleX = .495;
                    wallTextureFacingTowardsScaleY = .45;
                    drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                        wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                        0, 138);
                } else {
                    wallTextureFacingTowardsX = 374;
                    wallTextureFacingTowardsY = 58;
                    wallTextureFacingTowardsScaleX = .9;
                    wallTextureFacingTowardsScaleY = .81;
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
                    wallTextureFacingLeftX = 198;
                    wallTextureFacingLeftY = 144;
                } else {
                    wallTextureFacingLeftX = 247;
                    wallTextureFacingLeftY = 144;
                }
                transformAndDrawTexture(wallTextureFacingLeft, mainWindowOffsetX+wallTextureFacingLeftX, mainWindowOffsetY+wallTextureFacingLeftY,
                row, -1, 1);
            }
        }

        function drawBlockAs2ndRight(block, row) {
            drawBlockOnDebugMap(block);
            let wallTextureFacingTowards;
            let wallTextureFacingTowardsX;
            let wallTextureFacingTowardsY;
            let wallTextureFacingTowardsScaleX;
            let wallTextureFacingTowardsScaleY;
            let wallTextureFacingLeft;
            let wallTextureFacingLeftX;
            let wallTextureFacingLeftY;

            if (map.partyPosition.direction === 'NORTH') {
                wallTextureFacingTowards = textureMap[block.southWall];
                wallTextureFacingLeft = textureMap[block.westWall];
            }
            else if (map.partyPosition.direction === 'EAST') {
               wallTextureFacingTowards = textureMap[block.westWall];
               wallTextureFacingLeft = textureMap[block.northWall];
            }
            else if (map.partyPosition.direction === 'SOUTH') {
                wallTextureFacingTowards = textureMap[block.northWall];
                wallTextureFacingLeft = textureMap[block.eastWall];
            }
            else if (map.partyPosition.direction === 'WEST') {
                wallTextureFacingTowards = textureMap[block.eastWall];
                wallTextureFacingLeft = textureMap[block.southWall];
            }
            if (wallTextureFacingTowards) {
                if (row == 4) {
                    wallTextureFacingTowardsX = 1600;
                    wallTextureFacingTowardsY = 831;
                    wallTextureFacingTowardsScaleX = .185;
                    wallTextureFacingTowardsScaleY = .16;
                    drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                        wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
                } else if (row == 3) {
                    //wallTextureFacingTowardsX = 1242;
                    wallTextureFacingTowardsX = 1286;
                    wallTextureFacingTowardsY = 511;
                    wallTextureFacingTowardsScaleX = .262;
                    wallTextureFacingTowardsScaleY = .24;
                    drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                        wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                        0, 70);
                } else if (row == 2) {
                      // Bei dieser Nähe sieht man diesen Block gar nicht mehr
                } else {
                       // Bei dieser Nähe sieht man diesen Block gar nicht mehr
                }
            }
            if (wallTextureFacingLeft && row > 1) {
                if (row == 4) {
                    wallTextureFacingLeftX = 206;
                    wallTextureFacingLeftY = 144;
                    transformAndDrawTexture(wallTextureFacingLeft, mainWindowOffsetX+wallTextureFacingLeftX, mainWindowOffsetY+wallTextureFacingLeftY,
                        row, -1,
                        2);
                } else if (row == 3) {
                    wallTextureFacingLeftX = 247;
                    wallTextureFacingLeftY = 144;
                    transformAndDrawTexture(wallTextureFacingLeft, mainWindowOffsetX+wallTextureFacingLeftX, mainWindowOffsetY+wallTextureFacingLeftY,
                        row, -1,
                        2);
                } else if (row == 2) {
                    wallTextureFacingLeftX = 266;
                    wallTextureFacingLeftY = 144;
                    transformAndDrawTexture(wallTextureFacingLeft, mainWindowOffsetX+wallTextureFacingLeftX, mainWindowOffsetY+wallTextureFacingLeftY,
                        row, -1, 2, 216, wallTextureFacingLeft.width);
                }

            }
        }

        function drawSingleFrontWall() {
            let centerBlockX = calulateCenterBlockX(1);
            let centerBlockY = calulateCenterBlockY(1);
        }

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
                if (Math.abs(columnIdx) == 2) {
                    scaleX = .141;
                } else if (Math.abs(columnIdx) == 1) {
                    scaleX = .047;
                } else {
                    // nichts nötig;
                }
                scaleY = .162;
                skew = .08;
            } else if (row == 3) {
                if (Math.abs(columnIdx) == 2) {
                    scaleX = .148;
                } else if (Math.abs(columnIdx) == 1) {
                    scaleX = .038;
                } else {
                    // nichts nötig;
                }
                scaleY = .240;
                skew = .08;
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
            } else {
                scaleX = .183;
                scaleY = .805;
                skew = .340;
            }

            for (var i = 0; i <= height / 2; ++i) {
               canvas.contextHolder.context.setTransform(flipFactor * scaleX, -skew * i / height, 0, scaleY, x, y);
               canvas.contextHolder.context.drawImage(texture, offsetX, height / 2 + i, widthX, 2, 0, 0 + i, widthX, 2);
               canvas.contextHolder.context.setTransform(flipFactor * scaleX, skew * i / height, 0, scaleY, x, y);
               canvas.contextHolder.context.drawImage(texture, offsetX, height / 2 - i, widthX, 2, 0, 0 - i, widthX, 2);
            }
            canvas.contextHolder.context.resetTransform();
            if (row == 2 && Math.abs(columnIdx) == 2) {
                let itbe = 0;
            }

            if (flipFactor == -1) {
                canvas.contextHolder.context.fillRect(x-5,y,5,5);
            } else {
                canvas.contextHolder.context.fillRect(x,y,5,5);
            }
        }

        function calulate2ndLeftBlockX(depth) {
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

        function calulateLeftBlockX(depth) {
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

        function calulateCenterBlockX(depth) {
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

        function calulateRightBlockX(depth) {
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

        function calulate2ndRightBlockX(depth) {
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

        function calulateLeftBlockY(depth) {
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

        function calulate2ndLeftBlockY(depth) {
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

        function calulateCenterBlockY(depth) {
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

        function calulateRightBlockY(depth) {
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

        function calulate2ndRightBlockY(depth) {
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

    return returnedModule;
}
);