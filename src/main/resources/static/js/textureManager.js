define(['mapManager'], function (mapManager) {
    const TextureManager = function () {
        const textureSets = {};

        this.initWallTextureSetsFromMap = function(regionalMap) {
            const setsFromBackend = regionalMap.mapData.wallTextureSets;

            Object.keys(setsFromBackend).forEach(setId => {
                textureSets[setId] = [];
                console.log('Processing setId=' + setId);
                Promise.all(
                    setsFromBackend[setId].map(texture => {
                        return new Promise(resolve => {
                            const img = new Image();
                            img.src = texture.fileName;
                            img.onload = () => resolve(img);
                        });
                    })
                ).then(images => {
                    textureSets[setId] = images; // guaranteed order
                });
            });
        };

        this.getWallTexture = function(textureRef) {
            if (!textureRef) return undefined;
            const { set, index } = textureRef;

            if (textureSets[set] && textureSets[set][index]) {
                return textureSets[set][index];
            }

            //console.warn("Texture not found in set", textureRef);
            return undefined;
        };

        this.getFloorTexture = function(textureKey) {
            if (textureKey === 'ffffff' || textureKey === 'bcbcbc') {
                return undefined;
            }
            if (mapManager.regionalMap.mapData.floorTextureMap[textureKey]
                && mapManager.regionalMap.mapData.floorTextureMap[textureKey].image) {
                return mapManager.regionalMap.mapData.floorTextureMap[textureKey].image;
            }
            return undefined;
            //return mapManager.regionalMap.mapData.wallTextureMap['000000'].image;
        }
        this.getCeilingTexture = function(textureKey) {
            if (textureKey === 'ffffff' || textureKey === 'bcbcbc') {
                return undefined;
            }
            if (mapManager.regionalMap.mapData.floorTextureMap[textureKey]
                && mapManager.regionalMap.mapData.floorTextureMap[textureKey].image) {
                return mapManager.regionalMap.mapData.floorTextureMap[textureKey].image;
            }
            return undefined;
            //return mapManager.regionalMap.mapData.wallTextureMap['000000'].image;
        }
        this.getRoomTexture = function(textureKey) {
           if (mapManager.regionalMap.mapData.roomTextureMap[textureKey]
                && mapManager.regionalMap.mapData.roomTextureMap[textureKey].image) {
               return mapManager.regionalMap.mapData.roomTextureMap[textureKey].image;
           }
           console.error(`Texture ${textureKey} not found in mapManager.regionalMap.mapData.roomTextureMap!`);
           return undefined;
        }
        this.getBattleTexture = function(textureKey) {
           if (mapManager.battleMap.mapData.battleTextureMap[textureKey]
                && mapManager.battleMap.mapData.battleTextureMap[textureKey].image) {
               return mapManager.battleMap.mapData.battleTextureMap[textureKey].image;
           }
           console.error(`Texture ${textureKey} not found in mapManager.battleMap.mapData.battleTextureMap!`);
           return undefined;
        }
        this.init = function(regionalMap, battleMap) {
            //this.initWallTextureMap(regionalMap);
            this.initWallTextureSetsFromMap(regionalMap);
            this.initFloorTextureMap(regionalMap);
            this.initRoomTextureMap(regionalMap);
            this.initBattleTextureMap(battleMap);
        }

//        this.initWallTextureMap = function(regionalMap) {
//            let mapKeys = Object.keys(regionalMap.mapData.wallTextureMap);
//            for (let i = 0; i < mapKeys.length; i++) {
//                let texture = regionalMap.mapData.wallTextureMap[mapKeys[i]];
//                //console.log(mapKeys[i] + ' = ' + texture.fileName);
//                let textureImage = new Image();
//                textureImage.src = texture.fileName;
//                textureImage.onload = function() {
//                    texture.image = textureImage;
//                    regionalMap.mapData.wallTextureMap[mapKeys[i]] = texture;
//                }
//            }
//        }
        this.initFloorTextureMap = function(regionalMap) {
            let mapKeys = Object.keys(regionalMap.mapData.floorTextureMap);
            for (let i = 0; i < mapKeys.length; i++) {
                let texture = regionalMap.mapData.floorTextureMap[mapKeys[i]];
                //console.log(mapKeys[i] + ' = ' + texture.fileName);
                let textureImage = new Image();
                textureImage.src = texture.fileName;
                textureImage.onload = function() {
                    texture.image = textureImage;
                    regionalMap.mapData.floorTextureMap[mapKeys[i]] = texture;
                }
            }
        }
        this.initRoomTextureMap = function(regionalMap) {
           let mapKeys = Object.keys(regionalMap.mapData.roomTextureMap);
           for (let i = 0; i < mapKeys.length; i++) {
               let texture = regionalMap.mapData.roomTextureMap[mapKeys[i]];
             //console.log(mapKeys[i] + ' = ' + texture.fileName);
             let textureImage = new Image();
             textureImage.src = texture.fileName;
             textureImage.onload = function() {
                   texture.image = textureImage;
                   regionalMap.mapData.roomTextureMap[mapKeys[i]] = texture;
             }
           }
        }
        this.initBattleTextureMap = function(battleMap) {
           let mapKeys = Object.keys(battleMap.mapData.battleTextureMap);
           for (let i = 0; i < mapKeys.length; i++) {
               let texture = battleMap.mapData.battleTextureMap[mapKeys[i]];
             //console.log(mapKeys[i] + ' = ' + texture.fileName);
             let textureImage = new Image();
             textureImage.src = texture.fileName;
             textureImage.onload = function() {
                   texture.image = textureImage;
                   battleMap.mapData.battleTextureMap[mapKeys[i]] = texture;
             }
           }
        }

        this.getTextureCount = function(setId) {
            return textureSets[setId]?.length || 0;
        };
    }

    return new TextureManager();

});
