(function(){
    "use strict";
    let canvas, mapDebugCanvas;
    let context, mapDebugContext;
    let audioContext;
    let map = {};
    let partyMembers = [];
    let textureMap = {};
    const mainWindowOffsetX = 90;
    const mainWindowOffsetY = 10;

    //window.onload = init;
    window.addEventListener('load',
      function() {
        init();
      }, false);

    function init(){
        loadSources();
        initAudio();
        initCanvas();
        initMapDebugCanvas();
        initMenu();
    }

    function loadSources() {
        loadGameState();
    }

    function loadGameState() {
        fetch('/ajax/gameState/sebus')
            .then(response => response.json())
            .then(data => {
                initWorldMap(data.worldMap, data.party.partyPosition);
                initParty(data.party);
                initTextureMap(data.textureMap);
                setTimeout(function() {drawState()}, 1000);
                //setInterval(function() {drawState()}, 1000);
            });
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
        //textureMap = map;
        let textureMapKeys = Object.keys(map);
        for (let i = 0; i < textureMapKeys.length; i++) {
            let textureValue = map[textureMapKeys[i]];
          console.log(textureMapKeys[i] + ' = ' + textureValue);
          let textureImage = new Image();
          textureImage.src = textureValue;
          textureImage.onload = function() {
              textureMap[textureMapKeys[i]] = textureImage;
          }
        }
    }

    function initCanvas() {
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
    }
    function initMapDebugCanvas() {
        mapDebugCanvas = document.getElementById('mapDebugCanvas');
        mapDebugContext = mapDebugCanvas.getContext('2d');
    }

    function initMenu() {
        document.getElementById("startFullScreen").onclick = function() {
            document.getElementById("canvas").requestFullscreen();
        };
    }

    function initAudio() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioElement = document.querySelector('audio');
        const playButton = document.getElementById('playAudio');
        playButton.addEventListener('click', function() {
            toggleAudio(this, audioElement);
        }, false);
    }

    function toggleAudio(that, audioElement) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        let track;
        if (!audioContext) {
            audioContext = new AudioContext();
            track = audioContext.createMediaElementSource(audioElement);
            track.connect(audioContext.destination);
        }
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        if (!that.dataset.playing) {
            audioElement.play();
            that.dataset.playing = 'true';
        } else {
            audioContext.suspend();
            that.dataset.playing = 'false';
        }
        audioElement.addEventListener('ended', () => {
            playButton.dataset.playing = 'false';
        }, false);
    }

    function drawState(){
        drawSideboard();
        drawRuneTable();
        drawPartyBar();
        drawTextWindow();
        drawDebugMap();
        drawMainWindow();
    }

    function drawDebugMap() {
        if (map.mapImage) {
            mapDebugContext.drawImage(map.mapImage, 0, 0, 60*4, 69*4);
            mapDebugContext.fillStyle = '#E200BD';
            mapDebugContext.fillRect(map.partyPosition.x*3*4, map.partyPosition.y*3*4, 3*4, 3*4);
        }
    }

    function drawBlockOnDebugMap(block) {
        mapDebugContext.strokeStyle = '#FFD800';
        mapDebugContext.strokeRect((block.x*3*4)-1, (block.y*3*4)-1, (3*4)+1, (3*4)+1);
    }

    function drawRuneTable() {
        let runeWindowColor = Math.random() > 0.5? '#dfe0ff' : '#eff0ff';
        context.fillStyle = runeWindowColor;
        context.fillRect(10, 10, 70, 265);
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
        context.fillStyle = backgroundCeilingColor;
        context.fillRect(90, 10, 265, 145);
        context.fillStyle = backgroundCeilingGradient1Color;
        context.fillRect(90, 145, 265, 5);
        context.fillStyle = backgroundCeilingGradient2Color;
        context.fillRect(90, 150, 265, 1);
        context.fillStyle = backgroundFloorGradient1Color;
        context.fillRect(90, 151, 265, 2);
        context.fillStyle = backgroundFloorGradient2Color;
        context.fillRect(90, 153, 265, 3);
        context.fillStyle = backgroundFloorGradient3Color;
        context.fillRect(90, 156, 265, 5);
        context.fillStyle = backgroundFloorColor;
        context.fillRect(90, 161, 265, 114);

        context.beginPath();
        context.lineWidth = 1;

        // Diagonalen
        context.moveTo(90, 33);
       context.lineTo(355, 275);
       context.moveTo(90, 275);
       context.lineTo(355, 33);

       context.moveTo(90, 132);
       context.lineTo(355, 176);
       context.moveTo(355, 132);
       context.lineTo(90, 176)

      context.moveTo(90, 117);
      context.lineTo(355, 191);
      context.moveTo(355, 117);
      context.lineTo(90, 191)
        //
        context.strokeStyle = '#ff0000';
        context.stroke();
        context.beginPath();
        // linke Senkrechten Ebene 4
        context.moveTo(198, 10);
        context.lineTo(198, 275);
        context.moveTo(149, 10);
        context.lineTo(149, 275);
        context.moveTo(100, 10);
        context.lineTo(100, 275);
        // rechte Senkrechten Ebene 4
        context.moveTo(247, 10);
        context.lineTo(247, 275);
        context.moveTo(296, 10);
        context.lineTo(296, 275);
        context.moveTo(345, 10);
        context.lineTo(345, 275);

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

        context.strokeStyle = '#00F0E5';
        context.stroke();
        context.beginPath();
         // linke Senkrechten Ebene 2
        context.moveTo(50, 10);
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
        context.beginPath();
        /*
        // linke Senkrechte Ebene 1
        context.moveTo(156, 10);
        context.lineTo(156, 275);
        // rechte Senkrechte Ebene 1
        context.moveTo(288, 10);
        context.lineTo(288, 275);
        context.strokeStyle = '#0088E5';
        context.stroke();*/
        context.beginPath();

        drawBlockRow(4);
        drawBlockRow(3);
        drawBlockRow(2);
        drawBlockRow(1);
       // drawSingleFrontWall();
       context.beginPath();
       context.lineWidth = 1;

       // Diagonalen
       context.moveTo(90, 33);
       context.lineTo(355, 275);
       context.moveTo(90, 275);
       context.lineTo(355, 33);

       context.moveTo(90, 132);
       context.lineTo(355, 176);
       context.moveTo(355, 132);
       context.lineTo(90, 176)

      context.moveTo(90, 117);
      context.lineTo(355, 191);
      context.moveTo(355, 117);
      context.lineTo(90, 191)

       context.strokeStyle = '#ff0000';
       context.stroke();
       context.beginPath();
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
                     88);
            } else if (row == 2) {
                // Bei dieser Nähe sieht man diesen Block gar nicht mehr
            } else {
                 // Bei dieser Nähe sieht man diesen Block gar nicht mehr
            }
        }
        if (wallTextureFacingRight) {
            if (row == 4) {
                wallTextureFacingRightX = 59;
                wallTextureFacingRightY = 144;
            } else if (row == 3) {
                wallTextureFacingRightX = 48;
                wallTextureFacingRightY = 144;
            } else if (row == 2) {
                wallTextureFacingRightX = 66;
                wallTextureFacingRightY = 144;
            } else {
                wallTextureFacingRightX = 0;
                wallTextureFacingRightY = 144;
            }
            transformAndDrawImage(wallTextureFacingRight, mainWindowOffsetX+wallTextureFacingRightX, mainWindowOffsetY+wallTextureFacingRightY, row, 1);
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
                wallTextureFacingTowardsX = 454;
                wallTextureFacingTowardsY = 511;
                wallTextureFacingTowardsScaleX = .262;
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
                wallTextureFacingTowardsY = 32;
                wallTextureFacingTowardsScaleX = .9;
                wallTextureFacingTowardsScaleY = .9;
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                    250);
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
                wallTextureFacingRightX = 0;
                wallTextureFacingRightY = 144;
            }
            transformAndDrawImage(wallTextureFacingRight, mainWindowOffsetX+wallTextureFacingRightX, mainWindowOffsetY+wallTextureFacingRightY, row, 1);
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
                wallTextureFacingTowardsX = 719;
                wallTextureFacingTowardsY = 511;
                wallTextureFacingTowardsScaleX = .262;
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
                wallTextureFacingTowardsY = 32;
                wallTextureFacingTowardsScaleX = .9;
                wallTextureFacingTowardsScaleY = .9;
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
                wallTextureFacingTowardsX = 1335;
                wallTextureFacingTowardsY = 831;
                wallTextureFacingTowardsScaleX = .185;
                wallTextureFacingTowardsScaleY = .16;
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY);
            } else if (row == 3) {
                wallTextureFacingTowardsX = 980;
                wallTextureFacingTowardsY = 511;
                wallTextureFacingTowardsScaleX = .262;
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
                wallTextureFacingTowardsX = 378;
                wallTextureFacingTowardsY = 32;
                wallTextureFacingTowardsScaleX = .9;
                wallTextureFacingTowardsScaleY = .9;
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                    0, 17);
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
                wallTextureFacingLeftX = 264;
                wallTextureFacingLeftY = 144;
            }
            transformAndDrawImage(wallTextureFacingLeft, mainWindowOffsetX+wallTextureFacingLeftX, mainWindowOffsetY+wallTextureFacingLeftY, row, -1);
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
                wallTextureFacingTowardsX = 1172;
                wallTextureFacingTowardsY = 511;
                wallTextureFacingTowardsScaleX = .262;
                wallTextureFacingTowardsScaleY = .24;
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                    0, 182);
            } else if (row == 2) {
                wallTextureFacingTowardsX = 682;
                wallTextureFacingTowardsY = 191;
                wallTextureFacingTowardsScaleX = .495;
                wallTextureFacingTowardsScaleY = .45;
                drawWallTextureFacingForwards(wallTextureFacingTowards, wallTextureFacingTowardsX,
                    wallTextureFacingTowardsY, wallTextureFacingTowardsScaleX, wallTextureFacingTowardsScaleY,
                    0, 182);
            } else {
                 // Bei dieser Nähe sieht man diesen Block gar nicht mehr
            }
        }
        if (wallTextureFacingLeft) {
            if (row == 4) {
                wallTextureFacingLeftX = 206;
                wallTextureFacingLeftY = 144;
            } else if (row == 3) {
                wallTextureFacingLeftX = 216;
                wallTextureFacingLeftY = 144;
            } else if (row == 2) {
                wallTextureFacingLeftX = 248;
                wallTextureFacingLeftY = 144;
            } else {
                wallTextureFacingLeftX = 264;
                wallTextureFacingLeftY = 144;
            }
            transformAndDrawImage(wallTextureFacingLeft, mainWindowOffsetX+wallTextureFacingLeftX, mainWindowOffsetY+wallTextureFacingLeftY, row, -1);
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
        context.resetTransform();
        context.scale(scaleX, scaleY);
        context.drawImage(texture, offsetX, 0, widthX, texture.height, x, y, widthX, texture.height);
        context.resetTransform();
    }

   function transformAndDrawImage(image, x, y, row, flipFactor) {
        context.resetTransform();
        let width = image.width;
        let height = image.height;
        let scaleX;
        let scaleY;
        let skew;

        if (row == 4) {
            scaleX = .041;
            scaleY = .152;
            skew = .08;
        } else if (row == 3) {
            scaleX = .038;
            scaleY = .252;
            skew = .08;
        } else if (row == 2) {
            scaleX = .118;
            scaleY = .462;
            skew = .21;
        } else {
            scaleX = .247;
            scaleY = .915;
            skew = .455;
        }

        for (var i = 0; i <= height / 2; ++i) {
           context.setTransform(flipFactor * scaleX, -skew * i / height, 0, scaleY, x, y);
           context.drawImage(image, 0, height / 2 + i, width, 2, 0, 0 + i, width, 2);
           context.setTransform(flipFactor * scaleX, skew * i / height, 0, scaleY, x, y);
           context.drawImage(image, 0, height / 2 - i, width, 2, 0, 0 - i, width, 2);
        }
        context.resetTransform();
        if (flipFactor == -1) {
            context.fillRect(x-5,y,5,5);
        } else {
            context.fillRect(x,y,5,5);
        }
    }

    function calulate2ndLeftBlockX(depth) {
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

    function drawTextWindow() {
        let textWindowColor = Math.random() > 0.5? '#d48161' : '#d58262';
        context.fillStyle = textWindowColor;
        context.fillRect(365, 10, 265, 265);
    }

    function drawSideboard() {
        let sideBoardColor = Math.random() > 0.5? '#ae6447' : '#af6548';
        // oberer Rand
        context.fillStyle = sideBoardColor;
        context.fillRect(0, 0, 640, 10);
        // linker Rand
        context.fillStyle = sideBoardColor;
        context.fillRect(0, 0, 10, 370);
        // rechter Rand
        context.fillStyle = sideBoardColor;
        context.fillRect(630, 0, 10, 470);
        // Rand zwischen Rune und Main
        context.fillStyle = sideBoardColor;
        context.fillRect(80, 10, 10, 275);
        // Rand zwischen Main und Text
        context.fillStyle = sideBoardColor;
        context.fillRect(355, 10, 10, 275);
        context.fillStyle = sideBoardColor;
        context.fillRect(0, 275, 640, 10);
        context.fillStyle = sideBoardColor;
        context.fillRect(0, 370, 640, 10);
        context.fillRect(0, 460, 640, 10);
    }

    function drawPartyBar() {
        let xOffset = 95;

        for (let i = 0; i < partyMembers.length; i++) {
            context.drawImage(partyMembers[i].portraitImage, 0+i*xOffset, 380);
        }
    }

})();
