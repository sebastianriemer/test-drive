define(['canvas', 'gameState', 'regionalMapDrawingEngine'], function (Canvas, GameState, RegionalMapDrawingEngine) {
    let canvas = new Canvas();
    let gameState = new GameState();
    let regionalMapDrawingEngine = new RegionalMapDrawingEngine();

    let returnedModule = function() {
        this.drawRegionalMap = function(block) {
            regionalMapDrawingEngine.draw();
            printStreetName(block);
        }

        this.drawRoom = function(roomBlock) {
           let roomTexture = gameState.getRoomTexture(roomBlock.center);
           drawRoom(roomTexture, 130, 15, 0.67, 0.66);
           printStreetName(block);
        }
        this.drawFight = function() {
        }
        this.drawDialog = function() {
        }
    };

    return returnedModule;

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
    }

    function printStreetName(block) {
        canvas.contextHolder.context.resetTransform();
        canvas.contextHolder.context.font = "25px metalMania";
        canvas.contextHolder.context.fillStyle = "white";
        canvas.contextHolder.context.textAlign = "center";
        canvas.contextHolder.context.fillText(block.streetName, 220, 297);
    }
}
);