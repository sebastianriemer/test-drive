define(['mapManager'], function (mapManager) {
    const textureSets = {};

    function initWallTextureSetsFromMap(regionalMap) {
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

     function initFloorTextureMap(regionalMap) {
         let mapKeys = Object.keys(regionalMap.mapData.floorTextureMap);
         for (let i = 0; i < mapKeys.length; i++) {
             let texture = regionalMap.mapData.floorTextureMap[mapKeys[i]];
             let textureImage = new Image();
             textureImage.src = texture.fileName;
             textureImage.onload = function() {
                 texture.image = textureImage;
                 regionalMap.mapData.floorTextureMap[mapKeys[i]] = texture;
             }
         }
     }

     function initRoomTextureMap(regionalMap) {
        let mapKeys = Object.keys(regionalMap.mapData.roomTextureMap);
        for (let i = 0; i < mapKeys.length; i++) {
            let texture = regionalMap.mapData.roomTextureMap[mapKeys[i]];
          let textureImage = new Image();
          textureImage.src = texture.fileName;
          textureImage.onload = function() {
                texture.image = textureImage;
                regionalMap.mapData.roomTextureMap[mapKeys[i]] = texture;
          }
        }
     }
     function initBattleTextureMap(battleMap) {
        let mapKeys = Object.keys(battleMap.mapData.battleTextureMap);
        for (let i = 0; i < mapKeys.length; i++) {
            let texture = battleMap.mapData.battleTextureMap[mapKeys[i]];
          let textureImage = new Image();
          textureImage.src = texture.fileName;
          textureImage.onload = function() {
                texture.image = textureImage;
                battleMap.mapData.battleTextureMap[mapKeys[i]] = texture;
          }
        }
     }

    const textureManager = {

        init : function(regionalMap, battleMap) {
            initWallTextureSetsFromMap(regionalMap);
            initFloorTextureMap(regionalMap);
            initRoomTextureMap(regionalMap);
            initBattleTextureMap(battleMap);
        },

        getWallTextureWithFallback : function(wall) {
            if (!wall || wall.textureSet == null || wall.textureIndex == null) {
                return null;
            }
            let tex = this.getWallTexture(wall);
            if (!tex) {
                if (wall.solid) {
                    tex = this.getWallTexture({ set: 9, index: 0 });
                } else {
                    return;
                }
            }
            return tex;
        },

        getWallTexture : function(wall) {
            const { textureSet: set, textureIndex: index } = wall;
            if (textureSets[set] && textureSets[set][index]) {
                return textureSets[set][index];
            }
            return undefined;
        },

        getFloorTexture : function(textureKey) {
            if (textureKey === 'ffffff' || textureKey === 'bcbcbc') {
                return undefined;
            }
            if (mapManager.regionalMap.mapData.floorTextureMap[textureKey]
                && mapManager.regionalMap.mapData.floorTextureMap[textureKey].image) {
                return mapManager.regionalMap.mapData.floorTextureMap[textureKey].image;
            }
            return undefined;
            //return mapManager.regionalMap.mapData.wallTextureMap['000000'].image;
        },

        getCeilingTexture : function(textureKey) {
            if (textureKey === 'ffffff' || textureKey === 'bcbcbc') {
                return undefined;
            }
            if (mapManager.regionalMap.mapData.floorTextureMap[textureKey]
                && mapManager.regionalMap.mapData.floorTextureMap[textureKey].image) {
                return mapManager.regionalMap.mapData.floorTextureMap[textureKey].image;
            }
            return undefined;
            //return mapManager.regionalMap.mapData.wallTextureMap['000000'].image;
        },

        getRoomTexture : function(textureKey) {
           if (mapManager.regionalMap.mapData.roomTextureMap[textureKey]
                && mapManager.regionalMap.mapData.roomTextureMap[textureKey].image) {
               return mapManager.regionalMap.mapData.roomTextureMap[textureKey].image;
           }
           console.error(`Texture ${textureKey} not found in mapManager.regionalMap.mapData.roomTextureMap!`);
           return undefined;
        },

        getBattleTexture : function(textureKey) {
           if (mapManager.battleMap.mapData.battleTextureMap[textureKey]
                && mapManager.battleMap.mapData.battleTextureMap[textureKey].image) {
               return mapManager.battleMap.mapData.battleTextureMap[textureKey].image;
           }
           console.error(`Texture ${textureKey} not found in mapManager.battleMap.mapData.battleTextureMap!`);
           return undefined;
        },

        getTextureCount : function(setId) {
            return textureSets[setId]?.length || 0;
        }
    }

    return textureManager;

});
