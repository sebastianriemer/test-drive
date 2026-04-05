define([
    'canvas',
    'textureManager',
    'mapManager',
    'projection',
    'quadRenderer',
    'renderOrder'
], function(canvas, textureManager, mapManager, projection, quadRenderer,renderOrder){

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

    const { PROJ, project, projectRaw } =
        projection.createProjection(RENDER_SETTINGS);

    const { drawPoint, drawQuad, drawQuadGrid, uvFront, uvLeft, uvRight, uvFloor } = quadRenderer;

    function getShadeFactor(distance) {
        const max = RENDER_SETTINGS.maxDepth;
        let shadeFactor = Math.max(0.2, 1 - (distance / max));
        return shadeFactor;
    }

    function applyShade(ctx, quad, shade) {
        ctx.save();

        ctx.globalAlpha = 1 - shade; // darker = more alpha
        ctx.fillStyle = "#000";

        ctx.beginPath();
        ctx.moveTo(quad.pA.x, quad.pA.y);
        ctx.lineTo(quad.pB.x, quad.pB.y);
        ctx.lineTo(quad.pC.x, quad.pC.y);
        ctx.lineTo(quad.pD.x, quad.pD.y);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    function getRenderQuad() {
        return currentMode === RENDER_MODES.TEXTURED
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
        const quad = {pA, pB, pC, pD};
        renderQuad(ctx, tex, pA, pB, pC, pD,
            tex ? uvFloor(tex.width, tex.height, camera) : null);
        // ✨ apply shading
        const shade = getShadeFactor(dy);
        applyShade(ctx, quad, shade);
    }


    function getWallTextureRef(wall) {
        if (wall.textureSet == null || wall.textureIndex == null) {
            return null;
        }

        return {
            set: wall.textureSet,
            index: wall.textureIndex
        };
    }
    function getWallTextureWithFallback(wall) {
        let tex = textureManager.getWallTexture(getWallTextureRef(wall));
        if (!tex && currentMode === RENDER_MODES.TEXTURED) {
            if (wall.solid) {
                tex = textureManager.getWallTexture({ set: 9, index: 0 });
            } else {
                return;
            }
        }
        return tex;
    }

    function drawFront(dx, dy, camera, ctx, renderQuad) {
        const block = getBlock(dx, dy, camera);
        if (!block) return;

        const wall = projection.getWall(block, camera, 'FRONT');
        if (!wall) return;

        let tex = getWallTextureWithFallback(wall);
        if (!tex) return;

        const pA = project(dx-0.5, dy);
        const pB = project(dx+0.5, dy);
        if (!pA || !pB) return;

        const h = PROJ.scale() / dy;

        const pC = { x: pB.x, y: pB.y - h };
        const pD = { x: pA.x, y: pA.y - h };
        const quad = { pA, pB, pC, pD };
        renderQuad(ctx, tex, pA, pB, pC, pD,
            tex ? uvFront(tex.width, tex.height) : null
        );
        // ✨ apply shading
        const shade = getShadeFactor(dy);
        applyShade(ctx, quad, shade);
    }

    function drawLeft(dx, dy, camera, ctx, renderQuad) {
        const block = getBlock(dx, dy, camera);
        if (!block) return;

        const wall = projection.getWall(block, camera, 'LEFT');
        if (!wall) return;
        let tex = getWallTextureWithFallback(wall);
        if (!tex) return;

        const quad = buildWallQuad(dx-0.5, dy, dy+1);
        if (!quad) return;

        renderQuad(ctx, tex, quad.pA, quad.pB, quad.pC, quad.pD,
            tex ? uvLeft(tex.width, tex.height) : null);
        // ✨ apply shading
        const shade = getShadeFactor(dy);
        applyShade(ctx, quad, shade);
    }

    function drawRight(dx, dy, camera, ctx, renderQuad) {
        const block = getBlock(dx, dy, camera);
        if (!block) return;

        const wall = projection.getWall(block, camera, 'RIGHT');
        if (!wall) return;
        let tex = getWallTextureWithFallback(wall);
        if (!tex) return;

        const quad = buildWallQuad(dx+0.5, dy, dy+1);
        if (!quad) return;

        renderQuad(ctx, tex, quad.pA, quad.pB, quad.pC, quad.pD,
            tex ? uvRight(tex.width, tex.height) : null);
        // ✨ apply shading
        const shade = getShadeFactor(dy);
        applyShade(ctx, quad, shade);
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
        const quad = { pA, pB, pC, pD };
        renderQuad(ctx, tex, pA, pB, pC, pD,
            tex ? uvFloor(tex.width, tex.height, camera) : null);
        // ✨ apply shading
        const shade = getShadeFactor(near);
        applyShade(ctx, quad, shade);
    }


    function drawCeiling(dx, dy, camera, ctx, renderQuad) {
        //return;
        const block = getBlock(dx, dy, camera);
        if (!block) return;

        const tex = textureManager.getCeilingTexture?.(block.ceiling?.texture);
        if (!tex && currentMode === RENDER_MODES.TEXTURED) return;

        const pA = project(dx-0.5, dy);
        const pB = project(dx+0.5, dy);
        const pC = project(dx+0.5, dy+1);
        const pD = project(dx-0.5, dy+1);

        if (!pA || !pB || !pC || !pD) return;

        // 👇 flip vertically relative to horizon
        const flipY = (p) => ({
            x: p.x,
            y: PROJ.horizonY() - (p.y - PROJ.horizonY())
        });

        /*const quad = {
            pA: flipY(pA),
            pB: flipY(pB),
            pC: flipY(pC),
            pD: flipY(pD)
        };*/
        const hNear = PROJ.scale() / dy;
        const hFar  = PROJ.scale() / (dy + 1);

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
        const shade = getShadeFactor(dy);
        applyShade(ctx, quad, shade);
    }

function drawNearCeiling(dx, near, camera, ctx, renderQuad) {
    const block = getBlock(dx, 0, camera);
    if (!block) return;

    const tex = textureManager.getCeilingTexture?.(block.ceiling?.texture);
    if (!tex && currentMode === RENDER_MODES.TEXTURED) return;

    // --- near edge (same as drawNearFront top) ---
    const pNearA = project(dx - 0.5, near);
    const pNearB = project(dx + 0.5, near);

    if (!pNearA || !pNearB) return;

    const hNear = PROJ.scale() / near;

    const nearTopLeft  = { x: pNearA.x, y: pNearA.y - hNear };
    const nearTopRight = { x: pNearB.x, y: pNearB.y - hNear };

    // --- far edge (same as drawFront at depth = 1) ---
    const pFarA = project(dx - 0.5, 1);
    const pFarB = project(dx + 0.5, 1);

    if (!pFarA || !pFarB) return;

    const hFar = PROJ.scale() / 1;

    const farTopLeft  = { x: pFarA.x, y: pFarA.y - hFar };
    const farTopRight = { x: pFarB.x, y: pFarB.y - hFar };

    // --- build ceiling quad from wall tops ---
    const quad = {
        pA: nearTopLeft,
        pB: nearTopRight,
        pC: farTopRight,
        pD: farTopLeft
    };

    renderQuad(
        ctx,
        tex,
        quad.pA,
        quad.pB,
        quad.pC,
        quad.pD,
        tex ? uvFloor(tex.width, tex.height, camera) : null
    );

    const shade = getShadeFactor(near);
    applyShade(ctx, quad, shade);
}

function drawNearCeiling3(dx, near, camera, ctx, renderQuad) {
    const block = getBlock(dx, 0, camera);
    if (!block) return;

    const tex = textureManager.getCeilingTexture?.(block.ceiling?.texture);
    if (!tex && currentMode === RENDER_MODES.TEXTURED) return;

    // depths of the first real tile
    const d0 = 1;
    const d1 = 2;

    // interpolation factor (near is between 0..1)
    const t = near; // e.g. 0.25

    // helper: interpolate between two projected points
    function interp(p0, p1) {
        return {
            x: p0.x + (p1.x - p0.x) * (t - 1),
            y: p0.y + (p1.y - p0.y) * (t - 1)
        };
    }

    // project the "real" slices
    const p0A = project(dx - 0.5, d0);
    const p0B = project(dx + 0.5, d0);
    const p0C = project(dx + 0.5, d1);
    const p0D = project(dx - 0.5, d1);

    const p1A = project(dx - 0.5, d1);
    const p1B = project(dx + 0.5, d1);
    const p1C = project(dx + 0.5, d1 + 1);
    const p1D = project(dx - 0.5, d1 + 1);

    if (!p0A || !p0B || !p0C || !p0D) return;
    if (!p1A || !p1B || !p1C || !p1D) return;

    // interpolate near slice
    const pA = interp(p0A, p1A);
    const pB = interp(p0B, p1B);
    const pC = interp(p0C, p1C);
    const pD = interp(p0D, p1D);

    // correct ceiling heights (same as walls)
    const hNear = PROJ.scale() / near;
    const hFar  = PROJ.scale() / (near + 1);

    const quad = {
        pA: { x: pA.x, y: pA.y - hNear },
        pB: { x: pB.x, y: pB.y - hNear },
        pC: { x: pC.x, y: pC.y - hFar },
        pD: { x: pD.x, y: pD.y - hFar }
    };

    renderQuad(
        ctx,
        tex,
        quad.pA,
        quad.pB,
        quad.pC,
        quad.pD,
        tex ? uvFloor(tex.width, tex.height, camera) : null
    );

    const shade = getShadeFactor(near);
    applyShade(ctx, quad, shade);
}

function drawNearCeiling2(dx, near, camera, ctx, renderQuad) {
    const block = getBlock(dx, 0, camera);
    if (!block) return;

    const tex = textureManager.getCeilingTexture?.(block.ceiling?.texture);
    if (!tex && currentMode === RENDER_MODES.TEXTURED) return;

    // --- correct X from projection ---
    const pA0 = project(dx - 0.5, near);
    const pB0 = project(dx + 0.5, near);
    const pC0 = project(dx + 0.5, near + 1);
    const pD0 = project(dx - 0.5, near + 1);

    if (!pA0 || !pB0 || !pC0 || !pD0) return;

    // --- reference depths for Y correction ---
    const p1A = project(dx - 0.5, 1);
    const p2A = project(dx - 0.5, 2);
    const p1B = project(dx + 0.5, 1);
    const p2B = project(dx + 0.5, 2);

    const p1C = project(dx + 0.5, 1);
    const p2C = project(dx + 0.5, 2);
    const p1D = project(dx - 0.5, 1);
    const p2D = project(dx - 0.5, 2);

    if (!p1A || !p2A || !p1B || !p2B) return;

    // --- fix ONLY Y using forward extrapolation ---
    function fixY(p1, p2, nearDepth) {
        const dy = p1.y - p2.y; // direction toward camera
        return p1.y + dy * (1 - nearDepth);
    }

    const hNear = PROJ.scale() / near;
    const hFar  = PROJ.scale() / (near + 1);

    const quad = {
        pA: { x: pA0.x, y: fixY(p1A, p2A, near) - hNear },
        pB: { x: pB0.x, y: fixY(p1B, p2B, near) - hNear },
        pC: { x: pC0.x, y: fixY(p1C, p2C, near) - hFar },
        pD: { x: pD0.x, y: fixY(p1D, p2D, near) - hFar }
    };

    renderQuad(
        ctx,
        tex,
        quad.pA,
        quad.pB,
        quad.pC,
        quad.pD,
        tex ? uvFloor(tex.width, tex.height, camera) : null
    );

    const shade = getShadeFactor(near);
    applyShade(ctx, quad, shade);
}

    function drawNearFront(dx, near, camera, ctx, renderQuad) {
        const block = getBlock(dx, 0, camera);
        if (!block) return;

        const wall = projection.getWall(block, camera, 'FRONT');
        if (!wall) return;
        let tex = getWallTextureWithFallback(wall);
        if (!tex) return;

        const pA = project(dx-0.5, near);
        const pB = project(dx+0.5, near);

        if (!pA || !pB) return;

        const h = PROJ.scale() / near;

        const pC = { x: pB.x, y: pB.y - h };
        const pD = { x: pA.x, y: pA.y - h };
        const quad = { pA, pB, pC, pD };
        renderQuad(ctx, tex, pA, pB, pC, pD,
            tex ? uvFront(tex.width, tex.height) : null);
        // ✨ apply shading
        const shade = getShadeFactor(near);
        applyShade(ctx, quad, shade);
    }

    function drawNearLeft(dx, near, camera, ctx, renderQuad) {
        const block = getBlock(dx, 0, camera);
        if (!block) return;

        const wall = projection.getWall(block, camera, 'LEFT');
        if (!wall) return;
        let tex = getWallTextureWithFallback(wall);
        if (!tex) return;

        const quad = buildWallQuad(dx-0.5, near, 1);
        if (!quad) return;

        renderQuad(ctx, tex, quad.pA, quad.pB, quad.pC, quad.pD,
            tex ? uvLeft(tex.width, tex.height) : null);
        // ✨ apply shading
        const shade = getShadeFactor(near);
        applyShade(ctx, quad, shade);
    }

    function drawNearRight(dx, near, camera, ctx, renderQuad) {
        const block = getBlock(dx, 0, camera);
        if (!block) return;

        const wall = projection.getWall(block, camera, 'RIGHT');
        if (!wall) return;
        let tex = getWallTextureWithFallback(wall);
        if (!tex) return;

        const quad = buildWallQuad(dx+0.5, near, 1);
        if (!quad) return;

        renderQuad(ctx, tex, quad.pA, quad.pB, quad.pC, quad.pD,
            tex ? uvRight(tex.width, tex.height) : null);
        // ✨ apply shading
        const shade = getShadeFactor(near);
        applyShade(ctx, quad, shade);
    }

    const renderer = {
        draw: function(){
            const ctx = canvas.contextHolder.context;

            const camera = {
                x: map.partyPosition.x,
                y: map.partyPosition.y,
                direction: map.partyPosition.direction
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
                    drawCeiling,
                    drawLeft,
                    drawRight,
                    drawFront,

                    drawNearFloor,
                    drawNearCeiling,
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