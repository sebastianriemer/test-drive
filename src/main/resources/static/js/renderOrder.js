define(['logger'], function(log) {

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
            log.debug('drawFloor:', dx, dy);
            drawFloor(dx, dy, camera, ctx, renderQuad);
        }
        for (let dx = -range; dx <= range; dx++) {
            log.debug('drawCeiling:', dx, dy);
            drawCeiling(dx, dy, camera, ctx, renderQuad);
        }

        // LEFT → CENTER
        for (let dx = -range; dx < 0; dx++) {
            log.debug('drawLeft:', dx, dy);
            drawLeft(dx, dy, camera, ctx, renderQuad);
            log.debug('drawRight:', dx, dy);
            drawRight(dx, dy, camera, ctx, renderQuad);
            log.debug('drawFront:', dx, dy);
            drawFront(dx, dy, camera, ctx, renderQuad);
        }

        // RIGHT → CENTER
        for (let dx = range; dx > 0; dx--) {
            log.debug('drawLeft:', dx, dy);
            drawLeft(dx, dy, camera, ctx, renderQuad);
            log.debug('drawRight:', dx, dy);
            drawRight(dx, dy, camera, ctx, renderQuad);
            log.debug('drawFront:', dx, dy);
            drawFront(dx, dy, camera, ctx, renderQuad);
        }
        log.debug('drawFront:', 0, dy);
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