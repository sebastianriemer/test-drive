define(['canvas', 'gameState', 'regionalWorldDrawingEngine'], function (canvas, gameState, regionalWorldDrawingEngine) {
    //let canvas = new Canvas();
    //let gameState = new GameState();
    //let regionalWorldDrawingEngine = new RegionalWorldDrawingEngine();

    let mainWindow = function() {
        this.drawRegionalMap = function(block) {
            regionalWorldDrawingEngine.draw();
            printStreetName(block);
            drawDebugMap();
            drawDebugBattleMap();
        }

        this.drawRoom = function(roomBlock) {
           let roomTexture = gameState.getRoomTexture(roomBlock.center);
           drawRoom(roomTexture, 130, 15, 0.67, 0.66);
           printStreetName(roomBlock);
        }
        this.drawBattle = function(roomBlock) {
          let battleTexture = gameState.getBattleTexture(roomBlock.center);
          drawBattle(battleTexture, 130, 15, 0.67, 0.66);
          printBattleText();
        }
        this.drawDialog = function() {
        }
    };

    if (!mainWindow.instance) {
        mainWindow.instance = new mainWindow();
    }
    return mainWindow.instance;

    function drawRoom(texture, x, y, scaleX, scaleY, offsetX, widthX) {
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
        drawDebugMap();
        drawDebugBattleMap();
    }

    function drawBattle(texture, x, y, scaleX, scaleY, offsetX, widthX) {
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
        drawDebugMap();
        drawDebugBattleMap();
    }

    function drawDebugMap() {
        if (gameState.regionalMap.mapImage) {
            canvas.contextHolder.mapDebugContext.drawImage(gameState.regionalMap.mapImage, 0, 0, 69*4, 69*4);
            drawPartyPositionOnMap(canvas.contextHolder.mapDebugContext);
        }
    }
    function drawDebugBattleMap() {
        if (gameState.battleMap.mapImage) {
            canvas.contextHolder.mapDebugContext2.drawImage(gameState.battleMap.mapImage, 0, 0, 69*4, 69*4);
            drawPartyPositionOnMap(canvas.contextHolder.mapDebugContext2);
        }
    }

    function drawPartyPositionOnMap(mapDebugContext) {
        mapDebugContext.fillStyle = '#E200BD';
        mapDebugContext.fillRect(gameState.regionalMap.partyPosition.x*3*4, gameState.regionalMap.partyPosition.y*3*4, 3*4, 3*4);
    }

    function printStreetName(block) {
        printTextBelowMainWindow(block.streetName);
    }
    function printBattleText() {
        printTextBelowMainWindow('Kampf')
    }

    function printTextBelowMainWindow(text) {
        canvas.contextHolder.context.resetTransform();
        canvas.contextHolder.context.font = "25px metalMania";
        canvas.contextHolder.context.textAlign = "center";

        canvas.contextHolder.context.fillStyle = '#ffd800';
        canvas.contextHolder.context.strokeStyle = '#000000';

        canvas.contextHolder.context.fillText(text, 220, 297);
        canvas.contextHolder.context.strokeText(text, 220, 297);

        canvas.contextHolder.context.fill();
        canvas.contextHolder.context.stroke();
    }
}
);