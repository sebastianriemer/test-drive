define([], function () {

    const SCREEN = {
        width: 640,
        height: 480
    };

    const MARGIN = 10;
    const GAP = 10;

    const LAYOUT = {
        runeTableWindow: {
            x: MARGIN,
            y: MARGIN,
            width: 70,
            height: 285
        },

        mainWindow: {
            x: MARGIN + 70 + GAP,
            y: MARGIN,
            width: 340,
            height: 285
        },

        interplayWindow: {
            x: MARGIN + 70 + GAP + 340 + GAP,
            y: MARGIN,
            width: 190,
            height: 285
        },

        textWindow: {
            x: MARGIN + 70 + GAP,
            y: MARGIN + 285 - 20,
            width: 340,
            height: 30
        },

        partyBar: {
            x: MARGIN,
            y: MARGIN + 285 + GAP + 30 + GAP,
            width: 640 - 2 * MARGIN,
            height: 110
        }
    };

    return {
        SCREEN,
        LAYOUT
    };
});