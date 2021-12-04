define(['gameLoader'], function (GameLoader) {
    let gameLoader = new GameLoader();
    let locked = true;

    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;
        if (!locked) {
            if (e.keyCode == '38') {
                console.log('up');
                gameLoader.moveForward();
            }
            else if (e.keyCode == '40') {
                console.log('down');
                gameLoader.moveBackward();
            }
            else if (e.keyCode == '37') {
               console.log('left');
               gameLoader.turnLeft();
            }
            else if (e.keyCode == '39') {
               console.log('right');
               gameLoader.turnRight();
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