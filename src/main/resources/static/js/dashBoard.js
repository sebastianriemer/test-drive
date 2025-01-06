define(['canvas'], function (Canvas) {
    let canvas = new Canvas();
    let resources = {};

    let returnedModule = function() {
        this.name = 'DashBoard';
        this.resources = resources;
        this.load = function() {
            fetch('/ajax/dashBoard')
                .then(response => response.json())
                .then(data => {
                    initDashBoard(data);
                });
        }
        this.loaded = function() {
            if (resources !== undefined
                && resources.portraitPlaceholderImage !== undefined
                ) {
                    return true;
            }
            return false;
        }
        this.draw = function() {
            let dashBoardColor = Math.random() > 0.5? '#ae6447' : '#af6548';
            // oberer Rand
            canvas.contextHolder.context.fillStyle = dashBoardColor;
            canvas.contextHolder.context.fillRect(0, 0, 640, 10);
            // linker Rand
            canvas.contextHolder.context.fillStyle = dashBoardColor;
            canvas.contextHolder.context.fillRect(0, 0, 10, 470);
            // rechter Rand
            canvas.contextHolder.context.fillRect(630, 0, 10, 470);

            // Rahmen um MainWindow
            canvas.contextHolder.context.fillRect(80, 10, 10, 295);
            canvas.contextHolder.context.fillRect(355, 10, 10, 295);
            canvas.contextHolder.context.fillRect(0, 295, 640, 10);

            // Kasten für Text unter mainWindow
            canvas.contextHolder.context.fillRect(90, 275, 265, 30);

            // Oberer Rand von PartyBar
            canvas.contextHolder.context.fillRect(0, 360, 640, 10);

            // Unterer Rand von PartyBar
            canvas.contextHolder.context.fillRect(0, 450, 640, 20);

        }
    };



    function initDashBoard(dashBoard) {
        let portraitPlaceholderImage = new Image();
        portraitPlaceholderImage.src = dashBoard.portraitPlaceholderImageFilename;
        portraitPlaceholderImage.onload = function() {
            resources.portraitPlaceholderImage = portraitPlaceholderImage;
        }

    }

    return returnedModule;

}
);