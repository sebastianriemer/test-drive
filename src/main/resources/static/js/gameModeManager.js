define(['eventBus'], function (eventBus) {
    const GameModeManager = function () {
        let currentMode = null;

        this.setMode = function (mode) {
            console.log('Setting mode to: ' + mode.name);
            currentMode = mode;
        };
        this.getMode = function () {
            return currentMode;
        };

        eventBus.on('input', (data) => {
            if (currentMode && currentMode.handleInput) {
                currentMode.handleInput(data); // Delegate input to the active mode
            }
        });
    };

    return new GameModeManager(); // Singleton
});
