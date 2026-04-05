define(['mapManager', 'projection', 'eventBus', 'textureManager'], function (mapManager, projection, eventBus, textureManager) {

    const TextureEditor = function () {

        const textureState = {};

        this.applyTexture = function(setId) {

            const camera = getCamera();
            const block = getTargetBlock(camera);
            const wall = getTargetWall(block, camera);
            if (!wall) return;

            if (textureState[setId] === undefined) {
                textureState[setId] = -1;
            }

            textureState[setId]++;

            const texturesInSet = textureManager.getTextureCount(setId);
            textureState[setId] %= texturesInSet;

            // 🔥 APPLY TO WALL (NEW STRUCTURE)
            wall.textureSet = setId;
            wall.textureIndex = textureState[setId];

            console.log("Applied:", wall);

            eventBus.emit("wallTextureChanged: ", wall);
            // 🔥 SAVE TO BACKEND
            saveWallChange(block, camera, wall);
        };

        this.clearTexture = function() {
            const camera = getCamera();
            const block = getTargetBlock(camera);
            const wall = getTargetWall(block, camera);
            if (!wall) return;

            // 🔥 APPLY TO WALL (NEW STRUCTURE)
            wall.textureSet = undefined;
            wall.textureIndex = undefined;

            console.log("Cleared:", wall);

            eventBus.emit("wallTextureChanged: ", wall);
            // 🔥 SAVE TO BACKEND
            saveWallChange(block, camera, wall);
        }

        function getCamera() {
            const map = mapManager.regionalMap;
            const camera = {
                x: map.partyPosition.x,
                y: map.partyPosition.y,
                direction: map.partyPosition.direction
            };
            return camera;
        }
        function getTargetBlock(camera) {

            // reuse your existing logic 👇
            //return navigation.getUpcomingWallForDirection(dir, 'FORWARD');
            const world = projection.viewToWorld(0, 1, camera);

            const wx = Math.floor(world.x);
            const wy = Math.floor(world.y);

            const block = mapManager.regionalMap.mapData.blockMap[wy]?.[wx];
            return block;
        }
        function getTargetWall(block, camera) {
            if (!block) return null;
            return projection.getWall(block, camera, 'FRONT');
        }

        function saveWallChange(block, camera, wall) {

            let payload = JSON.stringify({
                x: block.x,
                y: block.y,
                direction: mapManager.getInvertedDirection(camera.direction),
                set: wall.textureSet,
                index: wall.textureIndex
            });
            console.log("payload:", payload);
            fetch('/ajax/map/wallTexture', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: payload
            })
            .then(res => res.json())
            .then(data => {
                console.log("Saved:", data);
            })
            .catch(err => {
                console.error("Save failed:", err);
            });
        }
    };

    return new TextureEditor();
});