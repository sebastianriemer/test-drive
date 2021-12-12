define(['gameState'], function (GameState) {
    let gameState = new GameState();
    let locked = true;

    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;
        if (!locked) {
            if (e.keyCode == '38') {
                console.log('up');
                if (gameState.withinRoom()) {
                    gameState.leaveRoom();
                } else if (gameState.onRegionalMap()) {
                    console.log('up');
                    gameState.moveForward();
                } else if (gameState.onGlobalMap()) {

                }
            }
            else if (e.keyCode == '40') {
                if (gameState.withinRoom()) {
                    gameState.leaveRoom();
                } else if (gameState.onRegionalMap()) {
                    console.log('down');
                    gameState.moveBackward();
                } else if (gameState.onGlobalMap()) {

                }
            }
            else if (e.keyCode == '37') {
                if (gameState.withinRoom()) {
                    gameState.leaveRoom();
                } else if (gameState.onRegionalMap()) {
                   console.log('left');
                   gameState.turnLeft();
                } else if (gameState.onGlobalMap()) {

                }

            }
            else if (e.keyCode == '39') {
                if (gameState.withinRoom()) {
                    gameState.leaveRoom();
                } else if (gameState.onRegionalMap()) {
                    console.log('right');
                    gameState.turnRight();
                } else if (gameState.onGlobalMap()) {

                }
            }
        } else {
            console.log('Controls currently locked');
        }

    }

    let returnedModule = function() {
        this.isLocked = function() {
            return locked;
        }
        this.lock = function() {
            console.log('Controls locked');
            locked = true;
        }
        this.unlock = function() {
            console.log('Controls unlocked');
            locked = false;
        }
    };

    return returnedModule;

}
);