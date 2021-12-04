require.config({
});

require(['canvas', 'gameLoader', 'worldDrawingEngine', 'runeTable', 'partyBar', 'textWindow', 'sideBoard', 'audio', 'menu', 'controls'],
    function (Canvas, GameLoader, WorldDrawingEngine, RuneTable, PartyBar, TextWindow, SideBoard, Audio, Menu, Controls) {
        let canvas = new Canvas();
        let gameLoader = new GameLoader();
        let worldDrawingEngine = new WorldDrawingEngine();
        let runeTable = new RuneTable();
        let partyBar = new PartyBar();
        let textWindow = new TextWindow();
        let sideBoard = new SideBoard();
        let audio = new Audio();
        let menu = new Menu();
        let controls = new Controls();

        init();

        function init(){
            audio.init();
            menu.init();
            canvas.initCanvas();
            canvas.initMapDebugCanvas();
            gameLoader.loadGameState();
            setInterval(function() {draw();}, 100);
            setTimeout(function() {controls.unlock();}, 1000);
        }

        function draw() {
            sideBoard.draw();
            runeTable.draw();
            partyBar.draw();
            textWindow.draw();
            worldDrawingEngine.draw();
            //console.log('Drawed at ' + Date.now());
        }

    }
);