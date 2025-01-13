define(['gameState'], function (gameState) {

    let locked = true;

    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;
        if (!locked) {
            if (e.keyCode == '38') {
                if (gameState.inRoom()) {
                    gameState.leaveRoom();
                } else if (gameState.onRegionalMap()) {
                    console.log('up');
                    gameState.moveForward();
                } else if (gameState.onGlobalMap()) {
                    // TODO: think about this branch
                }
            }
            else if (e.keyCode == '40') {
                if (gameState.inRoom()) {
                    gameState.leaveRoom();
                } else if (gameState.onRegionalMap()) {
                    console.log('down');
                    gameState.moveBackward();
                } else if (gameState.onGlobalMap()) {
                    // TODO: think about this branch
                }
            }
            else if (e.keyCode == '37') {
                if (gameState.inRoom()) {
                    gameState.leaveRoom();
                } else if (gameState.onRegionalMap()) {
                   console.log('left');
                   gameState.turnLeft();
                } else if (gameState.onGlobalMap()) {
                    // TODO: think about this branch
                }

            }
            else if (e.keyCode == '39') {
                if (gameState.inRoom()) {
                    gameState.leaveRoom();
                } else if (gameState.onRegionalMap()) {
                    console.log('right');
                    gameState.turnRight();
                } else if (gameState.onGlobalMap()) {
                    // TODO: think about this branch
                }
            }
        } else {
            console.log('Controls currently locked');
        }

    }

    let controls = function() {
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

    if (!controls.instance) {
        controls.instance = new controls();
    }
    return controls.instance;

}
);