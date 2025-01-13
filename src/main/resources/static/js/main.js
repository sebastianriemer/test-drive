require.config({
});

require(['canvas', 'gameState', 'mainWindow', 'runeTable',
        'partyBar', 'textWindow', 'dashBoard',
        'audioLoader', 'audioManager', 'menu', 'controls'],
    function (canvas, gameState, mainWindow, runeTable,
        partyBar, textWindow, dashBoard,
        audioLoader, audioManager, menu, controls) {
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
                mainWindow.drawBattle(gameState.getBlockFromBattleMap());
            } else if (gameState.inRoom()) {
                mainWindow.drawRoom(gameState.getBlockFromRegionalMap());
            }
            else if (gameState.onRegionalMap()) {
                mainWindow.drawRegionalMap(gameState.getBlockFromRegionalMap());
            }

            //console.log('Drawed at ' + Date.now());
        }
        function startGame() {
            window.removeEventListener('keydown', startGame);
            window.removeEventListener('click', startGame);
            const screen = document.getElementById('blackScreen');
            if (!screen) return;
            audioManager.play('intro.start');
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
    }
);