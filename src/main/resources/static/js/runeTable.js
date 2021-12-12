define(['canvas'], function (Canvas) {
    let canvas = new Canvas();

    let returnedModule = function() {
        this.draw = function() {
            let runeWindowColor = Math.random() > 0.5? '#dfe0ff' : '#eff0ff';
            canvas.contextHolder.context.fillStyle = runeWindowColor;
            canvas.contextHolder.context.fillRect(10, 10, 70, 285);
        }
    };

    return returnedModule;

}
);