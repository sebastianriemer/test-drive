define(['eventBus', 'textureManager', 'mapManager'], function (eventBus, textureManager, mapManager) {
    const CombatMode = function () {
        this.name = 'CombatMode';

        this.draw = function(mainWindow) {
            const texture =
                textureManager.getBattleTexture(
                    mapManager.getBlockFromBattleMap().center
                );

            mainWindow.drawBattle(texture);
        };

        this.handleInput = function (data) {
            if (data.key === 'ArrowUp') {
                console.log('Move selector up');
                eventBus.emit('moveSelector', { direction: 'up' });
            }
        };
        this.getTextForBelowMainWindow = function() {
            return 'in battle';
        };
    };

    return CombatMode;
});
