define(['mapManager'], function (mapManager) {
    const TextureManager = function () {

        this.getWallTexture = function(textureKey) {
           if (textureKey === 'ffffff' || textureKey === 'bcbcbc') {
               return undefined;
           }
           if (mapManager.regionalMap.mapData.wallTextureMap[textureKey] && mapManager.regionalMap.mapData.wallTextureMap[textureKey].image) {
               return mapManager.regionalMap.mapData.wallTextureMap[textureKey].image;
           }
           return mapManager.regionalMap.mapData.wallTextureMap['000000'].image;
        }
        this.getFloorTexture = function(textureKey) {
            if (textureKey === 'ffffff' || textureKey === 'bcbcbc') {
                return undefined;
            }
            if (mapManager.regionalMap.mapData.floorTextureMap[textureKey] && mapManager.regionalMap.mapData.floorTextureMap[textureKey].image) {
                return mapManager.regionalMap.mapData.floorTextureMap[textureKey].image;
            }
            return mapManager.regionalMap.mapData.wallTextureMap['000000'].image;
        }
        this.getRoomTexture = function(textureKey) {
           if (mapManager.regionalMap.mapData.roomTextureMap[textureKey] && mapManager.regionalMap.mapData.roomTextureMap[textureKey].image) {
               return mapManager.regionalMap.mapData.roomTextureMap[textureKey].image;
           }
           console.error(`Texture ${textureKey} not found in mapManager.regionalMap.mapData.roomTextureMap!`);
           return undefined;
        }
        this.getBattleTexture = function(textureKey) {
           if (mapManager.battleMap.mapData.battleTextureMap[textureKey] && mapManager.battleMap.mapData.battleTextureMap[textureKey].image) {
               return mapManager.battleMap.mapData.battleTextureMap[textureKey].image;
           }
           console.error(`Texture ${textureKey} not found in mapManager.battleMap.mapData.battleTextureMap!`);
           return undefined;
        }
        this.init = function(regionalMap, battleMap) {
            this.initWallTextureMap(regionalMap);
            this.initFloorTextureMap(regionalMap);
            this.initRoomTextureMap(regionalMap);
            this.initBattleTextureMap(battleMap);
        }
        this.initWallTextureMap = function(regionalMap) {
            let mapKeys = Object.keys(regionalMap.mapData.wallTextureMap);
            for (let i = 0; i < mapKeys.length; i++) {
                let texture = regionalMap.mapData.wallTextureMap[mapKeys[i]];
                //console.log(mapKeys[i] + ' = ' + texture.fileName);
                let textureImage = new Image();
                textureImage.src = texture.fileName;
                textureImage.onload = function() {
                    texture.image = textureImage;
                    regionalMap.mapData.wallTextureMap[mapKeys[i]] = texture;
                }
            }
        }
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
    }

    return new TextureManager();

});
