define(['canvas', 'textureManager', 'mapManager'], function (canvas, textureManager, mapManager) {

    const map = mapManager.regionalMap;

    // ---- Rendering constants (tuned for 90s-style look) ----
    const MAX_DEPTH = 5;   // how many tiles forward
    const NEAR = 0.8;      // near plane (prevents huge first row)

    const PROJ = {
        centerX: 260,
        horizonY: 150,
        scale: 120,
        yOffset: 0 // dynamically computed per frame
    };

    function projectRaw(vx, vy) {
        if (vy <= 0.1) return null;

        const scale = PROJ.scale / vy;

        return {
            x: PROJ.centerX + vx * scale * 2,
            y: PROJ.horizonY + scale * 0.8, // NO offset here
            scale: scale
        };
    }
    function project(vx, vy) {
        const p = projectRaw(vx, vy);
        if (!p) return null;

        return {
            x: p.x,
            y: p.y + PROJ.yOffset,
            scale: p.scale
        };
    }
    // ---- Perspective projection ----
  /*  function project(vx, vy) {
        if (vy <= 0.1) return null; // behind/too close

        const scale = PROJ.scale / vy;

        return {
            x: PROJ.centerX + vx * scale * 0.5,
            y: PROJ.horizonY + scale * 0.8 + PROJ.yOffset,
            scale: scale
        };
    }*/

    // ---- Convert view-space (dx,dy) into world-space ----
    function viewToWorld(dx, dy, camera) {
        switch (camera.dir) {
            case 'NORTH': return { x: camera.x + dx, y: camera.y - dy };
            case 'SOUTH': return { x: camera.x - dx, y: camera.y + dy };
            case 'EAST':  return { x: camera.x + dy, y: camera.y + dx };
            case 'WEST':  return { x: camera.x - dy, y: camera.y - dx };
        }
    }

    // ---- Draw textured triangle (affine mapping, not perspective-correct) ----
    function drawTexturedTriangle(ctx, img, p0, p1, p2) {
        ctx.save();

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();
        ctx.clip();

        // simple bounding-box mapping (will distort slightly)
        const minX = Math.min(p0.x, p1.x, p2.x);
        const minY = Math.min(p0.y, p1.y, p2.y);
        const maxX = Math.max(p0.x, p1.x, p2.x);
        const maxY = Math.max(p0.y, p1.y, p2.y);

        ctx.drawImage(
            img,
            0, 0, img.width, img.height,
            minX, minY,
            maxX - minX,
            maxY - minY
        );

        ctx.restore();
    }

    // ---- Quad = 2 triangles ----
    function drawTexturedQuad(ctx, texture, pA, pB, pC, pD) {
        drawTexturedTriangle(ctx, texture, pA, pB, pC);
        drawTexturedTriangle(ctx, texture, pA, pC, pD);
    }

    // ---- Render one floor tile ----
    function drawFloorTile(dx, dy, camera, ctx) {

        // geometry (centered around player)
        const pA = project(dx - 0.5,     dy);
        const pB = project(dx + 0.5,     dy);
        const pC = project(dx + 0.5, dy + 1);
        const pD = project(dx - 0.5, dy + 1);

        if (!pA || !pB || !pC || !pD) return;

        // sample correct world tile (centered)
        const world = viewToWorld(dx, dy, camera);
        const wx = Math.floor(world.x);
        const wy = Math.floor(world.y);

        const block = map.mapData.blockMap[wy]?.[wx];
        if (!block) return;

        const texture = textureManager.getFloorTexture(block.floor.texture);
        if (!texture || !texture.complete) return;

        drawTexturedQuad(ctx, texture, pA, pB, pC, pD);
    }

    function drawCurrentRow(camera, ctx) {

        const dy = 0.11; // fixed safe depth for current tile

        const range = 6; // small range is enough for near row

        for (let dx = -range; dx <= range; dx++) {

            const pA = project(dx - 0.5,     dy);
            const pB = project(dx + 0.5,     dy);
            const pC = project(dx + 0.5, dy + 1);
            const pD = project(dx - 0.5, dy + 1);

            if (!pA || !pB || !pC || !pD) continue;

            const world = viewToWorld(dx, 0, camera); // 👈 NOTE: dy = 0 here
            const wx = Math.floor(world.x);
            const wy = Math.floor(world.y);

            const block = map.mapData.blockMap[wy]?.[wx];
            if (!block) continue;

            const texture = textureManager.getFloorTexture(block.floor.texture);
            if (!texture || !texture.complete) continue;

            drawTexturedQuad(ctx, texture, pA, pB, pC, pD);
        }
    }

    // ---- Main renderer ----
    const renderer = {

        draw: function () {

            const ctx = canvas.contextHolder.context;

            // ---- Camera ----
            const camera = {
                x: map.partyPosition.x,
                y: map.partyPosition.y,
                dir: map.partyPosition.direction
            };

            // ---- Clear screen ----
            ctx.resetTransform();
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, 500, 300);

            // ---- Sky + ground (debug baseline) ----
            ctx.fillStyle = '#6fc9f9';
            ctx.fillRect(0, 0, 500, PROJ.horizonY);

            ctx.fillStyle = '#c9a24e';
            ctx.fillRect(0, PROJ.horizonY, 500, 200);

            // ---- Compute horizon alignment (locks far row to horizon) ----
            const testProj = projectRaw(0, MAX_DEPTH + 1);
            PROJ.yOffset = testProj ? (PROJ.horizonY - testProj.y) : 0;
            PROJ.yOffset = Math.round(PROJ.yOffset);
            // ---- Draw floor (far → near for proper overlap) ----
            for (let dy = MAX_DEPTH; dy >= NEAR; dy--) {

                // widen horizontal range with distance (perspective)
                const range = Math.min(20, Math.ceil(6 * (dy / NEAR)));

                for (let dx = -range; dx <= range; dx++) {
                    drawFloorTile(dx, dy, camera, ctx);
                }
            }
            drawCurrentRow(camera, ctx);
        }
    };

    return renderer;
});