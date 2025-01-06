require.config({
});

require(['canvas', 'gameState', 'mainWindow', 'runeTable', 'partyBar', 'textWindow', 'dashBoard', 'audio', 'menu', 'controls'],
    function (Canvas, GameState, MainWindow, RuneTable, PartyBar, TextWindow, DashBoard, Audio, Menu, Controls) {
        let canvas = new Canvas();
        let gameState = new GameState();
        let mainWindow = new MainWindow();
        let runeTable = new RuneTable();
        let dashBoard = new DashBoard();
        let partyBar = new PartyBar();
        let textWindow = new TextWindow();
        let audio = new Audio();
        let menu = new Menu();
        let controls = new Controls();

        init();

        function init(){
            audio.init();
            menu.init();
            canvas.initCanvas();
            canvas.initMapDebugCanvas();
            dashBoard.load();
            gameState.load();
            setInterval(function() {draw();}, 100);
            setTimeout(function() {controls.unlock();}, 1000);
        }

        function draw() {
            dashBoard.draw();
            runeTable.draw();
            partyBar.draw();
            textWindow.draw();
            if (gameState.inBattle()) {
                mainWindow.drawBattle(gameState.getBlock());
            } else if (gameState.withinRoom()) {
                mainWindow.drawRoom(gameState.getBlock());
            }
            else if (gameState.onRegionalMap()) {
                mainWindow.drawRegionalMap(gameState.getBlock());
            }

            //console.log('Drawed at ' + Date.now());
        }

    }
);