define(['canvas'], function (canvas) {

    let textWindow = function() {
        this.draw = function() {
            drawEmpty();
       }
    };

    function drawEmpty() {
       let textWindowColor = Math.random() > 0.5? '#d48161' : '#d58262';
       canvas.contextHolder.context.fillStyle = textWindowColor;
       canvas.contextHolder.context.fillRect(365, 10, 265, 285);
    }
    if (!textWindow.instance) {
        textWindow.instance = new textWindow();
    }
    return textWindow.instance;

}
);