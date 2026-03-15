define(['eventBus', 'gameState', 'navigation'], function (eventBus, gameState, navigation) {
    const RoamingMode = function () {
        this.name = 'RoamingMode';

        this.draw = function(mainWindow) {
            mainWindow.drawRegionalMap();
        };

       this.handleInput = function(data) {

           if (data.key === "ArrowUp") {
               navigation.moveForward();
           }

           if (data.key === "ArrowLeft") {
               navigation.turnLeft();
           }

           if (data.key === "ArrowRight") {
               navigation.turnRight();
           }

           if (data.key === "ArrowDown") {
               navigation.moveBackward();
           }

       };
        this.getTextForBelowMainWindow = function() {
            return 'roaming';
        };
    };

    return RoamingMode;
});
