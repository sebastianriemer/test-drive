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

    function drawNearSlice({
        near,
        range,
        camera,
        ctx,
        renderQuad,
        drawNearFloor,
        drawNearCeiling,
        drawNearLeft,
        drawNearRight,
        drawNearFront
    }) {
        // floors
        for (let dx = -range; dx <= range; dx++) {
            drawNearFloor(dx, near, camera, ctx, renderQuad);
        }
        for (let dx = -range; dx <= range; dx++) {
            drawNearCeiling(dx, near, camera, ctx, renderQuad);
        }


        // same correct ordering as normal rows
        for (let dx = -range; dx < 0; dx++) {
            drawNearLeft(dx, near, camera, ctx, renderQuad);
            drawNearRight(dx, near, camera, ctx, renderQuad);
            drawNearFront(dx, near, camera, ctx, renderQuad);
        }

        for (let dx = range; dx > 0; dx--) {
            drawNearLeft(dx, near, camera, ctx, renderQuad);
            drawNearRight(dx, near, camera, ctx, renderQuad);
            drawNearFront(dx, near, camera, ctx, renderQuad);
        }
        drawNearFront(0, near, camera, ctx, renderQuad);
    }

    function drawScene(params) {
        const {
            maxDepth,
            near,
            range
        } = params;

        // FAR → NEAR rows
        for (let dy = maxDepth; dy >= 1; dy--) {
            drawRow({ ...params, dy });
        }

        // NEAREST (special case, but now centralized)
        drawNearSlice(params);
    }

    return {
        drawScene
    };
});