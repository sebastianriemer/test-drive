define([], function () {

    // ✅ SHARED (no config needed)
    function viewToWorld(dx, dy, camera) {
        switch (camera.direction) {
            case 'NORTH': return { x: camera.x + dx, y: camera.y - dy };
            case 'SOUTH': return { x: camera.x - dx, y: camera.y + dy };
            case 'EAST':  return { x: camera.x + dy, y: camera.y + dx };
            case 'WEST':  return { x: camera.x - dy, y: camera.y - dx };
        }
    }

    function getWall(block, camera, direction) {
        switch (direction) {

            case 'FRONT':
                switch (camera.direction) {
                    case 'NORTH': return block.southWall;
                    case 'SOUTH': return block.northWall;
                    case 'EAST':  return block.westWall;
                    case 'WEST':  return block.eastWall;
                }

            case 'LEFT':
                switch (camera.direction) {
                    case 'NORTH': return block.westWall;
                    case 'SOUTH': return block.eastWall;
                    case 'EAST':  return block.northWall;
                    case 'WEST':  return block.southWall;
                }

            case 'RIGHT':
                switch (camera.direction) {
                    case 'NORTH': return block.eastWall;
                    case 'SOUTH': return block.westWall;
                    case 'EAST':  return block.southWall;
                    case 'WEST':  return block.northWall;
                }
        }

        return null;
    }

    // 🏭 FACTORY (only for rendering math)
    function createProjection(RENDER_SETTINGS) {

        const PROJ = {
            centerX: 260,
            horizonY: () => RENDER_SETTINGS.horizonY,
            scale: () => RENDER_SETTINGS.scale,
            stretch: () => RENDER_SETTINGS.stretch,
            width: () => RENDER_SETTINGS.width,
            yOffset: 0
        };

        function projectRaw(vx, vy) {
            if (vy < 0) return null;

            const safeVy = Math.max(vy, 0.1);
            const scale = PROJ.scale() / safeVy;

            return {
                x: PROJ.centerX + vx * scale * PROJ.width(),
                y: PROJ.horizonY() + scale * PROJ.stretch(),
                scale
            };
        }

        function project(vx, vy) {
            const p = projectRaw(vx, vy);
            if (!p) return null;
            return { x: p.x, y: p.y + PROJ.yOffset, scale: p.scale };
        }

        return { PROJ, project, projectRaw };
    }

    return {
        createProjection,
        viewToWorld,
        getWall
    };
});