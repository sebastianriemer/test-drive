define(['eventBus', 'textureManager', 'mapManager'], function (eventBus, textureManager, mapManager) {
    const RoomMode = function () {
        this.name = 'RoomMode';

        this.draw = function(mainWindow) {
            textureManager.getRoomTexture(
               mapManager.getBlockFromRegionalMap().center
           )
            mainWindow.drawRoom(texture);
        };

        this.handleInput = function (data) {
            if (data.key === 'ArrowUp') {
                console.log('Move selector up');
                eventBus.emit('moveSelector', { direction: 'up' });
            }
        };
        this.getTextForBelowMainWindow = function() {
            return 'in room';
        };
    };

    return CombatMode;
});
