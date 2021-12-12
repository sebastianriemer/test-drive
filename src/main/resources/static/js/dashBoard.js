define(['canvas'], function (Canvas) {
    let canvas = new Canvas();

    let returnedModule = function() {
        this.draw = function() {
            let dashBoardColor = Math.random() > 0.5? '#ae6447' : '#af6548';
            // oberer Rand
            canvas.contextHolder.context.fillStyle = dashBoardColor;
            canvas.contextHolder.context.fillRect(0, 0, 640, 10);
            // linker Rand
            canvas.contextHolder.context.fillStyle = dashBoardColor;
            canvas.contextHolder.context.fillRect(0, 0, 10, 370);
            // rechter Rand
            canvas.contextHolder.context.fillRect(630, 0, 10, 470);

            // Rahmen um MainWindow
            canvas.contextHolder.context.fillRect(80, 10, 10, 295);
            canvas.contextHolder.context.fillRect(355, 10, 10, 295);
            canvas.contextHolder.context.fillRect(0, 295, 640, 10);

            // Kasten für Text unter mainWindow
            canvas.contextHolder.context.fillRect(90, 275, 265, 30);

            canvas.contextHolder.context.fillRect(0, 370, 640, 10);
            canvas.contextHolder.context.fillRect(0, 460, 640, 10);

        }
    };

    return returnedModule;

}
);