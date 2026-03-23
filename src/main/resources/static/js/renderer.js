define([
    'canvas',
    'textureManager',
    'mapManager',
    'projection',
    'quadRenderer',
    'renderOrder'
], function(canvas, textureManager, mapManager, projectionModule, quadRenderer,renderOrder){

    const map = mapManager.regionalMap;

    const RENDER_SETTINGS = {
        scale: 114,
        horizonY: 169,
        stretch: 0.55,
        width: 1.3,
        near: 0.25,
        maxDepth: 4,
        imageSmoothingEnabled: true,
        gridModeEnabled: false
    };

    const RENDER_MODES = {
        TEXTURED: 'TEXTURED',
        GRID: 'GRID'
    };

    let currentMode = RENDER_MODES.GRID;

    const { PROJ, project, projectRaw, viewToWorld, getWall } =
        projectionModule.createProjection(RENDER_SETTINGS);

    const { drawQuad, drawQuadGrid, uvFront, uvLeft, uvRight, uvFloor } = quadRenderer;

    function getRenderQuad() {
        return currentMode === RENDER_MODES.TEXTURED
            ? drawQuad
            : drawQuadGrid;
    }

    function getBlock(dx, dy, camera) {
        const world = viewToWorld(dx, dy, camera);
        const wx = Math.floor(world.x);
        const wy = Math.floor(world.y);
        return map.mapData.blockMap[wy]?.[wx];
    }

    function buildWallQuad(x, y1, y2) {
        const pA = project(x, y1);
        const pB = project(x, y2);
        if (!pA || !pB) return null;

        const h1 = PROJ.scale() / y1;
        const h2 = PROJ.scale() / y2;

        return {
            pA,
            pB,
            pC: { x: pB.x, y: pB.y - h2 },
            pD: { x: pA.x, y: pA.y - h1 }
        };
    }

    function drawFloor(dx, dy, camera, ctx, renderQuad) {
        const block = getBlock(dx, dy, camera);
        if (!block) return;

        const tex = textureManager.getFloorTexture(block.floor.texture);
        if (!tex && currentMode === RENDER_MODES.TEXTURED) return;

        const pA = project(dx-0.5, dy);
        const pB = project(dx+0.5, dy);
        const pC = project(dx+0.5, dy+1);
        const pD = project(dx-0.5, dy+1);

        if (!pA || !pB || !pC || !pD) return;

        renderQuad(ctx, tex, pA,pB,pC,pD,
            tex ? uvFloor(tex.width, tex.height) : null);
    }

    function drawFront(dx, dy, camera, ctx, renderQuad) {
        const block = getBlock(dx, dy, camera);
        if (!block) return;

        const wall = getWall(block, camera, 'FRONT');
        if (!wall) return;
        canvas.contextHolder.mapDebugContext.fillStyle = '#FFF200';
        canvas.contextHolder.mapDebugContext.fillRect(
                block.x*3*2,
                block.y*3*2,
                3*2,
                3*2);
        const tex = textureManager.getWallTexture(wall.texture);
        if (!tex && currentMode === RENDER_MODES.TEXTURED) return;

        const pA = project(dx-0.5, dy);
        const pB = project(dx+0.5, dy);
        if (!pA || !pB) return;

        const h = PROJ.scale() / dy;

        const pC = { x: pB.x, y: pB.y - h };
        const pD = { x: pA.x, y: pA.y - h };

        renderQuad(ctx, tex, pA,pB,pC,pD,
            tex ? uvFront(tex.width, tex.height) : null);
    }

    function drawLeft(dx, dy, camera, ctx, renderQuad) {
        const block = getBlock(dx, dy, camera);
        if (!block) return;

        const wall = getWall(block, camera, 'LEFT');
        if (!wall) return;
        canvas.contextHolder.mapDebugContext.fillStyle = '#DDF2DD';
        canvas.contextHolder.mapDebugContext.fillRect(
                block.x*3*2,
                block.y*3*2,
                3*2,
                3*2);
        const tex = textureManager.getWallTexture(wall.texture);
        if (!tex && currentMode === RENDER_MODES.TEXTURED) return;

        const quad = buildWallQuad(dx-0.5, dy, dy+1);
        if (!quad) return;

        renderQuad(ctx, tex, quad.pA, quad.pB, quad.pC, quad.pD,
            tex ? uvLeft(tex.width, tex.height) : null);
    }

    function drawRight(dx, dy, camera, ctx, renderQuad) {
        const block = getBlock(dx, dy, camera);
        if (!block) return;

        const wall = getWall(block, camera, 'RIGHT');
        if (!wall) return;
        canvas.contextHolder.mapDebugContext.fillStyle = '#AAAA00';
        canvas.contextHolder.mapDebugContext.fillRect(
                block.x*3*2,
                block.y*3*2,
                3*2,
                3*2);
        const tex = textureManager.getWallTexture(wall.texture);
        if (!tex && currentMode === RENDER_MODES.TEXTURED) return;

        const quad = buildWallQuad(dx+0.5, dy, dy+1);
        if (!quad) return;

        renderQuad(ctx, tex, quad.pA, quad.pB, quad.pC, quad.pD,
            tex ? uvRight(tex.width, tex.height) : null);
    }

    function drawNearFloor(dx, near, camera, ctx, renderQuad) {
        const block = getBlock(dx, 0, camera); // first real row
        if (!block) return;

        const tex = textureManager.getFloorTexture(block.floor.texture);
        if (!tex && currentMode === RENDER_MODES.TEXTURED) return;

        const pA = project(dx-0.5, near);
        const pB = project(dx+0.5, near);
        const pC = project(dx+0.5, 1);
        const pD = project(dx-0.5, 1);

        if (!pA || !pB || !pC || !pD) return;

        renderQuad(ctx, tex, pA, pB, pC, pD,
            tex ? uvFloor(tex.width, tex.height) : null);
    }

    function drawNearFront(dx, near, camera, ctx, renderQuad) {
        const block = getBlock(dx, 0, camera);
        if (!block) return;

        const wall = getWall(block, camera, 'FRONT');
        if (!wall) return;
        canvas.contextHolder.mapDebugContext.fillStyle = '#FFAA00';
        canvas.contextHolder.mapDebugContext.fillRect(
                block.x*3*2,
                block.y*3*2,
                3*2,
                3*2);
        const tex = textureManager.getWallTexture(wall.texture);
        if (!tex && currentMode === RENDER_MODES.TEXTURED) return;

        const pA = project(dx-0.5, near);
        const pB = project(dx+0.5, near);

        if (!pA || !pB) return;

        const h = PROJ.scale() / near;

        const pC = { x: pB.x, y: pB.y - h };
        const pD = { x: pA.x, y: pA.y - h };

        renderQuad(ctx, tex, pA, pB, pC, pD,
            tex ? uvFront(tex.width, tex.height) : null);
    }

    function drawNearLeft(dx, near, camera, ctx, renderQuad) {
        const block = getBlock(dx, 0, camera);
        if (!block) return;

        const wall = getWall(block, camera, 'LEFT');
        if (!wall) return;
        canvas.contextHolder.mapDebugContext.fillStyle = '#AAF200';
        canvas.contextHolder.mapDebugContext.fillRect(
                block.x*3*2,
                block.y*3*2,
                3*2,
                3*2);
        const tex = textureManager.getWallTexture(wall.texture);
        if (!tex && currentMode === RENDER_MODES.TEXTURED) return;

        const quad = buildWallQuad(dx-0.5, near, 1);
        if (!quad) return;

        renderQuad(ctx, tex, quad.pA, quad.pB, quad.pC, quad.pD,
            tex ? uvLeft(tex.width, tex.height) : null);
    }

    function drawNearRight(dx, near, camera, ctx, renderQuad) {
        const block = getBlock(dx, 0, camera);
        if (!block) return;

        const wall = getWall(block, camera, 'RIGHT');
        if (!wall) return;
        canvas.contextHolder.mapDebugContext.fillStyle = '#CCF200';
        canvas.contextHolder.mapDebugContext.fillRect(
                block.x*3*2,
                block.y*3*2,
                3*2,
                3*2);
        const tex = textureManager.getWallTexture(wall.texture);
        if (!tex && currentMode === RENDER_MODES.TEXTURED) return;

        const quad = buildWallQuad(dx+0.5, near, 1);
        if (!quad) return;

        renderQuad(ctx, tex, quad.pA, quad.pB, quad.pC, quad.pD,
            tex ? uvRight(tex.width, tex.height) : null);
    }

    const renderer = {
        draw: function(){
            const ctx = canvas.contextHolder.context;

            const camera = {
                x: map.partyPosition.x,
                y: map.partyPosition.y,
                dir: map.partyPosition.direction
            };

            const renderQuad = getRenderQuad();

            ctx.resetTransform();
            ctx.fillStyle="#000"; ctx.fillRect(0,0,500,300);

            ctx.fillStyle="#6fc9f9"; ctx.fillRect(0,0,500,PROJ.horizonY());
            ctx.fillStyle="#c9a24e"; ctx.fillRect(0,PROJ.horizonY(),500,200);

            const testProj = projectRaw(0, RENDER_SETTINGS.maxDepth+1);
            this.setMode(RENDER_SETTINGS.gridModeEnabled
                ? renderer.modes.GRID
                : renderer.modes.TEXTURED
                );
            PROJ.yOffset = testProj ? (PROJ.horizonY()-testProj.y) : 0;

            // ✅ ORIGINAL LOOP (no nearest row)
            for (let dy = RENDER_SETTINGS.maxDepth; dy >= 1; dy--) {
                renderOrder.drawScene({
                    maxDepth: RENDER_SETTINGS.maxDepth,
                    near: RENDER_SETTINGS.near,
                    range: 6,

                    camera,
                    ctx,
                    renderQuad,

                    drawFloor,
                    drawLeft,
                    drawRight,
                    drawFront,

                    drawNearFloor,
                    drawNearLeft,
                    drawNearRight,
                    drawNearFront
                });
            }
        },

        setMode: function(mode) {
            currentMode = mode;
        },

        modes: RENDER_MODES,
        settings: RENDER_SETTINGS
    };

    return renderer;
});