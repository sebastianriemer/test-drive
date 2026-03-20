require.config({
});

require(['canvas', 'gameState', 'gameModeManager', 'mainWindow', 'runeTable',
        'partyBar', 'textWindow', 'dashBoard',
        'audioLoader', 'audioManager', 'menu', 'controls', 'mapManager'],
    function (canvas, gameState, gameModeManager, mainWindow, runeTable,
        partyBar, textWindow, dashBoard,
        audioLoader, audioManager, menu, controls, mapManager) {
        console.log('main: begin');

        function initGame(){
            console.log('main.init()...');
            menu.init();
            canvas.initCanvas();
            canvas.initMapDebugCanvas();
            canvas.initBattleMapDebugCanvas();
            console.log('dashBoard outside');
            console.log(dashBoard);
            console.log('dashBoard inside');
            console.log(dashBoard);
            dashBoard.load();


            gameState.load().then(() => {
                console.log('Game state loaded successfully!');
                startRenderingLoop();
            });
        }

        function startRenderingLoop() {
            setInterval(function() {draw();}, 100);
            setTimeout(function() {controls.unlock();}, 1000);
        }

        function draw() {
            dashBoard.draw();
            runeTable.draw();
            partyBar.draw();
            textWindow.draw();
            //gameState.draw();
            // mainWindow.draw();
            drawDebugMap();
            drawDebugBattleMap();
            // TODO remove painting the visual blocks of debug map within mainWindow -> side effect
            mainWindow.draw(gameModeManager.getMode());

            //console.log('Drawed at ' + Date.now());
        }
        function startGame() {
            window.removeEventListener('keydown', startGame);
            window.removeEventListener('click', startGame);
            const screen = document.getElementById('blackScreen');
            if (!screen) return;
            //audioManager.play('intro.start');
            // Change the text content for added effect
            screen.querySelector('p').textContent = 'Los geht\'s...';

            // Add the transition animation to fade out
            screen.style.animation = 'fadeToWhite 6s forwards';

            setTimeout(() => {
                console.log('Animation at halfway point!');
                initGame(); // Call your game initialization logic
            }, 2000); // Halfway through a 2-second animation
            // After the animation completes, hide the screen and start the game
            screen.addEventListener('animationend', () => {
                screen.classList.add('hidden'); // Hide the black screen

            });
        }

        audioLoader.preloadAll().then(() => {
        console.log('All sounds preloaded.');
        // Show the black screen when the page loads
                document.getElementById('blackScreen').classList.remove('hidden');

                // Add event listeners for user interaction to start the game
                window.addEventListener('keydown', startGame);
                window.addEventListener('click', startGame);
        });

        function drawDebugMap() {
            if (mapManager.regionalMap.mapImage) {
                canvas.contextHolder.mapDebugContext.drawImage(mapManager.regionalMap.mapImage, 0, 0, 69*4, 69*4);
                drawPartyPositionOnMap(canvas.contextHolder.mapDebugContext);
            }
        }

        function drawDebugBattleMap() {
            if (mapManager.battleMap.mapImage) {
                canvas.contextHolder.mapDebugContext2.drawImage(mapManager.battleMap.mapImage, 0, 0, 69*4, 69*4);
                drawPartyPositionOnMap(canvas.contextHolder.mapDebugContext2);
            }
        }

        function drawPartyPositionOnMap(mapDebugContext) {
                mapDebugContext.fillStyle = '#E200BD';
                mapDebugContext.fillRect(
                    mapManager.regionalMap.partyPosition.x*3*4,
                    mapManager.regionalMap.partyPosition.y*3*4,
                    3*4,
                    3*4);
            }
    }


);