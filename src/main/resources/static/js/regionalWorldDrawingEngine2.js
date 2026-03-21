define(['canvas','textureManager','mapManager'], function(canvas, textureManager, mapManager){

    const map = mapManager.regionalMap;
    const WALL_HEIGHT = 1;
    //const MAX_DEPTH = 5;
    //const NEAR = 0.8;

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
        scale: 120,
        horizonY: 150,
        stretch: 0.8,
        width: 0.5,
        near: 0.8,
        maxDepth: 5,
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

    // ---- Draw a textured quad as two simple triangles ----
    function drawTexturedQuad(ctx, texture, pA,pB,pC,pD){
        if(!texture) return;

        // crude mapping: two triangles (like your red debug quads)
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pA.x,pA.y); ctx.lineTo(pB.x,pB.y); ctx.lineTo(pC.x,pC.y); ctx.lineTo(pD.x,pD.y); ctx.closePath();
        ctx.clip();
        // map texture to bounding box of quad
        const minX = Math.min(pA.x,pB.x,pC.x,pD.x);
        const minY = Math.min(pA.y,pB.y,pC.y,pD.y);
        const maxX = Math.max(pA.x,pB.x,pC.x,pD.x);
        const maxY = Math.max(pA.y,pB.y,pC.y,pD.y);
        ctx.drawImage(texture, 0,0, texture.width, texture.height, minX,minY, maxX-minX, maxY-minY);
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
        drawTexturedQuad(ctx, texture, pA,pB,pC,pD);
    }

    function drawFrontWall(dx, dy, camera, ctx) {

        const world = viewToWorld(dx, dy, camera);
        const wx = Math.floor(world.x);
        const wy = Math.floor(world.y);

        const block = map.mapData.blockMap[wy]?.[wx];
        if (!block) return;

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

        drawTexturedQuad(ctx, texture, pA, pB, pC, pD);
    }

    function drawLeftWall(dx, dy, camera, ctx) {

        const world = viewToWorld(dx, dy, camera);
        const wx = Math.floor(world.x);
        const wy = Math.floor(world.y);

        const block = map.mapData.blockMap[wy]?.[wx];
        if (!block) return;

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

        drawTexturedQuad(ctx, texture, pA, pB, pC, pD);
    }

    function drawRightWall(dx, dy, camera, ctx) {

        const world = viewToWorld(dx, dy, camera);
        const wx = Math.floor(world.x);
        const wy = Math.floor(world.y);

        const block = map.mapData.blockMap[wy]?.[wx];
        if (!block) return;

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

        drawTexturedQuad(ctx, texture, pA, pB, pC, pD);
    }

    function getWallSet(block, dir) {
        switch (dir) {
            case 'NORTH':
                return {
                    front: block.southWall,
                    left:  block.eastWall,
                    right: block.westWall
                };
            case 'SOUTH':
                return {
                    front: block.northWall,
                    left:  block.westWall,
                    right: block.eastWall
                };
            case 'EAST':
                return {
                    front: block.westWall,
                    left:  block.southWall,
                    right: block.northWall
                };
            case 'WEST':
                return {
                    front: block.eastWall,
                    left:  block.northWall,
                    right: block.southWall
                };
        }
    }

    function drawCurrentRow(camera, ctx) {

        const dyVisual = 0.3;   // projection depth (stable)
        const dyWorld  = 0;     // actual tile
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

            const walls = getWallSet(block, camera.dir);

            // ---- LEFT WALL ----
            if (walls.left) {
                const tex = textureManager.getWallTexture(walls.left.texture);
                if (tex) {

                    const pL1 = project(dx - 0.5, dyVisual);
                    const pL2 = project(dx - 0.5, dyVisual + 1);

                    if (pL1 && pL2) {
                        const h1 = PROJ.scale() / dyVisual;
                        const h2 = PROJ.scale() / (dyVisual + 1);

                        const pL3 = { x: pL2.x, y: pL2.y - h2 };
                        const pL4 = { x: pL1.x, y: pL1.y - h1 };

                        drawTexturedQuad(ctx, tex, pL1, pL2, pL3, pL4);
                    }
                }
            }

            // ---- RIGHT WALL ----
            if (walls.right) {
                const tex = textureManager.getWallTexture(walls.right.texture);
                if (tex) {

                    const pR1 = project(dx + 0.5, dyVisual);
                    const pR2 = project(dx + 0.5, dyVisual + 1);

                    if (pR1 && pR2) {
                        const h1 = PROJ.scale() / dyVisual;
                        const h2 = PROJ.scale() / (dyVisual + 1);

                        const pR3 = { x: pR2.x, y: pR2.y - h2 };
                        const pR4 = { x: pR1.x, y: pR1.y - h1 };

                        drawTexturedQuad(ctx, tex, pR1, pR2, pR3, pR4);
                    }
                }
            }

            // ---- FLOOR (keep existing) ----
            const texFloor = textureManager.getFloorTexture(block.floor.texture);
            if (texFloor) {
                drawTexturedQuad(ctx, texFloor, pA, pB, pC, pD);
            }
        }
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

               const range = Math.min(20, Math.ceil(6 * (dy / NEAR)));

               for (let dx = -range; dx <= range; dx++) {
                   // 🟫 then floor
                   drawFloorTile(dx, dy, camera, ctx);
                   // 🧱 side walls FIRST
                   drawLeftWall(dx, dy, camera, ctx);
                   drawRightWall(dx, dy, camera, ctx);

                   // 🧱 then front wall
                   drawFrontWall(dx, dy, camera, ctx);


               }
           }

            // draw current row
            drawCurrentRow(camera, ctx);
        },
        settings: RENDER_SETTINGS
    };

    return renderer;

});