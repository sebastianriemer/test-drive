    define(['canvas', 'textureManager', 'mapManager'], function (canvas, textureManager, mapManager) {

        let map = mapManager.regionalMap;
        const MAX_DEPTH = 5;
        const NEAR = 0.8;
        const PROJ = {
            centerX: 260,
            horizonY: 150,
            scale: 120
        };
        PROJ.yOffset = -project(0, MAX_DEPTH + 1).y + PROJ.horizonY;

        function project(vx, vy) {
            // “ignore anything behind or too close to the camera”
            if (vy <= 0.1) return null;

            let scale = PROJ.scale / vy;

            return {
                x: PROJ.centerX + vx * scale * 0.5,
                y: PROJ.horizonY + scale * 0.8, // 🔥 FIXED
                scale: scale
            };
        }

        function viewToWorld(dx, dy, camera) {
            switch (camera.dir) {
                case 'NORTH':
                    return {
                        x: camera.x + dx,
                        y: camera.y - dy
                    };
                case 'SOUTH':
                    return {
                        x: camera.x - dx,
                        y: camera.y + dy
                    };
                case 'EAST':
                    return {
                        x: camera.x + dy,
                        y: camera.y + dx
                    };
                case 'WEST':
                    return {
                        x: camera.x - dy,
                        y: camera.y - dx
                    };
            }
        }

        function drawDotsAndPositionNumbers(dx, dy, camera, ctx) {
            console.log('dx=' + dx + ' dy=' + dy);
            let world = viewToWorld(dx, dy, camera);
            let wx = world.x;
            let wy = world.y;


            console.log('wx=' + wx + ' wy=' + wy);
           // let view = toViewSpace(wx, wy, camera);
          // console.log(view);
            //let proj = project(view.x, view.y);
            let proj = project(dx, dy);
            console.log(proj);
            if (!proj) return;

            let color = `hsl(${dx * 40 + 180}, 100%, ${70 - dy * 8}%)`;
            ctx.fillStyle = color;
            ctx.fillRect(proj.x, proj.y, 6, 6);

            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${wx},${wy}`, proj.x + 4, proj.y + 4);
        }

        function drawTilesAsFilledTiles(dx, dy, camera, ctx) {
            let pA = project(dx,     dy);
            let pB = project(dx + 1, dy);
            let pC = project(dx + 1, dy + 1);
            let pD = project(dx,     dy + 1);

            if (!pA || !pB || !pC || !pD) return;

            let world = viewToWorld(dx, dy, camera);
            let wx = world.x;
            let wy = world.y;


            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.lineTo(pC.x, pC.y);
            ctx.lineTo(pD.x, pD.y);
            ctx.closePath();

            let color = `hsl(${(wx + wy) * 30}, 60%, ${70 - dy * 8}%)`;
            ctx.fillStyle = color;
            ctx.fill();
        }

        function drawTilesAsBorderedTiles(dx, dy, camera, ctx) {
            let pA = project(dx,     dy);
            let pB = project(dx + 1, dy);
            let pC = project(dx + 1, dy + 1);
            let pD = project(dx,     dy + 1);

            if (!pA || !pB || !pC || !pD) return;

            let world = viewToWorld(dx, dy, camera);
            let wx = world.x;
            let wy = world.y;


            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.lineTo(pC.x, pC.y);
            ctx.lineTo(pD.x, pD.y);
            ctx.closePath();


        }

        function drawTilesAsTexturedTiles(dx, dy, camera, ctx) {
            // shift by +/-0.5 so that player stands in middle of tile
            let pA = project(dx - 0.5,     dy);
            let pB = project(dx + 0.5,     dy);
            let pC = project(dx + 0.5, dy + 1);
            let pD = project(dx - 0.5, dy + 1);

            if (!pA || !pB || !pC || !pD) return;

            let world = viewToWorld(dx + 0.5, dy, camera);
            let wx = Math.floor(world.x);
            let wy = Math.floor(world.y);

            let block = map.mapData.blockMap[wy]?.[wx];
            if (!block) return;

            let texture = textureManager.getFloorTexture(block.floor.texture);
            if (!texture) return;

            drawTexturedQuad(ctx, texture, pA, pB, pC, pD);
        }

        function drawTexturedTriangle(ctx, img, p0, p1, p2) {

            ctx.save();

            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.closePath();
            ctx.clip();

            // crude mapping (will distort, but works!)
            ctx.drawImage(
                img,
                0, 0, img.width, img.height,
                Math.min(p0.x, p1.x, p2.x),
                Math.min(p0.y, p1.y, p2.y),
                Math.max(p0.x, p1.x, p2.x) - Math.min(p0.x, p1.x, p2.x),
                Math.max(p0.y, p1.y, p2.y) - Math.min(p0.y, p1.y, p2.y)
            );

            ctx.restore();
        }

        function drawTexturedQuad(ctx, texture, pA, pB, pC, pD) {

            // triangle 1
            drawTexturedTriangle(ctx, texture, pA, pB, pC);

            // triangle 2
            drawTexturedTriangle(ctx, texture, pA, pC, pD);
        }
        let renderer = {

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

                // ---- Draw sky + floor (debug horizon) ----
                ctx.fillStyle = '#6fc9f9'; // sky
                ctx.fillRect(0, 0, 500, PROJ.horizonY);

                ctx.fillStyle = '#c9a24e'; // ground
                ctx.fillRect(0, PROJ.horizonY, 500, 300);
                console.log(camera);
                // ---- DEBUG: draw projected points ----
                // dy ... distance forward from camera
                // dy=1 → nearest row   dy=5 → farthest row
                for (let dy = NEAR; dy <= MAX_DEPTH; dy++) {
                // dx ... distance left/right from camera
                // dx=  -3     ... 0   ...   +3
                //      left ... center ... right
                    let range = Math.min(20, Math.ceil(6 * (dy / NEAR)));
                    for (let dx = -range; dx <= range; dx++) {
                        drawTilesAsTexturedTiles(dx, dy, camera, ctx);
                    }
                }
                console.log('Drawing-loop completed')
            }
        };



        return renderer;
    });