define(['canvas'], function (Canvas) {
    let canvas = new Canvas();

    let returnedModule = function() {
        this.draw = function() {
            let sideBoardColor = Math.random() > 0.5? '#ae6447' : '#af6548';
            // oberer Rand
            canvas.contextHolder.context.fillStyle = sideBoardColor;
            canvas.contextHolder.context.fillRect(0, 0, 640, 10);
            // linker Rand
            canvas.contextHolder.context.fillStyle = sideBoardColor;
            canvas.contextHolder.context.fillRect(0, 0, 10, 370);
            // rechter Rand
            canvas.contextHolder.context.fillStyle = sideBoardColor;
            canvas.contextHolder.context.fillRect(630, 0, 10, 470);
            // Rand zwischen Rune und Main
            canvas.contextHolder.context.fillStyle = sideBoardColor;
            canvas.contextHolder.context.fillRect(80, 10, 10, 275);
            // Rand zwischen Main und Text
            canvas.contextHolder.context.fillStyle = sideBoardColor;
            canvas.contextHolder.context.fillRect(355, 10, 10, 275);
            canvas.contextHolder.context.fillStyle = sideBoardColor;
            canvas.contextHolder.context.fillRect(0, 275, 640, 10);
            canvas.contextHolder.context.fillStyle = sideBoardColor;
            canvas.contextHolder.context.fillRect(0, 370, 640, 10);
            canvas.contextHolder.context.fillRect(0, 460, 640, 10);
        }
    };

    return returnedModule;

}
);