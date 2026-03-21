define(['canvas', 'gameState'], function (canvas, gameState) {

    let mainWindow = function() {
        let renderer = null;

        this.setRenderer = function(r) {
            renderer = r;
        };

        this.draw = function(mode) {
            mode.draw(this);
        }

        this.drawRegionalMap = function() {
            renderer.draw();
        };

        this.drawBattle = function(image) {
            drawImageInFullScreen(image);
        };

        this.drawRoom = function(image) {
             drawImageInFullScreen(image);
        };

    };
    if (!mainWindow.instance) {
        mainWindow.instance = new mainWindow();
    }
    return mainWindow.instance;

    function drawImage(image, x, y, scaleX, scaleY, offsetX, widthX) {
        if (offsetX == undefined) {
            offsetX = 0;
        }
        if (widthX == undefined) {
            widthX = image.width;
        }
        canvas.contextHolder.context.resetTransform();
        canvas.contextHolder.context.scale(scaleX, scaleY);
        canvas.contextHolder.context.drawImage(image, offsetX, 0, widthX, image.height, x, y, widthX, image.height);
        canvas.contextHolder.context.resetTransform();
    }

    function drawImageInFullScreen(image) {
        drawImage(image, 130, 15, 0.67, 0.66);
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