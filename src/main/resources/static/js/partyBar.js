define(['canvas', 'gameLoader'], function (Canvas, GameLoader) {
    let canvas = new Canvas();
    let gameLoader = new GameLoader();

    let returnedModule = function() {
        this.draw = function() {
           let xOffset = 95;
            for (let i = 0; i < gameLoader.partyMembers.length; i++) {
                canvas.contextHolder.context.drawImage(gameLoader.partyMembers[i].portraitImage, 0+i*xOffset, 380);
            }
        }
    };

    return returnedModule;

}
);