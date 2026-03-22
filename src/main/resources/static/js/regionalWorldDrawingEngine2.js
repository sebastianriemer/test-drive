define(['canvas','textureManager','mapManager'], function(canvas, textureManager, mapManager){

    const map = mapManager.regionalMap;
    const WALL_HEIGHT = 1;


    const PROJ = {
        centerX: 260,
        horizonY: () => RENDER_SETTINGS.horizonY,
        scale: () => RENDER_SETTINGS.scale,
        stretch: () => RENDER_SETTINGS.stretch,
        width: () => RENDER_SETTINGS.width,
        yOffset: 0,
        imageSmoothingEnabled: () => RENDER_SETTINGS.imageSmoothingEnabled
    };
    const RENDER_SETTINGS = {
        scale: 114,
        horizonY: 169,
        stretch: 0.55,
        width: 1.3,
        near: 0.25,
        maxDepth: 4,
        imageSmoothingEnabled: true
    };

    function projectRaw(vx, vy) {
        if (vy <= 0.1) return null;

        const scale = PROJ.scale() / vy;

        return {
            x: PROJ.centerX + vx * scale * PROJ.width(),
            y: PROJ.horizonY() + scale * PROJ.stretch(),
            scale: scale
        };
    }
    function project(vx, vy){
        const p = projectRaw(vx, vy);
        if(!p) return null;
        return { x: p.x, y: p.y + PROJ.yOffset, scale: p.scale };
    }

    function viewToWorld(dx, dy, camera){
        switch(camera.dir){
            case 'NORTH': return { x: camera.x + dx, y: camera.y - dy };
            case 'SOUTH': return { x: camera.x - dx, y: camera.y + dy };
            case 'EAST':  return { x: camera.x + dy, y: camera.y + dx };
            case 'WEST':  return { x: camera.x - dy, y: camera.y - dx };
        }
    }

    function drawTexturedQuadUV(ctx, tex, pA, pB, pC, pD, uvA, uvB, uvC, uvD) {
        drawTriangle(ctx, tex, pA, pB, pC,
            uvA.u, uvA.v,
            uvB.u, uvB.v,
            uvC.u, uvC.v
        );

        drawTriangle(ctx, tex, pA, pC, pD,
            uvA.u, uvA.v,
            uvC.u, uvC.v,
            uvD.u, uvD.v
        );
    }

    function drawTriangle(ctx, img,
        p0, p1, p2,
        u0, v0,
        u1, v1,
        u2, v2) {

        ctx.save();

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();
        ctx.clip();

        // Compute affine transform
        const denom = (u0*(v1 - v2) + u1*(v2 - v0) + u2*(v0 - v1));

        const a = (p0.x*(v1 - v2) + p1.x*(v2 - v0) + p2.x*(v0 - v1)) / denom;
        const b = (p0.y*(v1 - v2) + p1.y*(v2 - v0) + p2.y*(v0 - v1)) / denom;
        const c = (p0.x*(u2 - u1) + p1.x*(u0 - u2) + p2.x*(u1 - u0)) / denom;
        const d = (p0.y*(u2 - u1) + p1.y*(u0 - u2) + p2.y*(u1 - u0)) / denom;
        const e = (p0.x*(u1*v2 - u2*v1) + p1.x*(u2*v0 - u0*v2) + p2.x*(u0*v1 - u1*v0)) / denom;
        const f = (p0.y*(u1*v2 - u2*v1) + p1.y*(u2*v0 - u0*v2) + p2.y*(u0*v1 - u1*v0)) / denom;

        ctx.transform(a, b, c, d, e, f);
        ctx.drawImage(img, 0, 0);

        ctx.restore();
    }

    function drawFloorTile(dx, dy, camera, ctx){
        const pA = project(dx-0.5, dy);
        const pB = project(dx+0.5, dy);
        const pC = project(dx+0.5, dy+1);
        const pD = project(dx-0.5, dy+1);
        if(!pA||!pB||!pC||!pD) return;

        const world = viewToWorld(dx, dy, camera);
        const wx = Math.floor(world.x), wy = Math.floor(world.y);
        const block = map.mapData.blockMap[wy]?.[wx];
        if(!block) return;
        const texture = textureManager.getFloorTexture(block.floor.texture);
        if (texture) {
            const w = texture.width;
            const h = texture.height;
            drawTexturedQuadUV(ctx, texture, pA, pB, pC, pD,
                {u:0, v:0},   // near-left
                {u:w, v:0},   // near-right
                {u:w, v:h},   // far-right
                {u:0, v:h}    // far-left
            );
        }
    }

    function drawFrontWall(dx, dy, camera, ctx) {

        const world = viewToWorld(dx, dy, camera);
        const wx = Math.floor(world.x);
        const wy = Math.floor(world.y);

        const block = map.mapData.blockMap[wy]?.[wx];
        if (!block) return;
        drawBlockOnMapDebugCanvas(block, '#49EA40');
        // ---- pick correct wall depending on camera ----
        let wall;
       switch (camera.dir) {
           case 'NORTH': wall = block.southWall; break;
           case 'SOUTH': wall = block.northWall; break;
           case 'EAST':  wall = block.westWall;  break;
           case 'WEST':  wall = block.eastWall;  break;
       }

        if (!wall) return;

        const texture = textureManager.getWallTexture(wall.texture);
        if (!texture) return;

        // ---- base (same as floor front edge) ----
        const pA = project(dx - 0.5, dy);
        const pB = project(dx + 0.5, dy);
        if (!pA || !pB) return;

        // ---- perspective height ----
        const height = PROJ.scale() / dy;

        const pC = { x: pB.x, y: pB.y - height };
        const pD = { x: pA.x, y: pA.y - height };
        const w = texture.width;
        const h = texture.height;
        //drawTexturedQuad(ctx, texture, pA, pB, pC, pD);
        drawTexturedQuadUV(ctx, texture, pA, pB, pC, pD,
            {u:0, v:h},   // bottom-left
            {u:w, v:h},   // bottom-right
            {u:w, v:0},   // top-right
            {u:0, v:0}    // top-left
        );
    }

    function drawLeftWall(dx, dy, camera, ctx) {

        const world = viewToWorld(dx, dy, camera);
        const wx = Math.floor(world.x);
        const wy = Math.floor(world.y);

        const block = map.mapData.blockMap[wy]?.[wx];
        if (!block) return;
        drawBlockOnMapDebugCanvas(block, '#99D9EA');
        const walls = getWallSet(block, camera.dir);
        const wall = walls.left;
        if (!wall) return;

        const texture = textureManager.getWallTexture(wall.texture);
        if (!texture) return;

        // vertical edge of tile
        const pA = project(dx - 0.5, dy);
        const pB = project(dx - 0.5, dy + 1);

        if (!pA || !pB) return;

        const heightA = PROJ.scale() / dy;
        const heightB = PROJ.scale() / (dy + 1);

        const pC = { x: pB.x, y: pB.y - heightB };
        const pD = { x: pA.x, y: pA.y - heightA };
        //drawTexturedQuad(ctx, texture, pA, pB, pC, pD, false);
        const w = texture.width;
        const h = texture.height;
        drawTexturedQuadUV(ctx, texture, pA, pB, pC, pD,
            {u:0, v:h},   // near bottom
            {u:w, v:h},   // far bottom
            {u:w, v:0},   // far top
            {u:0, v:0}    // near top
        );
    }

    function drawBlockOnMapDebugCanvas(block, color) {
        canvas.contextHolder.mapDebugContext.fillStyle = color;
        /*canvas.contextHolder.mapDebugContext.fillRect(
            block.x*3*2,
            block.y*3*2,
            3*2,
            3*2);*/
    }

    function drawRightWall(dx, dy, camera, ctx) {

        const world = viewToWorld(dx, dy, camera);
        const wx = Math.floor(world.x);
        const wy = Math.floor(world.y);

        const block = map.mapData.blockMap[wy]?.[wx];
        if (!block) return;

        drawBlockOnMapDebugCanvas(block, '#FFF200');
        const walls = getWallSet(block, camera.dir);
        const wall = walls.right;
        if (!wall) return;

        const texture = textureManager.getWallTexture(wall.texture);
        if (!texture) return;

        const pA = project(dx + 0.5, dy);
        const pB = project(dx + 0.5, dy + 1);

        if (!pA || !pB) return;

        const heightA = PROJ.scale() / dy;
        const heightB = PROJ.scale() / (dy + 1);

        const pC = { x: pB.x, y: pB.y - heightB };
        const pD = { x: pA.x, y: pA.y - heightA };
        const w = texture.width;
        const h = texture.height;
        drawTexturedQuadUV(ctx, texture, pA, pB, pC, pD,
            {u:w, v:h},   // near bottom
            {u:0, v:h},   // far bottom
            {u:0, v:0},   // far top
            {u:w, v:0}    // near top
        );
    }

    function getWallSet(block, dir) {
        switch (dir) {
            case 'NORTH':
                return {
                    front: block.southWall,
                    //left:  block.eastWall,
                    //right: block.westWall
                    left:  block.westWall,
                    right: block.eastWall
                };
            case 'SOUTH':
                return {
                    front: block.northWall,
                    //left:  block.westWall,
                    //right: block.eastWall
                    left:  block.eastWall,
                    right: block.westWall
                };
            case 'EAST':
                return {
                    front: block.westWall,
                    //left:  block.southWall,
                    //right: block.northWall
                    left:  block.northWall,
                    right: block.southWall
                };
            case 'WEST':
                return {
                    front: block.eastWall,
                    //left:  block.northWall,
                    //right: block.southWall
                    left:  block.southWall,
                    right: block.northWall
                };
        }
    }

    function drawCurrentRowFloor(camera, ctx) {
        const dyVisual = 0.3;
        const dyWorld  = 0;
        const range = 6;

        for (let dx = -range; dx <= range; dx++) {

            const pA = project(dx - 0.5, dyVisual);
            const pB = project(dx + 0.5, dyVisual);
            const pC = project(dx + 0.5, dyVisual + 1);
            const pD = project(dx - 0.5, dyVisual + 1);

            if (!pA || !pB || !pC || !pD) continue;

            const world = viewToWorld(dx, dyWorld, camera);
            const wx = Math.floor(world.x);
            const wy = Math.floor(world.y);

            const block = map.mapData.blockMap[wy]?.[wx];
            if (!block) continue;

            const texture = textureManager.getFloorTexture(block.floor.texture);
            if (texture) {
                const w = texture.width;
                const h = texture.height;
                drawTexturedQuadUV(ctx, texture, pA, pB, pC, pD,
                    {u:0, v:0},   // near-left
                    {u:w, v:0},   // near-right
                    {u:w, v:h},   // far-right
                    {u:0, v:h}    // far-left
                );
            }
        }
    }

    function drawCurrentRowWalls(camera, ctx) {
        const dyVisual = 0.3;
        const dyWorld  = 0;
        const range = 6;

        function drawCell(dx) {
            const world = viewToWorld(dx, dyWorld, camera);
            const wx = Math.floor(world.x);
            const wy = Math.floor(world.y);

            const block = map.mapData.blockMap[wy]?.[wx];
            if (!block) return;

            const walls = getWallSet(block, camera.dir);

            // LEFT WALL
            if (walls.left) {
                const texture = textureManager.getWallTexture(walls.left.texture);
                if (texture) {
                    const pA = project(dx - 0.5, dyVisual);
                    const pB = project(dx - 0.5, dyVisual + 1);
                    if (pA && pB) {
                        const h1 = PROJ.scale() / dyVisual;
                        const h2 = PROJ.scale() / (dyVisual + 1);
                        const pC = { x: pB.x, y: pB.y - h2 };
                        const pD = { x: pA.x, y: pA.y - h1 };
                        //drawTexturedQuad(ctx, texture, pA, pB, pC, pD, false);
                                const w = texture.width;
                                const h = texture.height;
                                drawTexturedQuadUV(ctx, texture, pA, pB, pC, pD,
                                    {u:0, v:h},   // near bottom
                                    {u:w, v:h},   // far bottom
                                    {u:w, v:0},   // far top
                                    {u:0, v:0}    // near top
                                );
                    }
                }
            }

            // RIGHT WALL
            if (walls.right) {
                const texture = textureManager.getWallTexture(walls.right.texture);
                if (texture) {
                    const pA = project(dx + 0.5, dyVisual);
                    const pB = project(dx + 0.5, dyVisual + 1);
                    if (pA && pB) {
                        const h1 = PROJ.scale() / dyVisual;
                        const h2 = PROJ.scale() / (dyVisual + 1);
                        const pC = { x: pB.x, y: pB.y - h2 };
                        const pD = { x: pA.x, y: pA.y - h1 };
                        const w = texture.width;
                        const h = texture.height;
                        drawTexturedQuadUV(ctx, texture, pA, pB, pC, pD,
                            {u:w, v:h},   // near bottom
                            {u:0, v:h},   // far bottom
                            {u:0, v:0},   // far top
                            {u:w, v:0}    // near top
                        );
                    }
                }
            }
            drawBlockOnMapDebugCanvas(block, '#EA4417');
            if (dx == 0) drawBlockOnMapDebugCanvas(block, '#FF7F27');
            // FRONT WALL
            if (walls.front) {
                const texture = textureManager.getWallTexture(walls.front.texture);
                if (texture) {
                    const pA = project(dx - 0.5, dyVisual);
                    const pB = project(dx + 0.5, dyVisual);

                    if (pA && pB) {
                        const height = PROJ.scale() / dyVisual;

                        const pC = { x: pB.x, y: pB.y - height };
                        const pD = { x: pA.x, y: pA.y - height };

                        //drawTexturedQuad(ctx, tex, pA, pB, pC, pD);
                        const w = texture.width;
                        const h = texture.height;
                        //drawTexturedQuad(ctx, texture, pA, pB, pC, pD);
                        drawTexturedQuadUV(ctx, texture, pA, pB, pC, pD,
                            {u:0, v:h},   // bottom-left
                            {u:w, v:h},   // bottom-right
                            {u:w, v:0},   // top-right
                            {u:0, v:0}    // top-left
                        );
                    }
                }
            }
        }

        function drawZeroCell(dx) {
            const world = viewToWorld(dx, dyWorld, camera);
            const wx = Math.floor(world.x);
            const wy = Math.floor(world.y);

            const block = map.mapData.blockMap[wy]?.[wx];
            if (!block) return;

            const walls = getWallSet(block, camera.dir);

            // LEFT WALL
            if (walls.left) {
                const texture = textureManager.getWallTexture(walls.left.texture);
                if (texture) {
                    const pA = project(dx - 0.5, dyVisual);
                    const pB = project(dx - 0.5, dyVisual + 1);
                    if (pA && pB) {
                        const h1 = PROJ.scale() / dyVisual;
                        const h2 = PROJ.scale() / (dyVisual + 1);
                        const pC = { x: pB.x, y: pB.y - h2 };
                        const pD = { x: pA.x, y: pA.y - h1 };
                        //drawTexturedQuad(ctx, texture, pA, pB, pC, pD, false);
                        const w = texture.width;
                        const h = texture.height;
                        drawTexturedQuadUV(ctx, texture, pA, pB, pC, pD,
                            {u:0, v:h},   // near bottom
                            {u:w, v:h},   // far bottom
                            {u:w, v:0},   // far top
                            {u:0, v:0}    // near top
                        );
                    }
                }
            }

            // RIGHT WALL
            if (walls.right) {
                const texture = textureManager.getWallTexture(walls.right.texture);
                if (texture) {
                    const pA = project(dx + 0.5, dyVisual);
                    const pB = project(dx + 0.5, dyVisual + 1);
                    if (p1 && p2) {
                        const h1 = PROJ.scale() / dyVisual;
                        const h2 = PROJ.scale() / (dyVisual + 1);
                        const pC = { x: pB.x, y: pB.y - h2 };
                        const pD = { x: pA.x, y: pA.y - h1 };
                        const w = texture.width;
                        const h = texture.height;
                        drawTexturedQuadUV(ctx, texture, pA, pB, pC, pD,
                            {u:w, v:h},   // near bottom
                            {u:0, v:h},   // far bottom
                            {u:0, v:0},   // far top
                            {u:w, v:0}    // near top
                        );
                    }
                }
            }
            drawBlockOnMapDebugCanvas(block, '#EA4417');
            if (dx == 0) drawBlockOnMapDebugCanvas(block, '#FF7F27');
            // FRONT WALL
            if (walls.front) {
                const texture = textureManager.getWallTexture(walls.front.texture);
                if (texture) {
                    const pA = project(dx - 0.5, dyVisual);
                    const pB = project(dx + 0.5, dyVisual);

                    if (pA && pB) {
                        const height = PROJ.scale() / dyVisual;

                        const pC = { x: pB.x, y: pB.y - height };
                        const pD = { x: pA.x, y: pA.y - height };

                        //drawTexturedQuad(ctx, tex, pA, pB, pC, pD);
                        const w = texture.width;
                        const h = texture.height;
                        //drawTexturedQuad(ctx, texture, pA, pB, pC, pD);
                        drawTexturedQuadUV(ctx, texture, pA, pB, pC, pD,
                            {u:0, v:h},   // bottom-left
                            {u:w, v:h},   // bottom-right
                            {u:w, v:0},   // top-right
                            {u:0, v:0}    // top-left
                        );
                    }
                }
            }
        }

        // 🔥 correct painter order
        for (let dx = -range; dx < 0; dx++) drawCell(dx);
        for (let dx = range; dx > 0; dx--) drawCell(dx);

        drawZeroCell(0);
    }

    const renderer = {
        draw: function(){
            const MAX_DEPTH = RENDER_SETTINGS.maxDepth;
            const NEAR = RENDER_SETTINGS.near;
            const ctx = canvas.contextHolder.context;
            ctx.imageSmoothingEnabled = RENDER_SETTINGS.imageSmoothingEnabled;
            const camera = { x:map.partyPosition.x, y:map.partyPosition.y, dir:map.partyPosition.direction };

            // clear screen
            ctx.resetTransform();
            ctx.fillStyle="#000"; ctx.fillRect(0,0,500,300);

            // sky + ground
            ctx.fillStyle="#6fc9f9"; ctx.fillRect(0,0,500,PROJ.horizonY());
            ctx.fillStyle="#c9a24e"; ctx.fillRect(0,PROJ.horizonY(),500,200);

            // lock far row to horizon
            const testProj=projectRaw(0, MAX_DEPTH+1);
            PROJ.yOffset = testProj ? (PROJ.horizonY()-testProj.y) : 0;

           for (let dy = MAX_DEPTH; dy >= NEAR; dy--) {
               const range = Math.min(10, Math.ceil(6 * (dy / NEAR)));
               for (let dx = -range; dx <= range; dx++) {
                   // 🟫 then floor
                   drawFloorTile(dx, dy, camera, ctx);
               }
           }
           drawCurrentRowFloor(camera, ctx);

           for (let dy = MAX_DEPTH; dy >= NEAR; dy--) {
            const range = Math.min(10, Math.ceil(6 * (dy / NEAR)));
                 for (let dx = -range; dx < 0; dx++) {
                      drawLeftWall(dx, dy, camera, ctx);
                      drawRightWall(dx, dy, camera, ctx);
                      drawFrontWall(dx, dy, camera, ctx);
                  }
                  for (let dx = range; dx >= 0; dx--) {
                      drawLeftWall(dx, dy, camera, ctx);
                      drawRightWall(dx, dy, camera, ctx);
                      drawFrontWall(dx, dy, camera, ctx);
                  }
           }
            drawCurrentRowWalls(camera, ctx);

        },
        settings: RENDER_SETTINGS
    };

    return renderer;

});