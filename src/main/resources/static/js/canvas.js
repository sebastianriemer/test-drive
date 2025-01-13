define([], function () {
    let contextHolder = {};

    let canvas = function() {
        this.contextHolder = contextHolder;
        this.initCanvas = function() {
            window.devicePixelRatio=2;
            contextHolder.canvas = document.getElementById('canvas');
            contextHolder.context = contextHolder.canvas.getContext('2d');
            contextHolder.context.imageSmoothingEnabled = false;
        }

        this.initMapDebugCanvas = function() {
            contextHolder.mapDebugCanvas = document.getElementById('mapDebugCanvas');
            contextHolder.mapDebugContext = contextHolder.mapDebugCanvas.getContext('2d');
            contextHolder.mapDebugContext.imageSmoothingEnabled = false;
        }
        this.initBattleMapDebugCanvas = function() {
            contextHolder.mapDebugCanvas2 = document.getElementById('mapDebugCanvas2');
            contextHolder.mapDebugContext2 = contextHolder.mapDebugCanvas2.getContext('2d');
            contextHolder.mapDebugContext2.imageSmoothingEnabled = false;
        }
    }

    if (!canvas.instance) {
        canvas.instance = new canvas();
    }
    return canvas.instance;
}
);

