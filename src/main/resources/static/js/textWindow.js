define(['canvas', 'layout'], function (canvas, layout) {

    let textWindow = function() {
        this.draw = function() {
            const r = layout.LAYOUT.textWindow;
            withClipping(canvas.contextHolder.context, r, () => {
                drawEmpty();
            });
       }
    };

    function withClipping(ctx, rect, drawFn) {
        ctx.save();

        ctx.beginPath();
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.clip();

        drawFn();

        ctx.restore();
    }

    function drawEmpty() {
       const r = layout.LAYOUT.textWindow;
       let runeWindowColor = Math.random() > 0.5? '#dfe0ff' : '#eff0ff';
       canvas.contextHolder.context.fillStyle = runeWindowColor;
       canvas.contextHolder.context.fillRect(
           r.x, r.y, r.width, r.height
       );
    }
    if (!textWindow.instance) {
        textWindow.instance = new textWindow();
    }
    return textWindow.instance;

}
);