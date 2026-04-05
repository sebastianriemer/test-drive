define([], function() {

    function drawRow({
        dy,
        range,
        camera,
        ctx,
        renderQuad,
        drawFloor,
        drawCeiling,
        drawLeft,
        drawRight,
        drawFront
    }) {
        // Floors
        for (let dx = -range; dx <= range; dx++) {
            drawFloor(dx, dy, camera, ctx, renderQuad);
        }
        for (let dx = -range; dx <= range; dx++) {
            drawCeiling(dx, dy, camera, ctx, renderQuad);
        }

        // LEFT → CENTER
        for (let dx = -range; dx < 0; dx++) {
            drawLeft(dx, dy, camera, ctx, renderQuad);
            drawRight(dx, dy, camera, ctx, renderQuad);
            drawFront(dx, dy, camera, ctx, renderQuad);
        }

        // RIGHT → CENTER
        for (let dx = range; dx > 0; dx--) {
            drawLeft(dx, dy, camera, ctx, renderQuad);
            drawRight(dx, dy, camera, ctx, renderQuad);
            drawFront(dx, dy, camera, ctx, renderQuad);
        }
        drawFront(0, dy, camera, ctx, renderQuad);
    }



    function drawScene(params) {
        const {
            maxDepth,
            near,
            range
        } = params;

        // FAR → NEAR rows
        for (let dy = maxDepth; dy >= 0; dy--) {
            drawRow({ ...params, dy });
        }

    }

    return {
        drawScene
    };
});