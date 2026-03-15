 define(['eventBus'], function (eventBus) {
    const Controls = function () {
        let locked = true;

        document.addEventListener('keydown', (e) => {
            if (!locked) {
                eventBus.emit('input', { key: e.key });
            } else {
                console.log('Controls currently locked');
            }
        });

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
    }
    return new Controls();
}
);