define(['canvas', 'gameState', 'dashBoard'], function (Canvas, GameState, DashBoard) {
    let canvas = new Canvas();
    let gameState = new GameState();
    let dashBoard = new DashBoard();
    let xOffset = 100;
    let yOffset = 370;

    let returnedModule = function() {
        this.draw = function() {
            for (let i = 0; i < gameState.partyMembers.length; i++) {
                drawPortrait(i, gameState.partyMembers[i].portraitImage);
                printName(i, gameState.partyMembers[i]);
                drawHealthBar(i, gameState.partyMembers[i].maximumHealth, gameState.partyMembers[i].currentHealth);
                drawManaBar(i, gameState.partyMembers[i].maximumMana, gameState.partyMembers[i].currentMana);
            }
            // Platzhalter-Portraits zeichnen
            for (let i = gameState.partyMembers.length; i < 6; i++) {
                drawPortrait(i, dashBoard.resources.portraitPlaceholderImage);
                drawHealthBar(i, 0, 0);
                drawManaBar(i,  0, 0);
            }
        }
    };

    return returnedModule;

    function drawPortrait(partyMemberPosition, portraitImage) {
        canvas.contextHolder.context.drawImage(portraitImage, 10+partyMemberPosition*xOffset, yOffset);
    }

    function printName(partyMemberPosition, partyMember) {
        canvas.contextHolder.context.resetTransform();
        canvas.contextHolder.context.fillStyle = '#ffd800';
        canvas.contextHolder.context.strokeStyle = '#000000';
        canvas.contextHolder.context.font = "22px metalMania";

        canvas.contextHolder.context.fillText(partyMember.name, 40+partyMemberPosition*xOffset, yOffset + 96);
        canvas.contextHolder.context.strokeText(partyMember.name, 40+partyMemberPosition*xOffset, yOffset + 96);
        canvas.contextHolder.context.fill();
        canvas.contextHolder.context.stroke();
    }

    function drawHealthBar(partyMemberPosition, maximumHealth, currentHealth) {
        let fullBarHeight = 80;
        canvas.contextHolder.context.fillStyle = '#ee8888';
        canvas.contextHolder.context.fillRect(90+partyMemberPosition*xOffset, yOffset, 10, fullBarHeight);
        let currentBarHeight = fullBarHeight * currentHealth / maximumHealth;
        canvas.contextHolder.context.fillStyle = '#ff0000';
        canvas.contextHolder.context.fillRect(90+partyMemberPosition*xOffset, yOffset, 10, currentBarHeight);
    }


    function drawManaBar(partyMemberPosition, maximumMana, currentMana) {
        let fullBarHeight = 80;
        canvas.contextHolder.context.fillStyle = '#8888ee';
        canvas.contextHolder.context.fillRect(100+partyMemberPosition*xOffset, yOffset, 10, fullBarHeight);
        let currentBarHeight = fullBarHeight * currentMana / maximumMana;
        canvas.contextHolder.context.fillStyle = '#0000ff';
        canvas.contextHolder.context.fillRect(100+partyMemberPosition*xOffset, yOffset, 10, currentBarHeight);
    }

}
);