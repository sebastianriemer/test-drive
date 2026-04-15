define(['logger', 'canvas', 'textureManager', 'mapManager', 'projection', 'quadRenderer', 'renderOrder', 'lighting'
], function(log, canvas, textureManager, mapManager, projection, quadRenderer, renderOrder, lighting) {
    const RENDER_MODES = {
        TEXTURED: 'TEXTURED',
        GRID: 'GRID'
    };
    let currentMode = RENDER_MODES.GRID;
    const map = mapManager.regionalMap;
    const CAMERA_OFFSET = 1;
    const RENDER_SETTINGS = {
        scale: 300,
        horizonY: 169,
        stretch: 0.5,
        width: 1.3,
        near: 0.25,
        maxDepth: 10,
        imageSmoothingEnabled: true,
        gridModeEnabled: false,
        playerLightX: 250,
        playerLightY: 315,
        playerLightTime: 0.004,
        playerLightRadius: 305,
        lightingType: 0
    };

    lighting.setRenderSettings(RENDER_SETTINGS);
    lighting.setMode('WORLD');
    //lighting.setType('PLAYER_FLICKER');

    const { PROJ, project, projectRaw } = projection.createProjection(RENDER_SETTINGS);
    const { drawPoint, drawQuad, drawQuadGrid, uvFront, uvLeft, uvRight, uvFloor } = quadRenderer;

    function getRenderQuad() { return currentMode === RENDER_MODES.TEXTURED
            ? drawQuad
            : drawQuadGrid;
    }

    function getBlock(dx, dy, camera) {
        const world = projection.viewToWorld(dx, dy, camera);
        const wx = Math.floor(world.x);
        const wy = Math.floor(world.y);
        return map.mapData.blockMap[wy]?.[wx];
    }

    function buildWallQuad(x, y1, y2) {
        const pA = project(x, y1 + CAMERA_OFFSET);
        const pB = project(x, y2 + CAMERA_OFFSET);
        if (!pA || !pB) return null;

        const h1 = PROJ.scale() / (y1 + CAMERA_OFFSET);
        const h2 = PROJ.scale() / (y2 + CAMERA_OFFSET);

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

        const pA = project(dx-0.5, dy + CAMERA_OFFSET);
        const pB = project(dx+0.5, dy + CAMERA_OFFSET);
        const pC = project(dx+0.5, dy+1 + CAMERA_OFFSET);
        const pD = project(dx-0.5, dy+1 + CAMERA_OFFSET);

        if (!pA || !pB || !pC || !pD) return;
        const quad = {pA, pB, pC, pD};
        renderQuad(ctx, tex, pA, pB, pC, pD,
            tex ? uvFloor(tex.width, tex.height, camera) : null);
        // ✨ apply shading
        let shade = lighting.getShadeFactor(dx, dy, [lighting.getPlayerLight()]);        
        lighting.applyShade(ctx, quad, shade);
    }

    function drawFront(dx, dy, camera, ctx, renderQuad) {
        const block = getBlock(dx, dy, camera);
        if (!block) return;

        const wall = projection.getWall(block, camera, 'FRONT');
        if (!wall) return;

        let tex = textureManager.getWallTextureWithFallback(wall);
        if (!tex) return;

        const pA = project(dx-0.5, dy + CAMERA_OFFSET);
        const pB = project(dx+0.5, dy + CAMERA_OFFSET);
        if (!pA || !pB) return;

        const h = PROJ.scale() / (dy + CAMERA_OFFSET);

        const pC = { x: pB.x, y: pB.y - h };
        const pD = { x: pA.x, y: pA.y - h };
        const quad = { pA, pB, pC, pD };
        renderQuad(ctx, tex, pA, pB, pC, pD,
            tex ? uvFront(tex.width, tex.height) : null
        );
        // ✨ apply shading
        let shade = lighting.getShadeFactor(dx, dy, [lighting.getPlayerLight()]);
        lighting.applyShade(ctx, quad, shade);
    }

    function drawLeft(dx, dy, camera, ctx, renderQuad) {
        const block = getBlock(dx, dy, camera);
        if (!block) return;

        const wall = projection.getWall(block, camera, 'LEFT');
        if (!wall) return;
        let tex = textureManager.getWallTextureWithFallback(wall);
        if (!tex) return;

        const quad = buildWallQuad(dx-0.5, dy, dy+1);
        if (!quad) return;

        renderQuad(ctx, tex, quad.pA, quad.pB, quad.pC, quad.pD,
            tex ? uvLeft(tex.width, tex.height) : null);
        // ✨ apply shading
        let shade = lighting.getShadeFactor(dx, dy, [lighting.getPlayerLight()]);
        lighting.applyShade(ctx, quad, shade);
    }

    function drawRight(dx, dy, camera, ctx, renderQuad) {
        const block = getBlock(dx, dy, camera);
        if (!block) return;

        const wall = projection.getWall(block, camera, 'RIGHT');
        if (!wall) return;
        let tex = textureManager.getWallTextureWithFallback(wall);
        if (!tex) return;

        const quad = buildWallQuad(dx+0.5, dy, dy+1);
        if (!quad) return;

        renderQuad(ctx, tex, quad.pA, quad.pB, quad.pC, quad.pD,
            tex ? uvRight(tex.width, tex.height) : null);
        // ✨ apply shading
        let shade = lighting.getShadeFactor(dx, dy, [lighting.getPlayerLight()]);
        lighting.applyShade(ctx, quad, shade);
    }

    function drawCeiling(dx, dy, camera, ctx, renderQuad) {
        //return;
        const block = getBlock(dx, dy, camera);
        if (!block) return;

        const tex = textureManager.getCeilingTexture?.(block.ceiling?.texture);
        if (!tex && currentMode === RENDER_MODES.TEXTURED) return;

        const pA = project(dx-0.5, dy + CAMERA_OFFSET);
        const pB = project(dx+0.5, dy + CAMERA_OFFSET);
        const pC = project(dx+0.5, dy+1 + CAMERA_OFFSET);
        const pD = project(dx-0.5, dy+1 + CAMERA_OFFSET);

        if (!pA || !pB || !pC || !pD) return;

        const hNear = PROJ.scale() / (dy + CAMERA_OFFSET);
        const hFar  = PROJ.scale() / (dy + 1 + CAMERA_OFFSET);

        const quad = {
            pA: { x: pA.x, y: pA.y - hNear },
            pB: { x: pB.x, y: pB.y - hNear },
            pC: { x: pC.x, y: pC.y - hFar },
            pD: { x: pD.x, y: pD.y - hFar }
        };
        renderQuad(ctx, tex, quad.pA, quad.pB, quad.pC, quad.pD,
            tex ? uvFloor(tex.width, tex.height, camera) : null
        );
        // ✨ apply shading
        let shade = lighting.getShadeFactor(dx, dy, [lighting.getPlayerLight()]);
        lighting.applyShade(ctx, quad, shade);

    }

    const renderer = {
        draw: function() {
            const ctx = canvas.contextHolder.context;

            const camera = {
                x: map.partyPosition.x,
                y: map.partyPosition.y,
                direction: map.partyPosition.direction
            };

            const renderQuad = getRenderQuad();

            ctx.resetTransform();
            ctx.fillStyle="#000";
            ctx.fillRect(0,0,500,300);

            ctx.fillStyle=map.skyColor;
            ctx.fillRect(0,0,500,PROJ.horizonY());

            ctx.fillStyle=map.floorColor;
            ctx.fillRect(0,PROJ.horizonY(),500,200);

            const testProj = projectRaw(0, RENDER_SETTINGS.maxDepth+1);
            this.setMode(RENDER_SETTINGS.gridModeEnabled
                ? renderer.modes.GRID
                : renderer.modes.TEXTURED
                );
            PROJ.yOffset = testProj ? (PROJ.horizonY()-testProj.y) : 0;

            // ✅ ORIGINAL LOOP (no nearest row)
            //for (let dy = RENDER_SETTINGS.maxDepth; dy >= 0; dy--) {
                //log.debug('Render dy:', dy);
                renderOrder.drawScene({
                    maxDepth: RENDER_SETTINGS.maxDepth,
                    near: RENDER_SETTINGS.near,
                    range: 6,

                    camera,
                    ctx,
                    renderQuad,

                    drawFloor,
                    drawCeiling,
                    drawLeft,
                    drawRight,
                    drawFront,

                });
            //}
            lighting.renderLighting(ctx, camera);
        },

        setMode: function(mode) {
            currentMode = mode;
        },

        modes: RENDER_MODES,
        settings: RENDER_SETTINGS
    };

    return renderer;
});