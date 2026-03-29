define(['eventBus', 'gameState', 'navigation', 'textureEditor'],
    function (eventBus, gameState, navigation, textureEditor) {

    const RoamingMode = function () {
        this.name = 'RoamingMode';

        this.draw = function(mainWindow) {
            mainWindow.drawRegionalMap();
        };

       this.handleInput = function(data) {
           if (data.key === "ArrowUp") navigation.moveForward();
           if (data.key === "ArrowLeft") navigation.turnLeft();
           if (data.key === "ArrowRight") navigation.turnRight();
           if (data.key === "ArrowDown") navigation.moveBackward();

            if (["1","2","3","4","5"].includes(data.key)) {
                textureEditor.applyTexture(parseInt(data.key));
            }

       };
        this.getTextForBelowMainWindow = function() {
            return 'roaming';
        };
    };

    return RoamingMode;
});
