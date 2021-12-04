define([], function () {
    let contextHolder = {};

    let returnedModule = function() {
        this.contextHolder = contextHolder;
        this.initCanvas = function() {
            contextHolder.canvas = document.getElementById('canvas');
            contextHolder.context = canvas.getContext('2d');
        }

        this.initMapDebugCanvas = function() {
            contextHolder.mapDebugCanvas = document.getElementById('mapDebugCanvas');
            contextHolder.mapDebugContext = mapDebugCanvas.getContext('2d');
        }
    }

    return returnedModule;
}
);

