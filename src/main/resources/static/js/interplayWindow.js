define(['canvas', 'layout'], function (canvas, layout) {
    //let canvas = new Canvas();

    let interplayWindow = function() {
        this.draw = function() {
            const r = layout.LAYOUT.interplayWindow;
            withClipping(canvas.contextHolder.context, r, () => {
                let runeWindowColor = Math.random() > 0.5? '#dfe0ff' : '#dfe0ff';
                canvas.contextHolder.context.fillStyle = runeWindowColor;
                canvas.contextHolder.context.fillRect(
                    r.x, r.y, r.width, r.height
                );
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

    if (!interplayWindow.instance) {
        interplayWindow.instance = new interplayWindow();
    }
    return interplayWindow.instance;

}
);