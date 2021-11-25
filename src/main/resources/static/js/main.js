(function(){
    "use strict";
    let canvas;
    let context;
    let audioContext;
    let map = {};
    let partyMembers = [];
    let textureMap = {};

    //window.onload = init;
    window.addEventListener('load',
      function() {
        init();
      }, false);

    function init(){
        loadSources();
        initAudio();
        initCanvas();
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
                setInterval(function() {drawState()}, 1000);
            });
    }

    function initWorldMap(worldMap, partyPosition) {
        map.worldMap = worldMap;
        map.partyPosition = partyPosition;
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
        drawMainWindow();
        drawTextWindow();
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
        //context.fillRect(90, 10, 265, 265);

        drawFarthestRow();
        drawMiddleRow();
        drawNearestRow();
        drawSingleFrontWall();
    }

    function drawFarthestRow() {
        let leftBlockX = calulateLeftBlockX(3);
        let leftBlockY = calulateLeftBlockY(3);
        let centerBlockX = calulateCenterBlockX(3);
        let centerBlockY = calulateCenterBlockY(3);
        let rightBlockX = calulateRightBlockX(3);
        let rightBlockY = calulateRightBlockY(3);

        let leftBlock = map.worldMap.blockMap[leftBlockY][leftBlockX];
        let centerBlock = map.worldMap.blockMap[centerBlockY][centerBlockX];
        let rightBlock = map.worldMap.blockMap[rightBlockY][rightBlockX];


        drawBlockAsLeft(leftBlock, 3);// 197, 262);
        drawBlockAsCenter(centerBlock, 3);// 207, 272);
        drawBlockAsRight(rightBlock, 3);// 255, 271);

        return undefined;
    }

    function drawMiddleRow() {
        let leftBlockX = calulateLeftBlockX(2);
        let leftBlockY = calulateLeftBlockY(2);
        let centerBlockX = calulateCenterBlockX(2);
        let centerBlockY = calulateCenterBlockY(2);
        let rightBlockX = calulateRightBlockX(2);
        let rightBlockY = calulateRightBlockY(2);

        let leftBlock = map.worldMap.blockMap[leftBlockY][leftBlockX];
        let centerBlock = map.worldMap.blockMap[centerBlockY][centerBlockX];
        let rightBlock = map.worldMap.blockMap[rightBlockY][rightBlockX];

        drawBlockAsLeft(leftBlock, 2);// 197, 262);
        drawBlockAsCenter(centerBlock, 2);// 207, 272);
        drawBlockAsRight(rightBlock, 2);// 255, 271);
    }

    function drawNearestRow() {
        let leftBlockX = calulateLeftBlockX(1);
        let leftBlockY = calulateLeftBlockY(1);
        let centerBlockX = calulateCenterBlockX(1);
        let centerBlockY = calulateCenterBlockY(1);
        let rightBlockX = calulateRightBlockX(1);
        let rightBlockY = calulateRightBlockY(1);

        let leftBlock = map.worldMap.blockMap[leftBlockY][leftBlockX];
        let centerBlock = map.worldMap.blockMap[centerBlockY][centerBlockX];
        let rightBlock = map.worldMap.blockMap[rightBlockY][rightBlockX];

        drawBlockAsLeft(leftBlock, 1);// 197, 262);
        drawBlockAsCenter(centerBlock, 1);// 207, 272);
        drawBlockAsRight(rightBlock, 1);// 255, 271);
    }


    function drawBlockAsLeft(block, row /*x, y*/) {
        let wallTextureFacingTowards;
        let wallTextureFacingRight;

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
            context.drawImage(wallTextureFacingTowards, x, y);
        }
        if (wallTextureFacingRight) {
            context.drawImage(wallTextureFacingRight, x, y);
        }
    }

    function drawBlockAsCenter(block, x, y) {
        /*if (map.partyPosition.direction === 'NORTH') {
            context.drawImage(textureMap[block.southWall], x, y);
        }
        else if (map.partyPosition.direction === 'EAST') {
            context.drawImage(textureMap[block.westWall], x, y);
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            context.drawImage(textureMap[block.northWall], x, y);
        }
        else if (map.partyPosition.direction === 'WEST') {
            context.drawImage(textureMap[block.eastWall], x, y);
        }*/
    }

    function drawBlockAsRight(block, x, y) {
        /*if (map.partyPosition.direction === 'NORTH') {
            context.drawImage(textureMap[block.westWall], x, y);
        }
        else if (map.partyPosition.direction === 'EAST') {
            context.drawImage(textureMap[block.northWall], x, y);
        }
        else if (map.partyPosition.direction === 'SOUTH') {
            context.drawImage(textureMap[block.eastWall], x, y);
        }
        else if (map.partyPosition.direction === 'WEST') {
            context.drawImage(textureMap[block.southWall], x, y);
        }*/
    }

    function drawSingleFrontWall() {
        let centerBlockX = calulateCenterBlockX(1);
        let centerBlockY = calulateCenterBlockY(1);
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
