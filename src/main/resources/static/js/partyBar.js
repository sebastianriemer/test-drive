define(['canvas', 'gameState'], function (Canvas, GameState) {
    let canvas = new Canvas();
    let gameState = new GameState();

    let returnedModule = function() {
        this.draw = function() {
           let xOffset = 95;
            for (let i = 0; i < gameState.partyMembers.length; i++) {
                canvas.contextHolder.context.drawImage(gameState.partyMembers[i].portraitImage, 0+i*xOffset, 380);
            }
        }
    };

    return returnedModule;

}
);