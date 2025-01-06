define([], function () {
    let contextHolder = {};

    let returnedModule = function() {
        this.contextHolder = contextHolder;
        this.initCanvas = function() {
            window.devicePixelRatio=2;
            var scale = window.devicePixelRatio;
            contextHolder.canvas = document.getElementById('canvas');
            contextHolder.context = canvas.getContext('2d');
            contextHolder.context.imageSmoothingEnabled = false;

           /* contextHolder.canvas.width = Math.floor(640 * scale);
            contextHolder.canvas.height = Math.floor(480 * scale);

            contextHolder.context.scale(scale, scale);
            contextHolder.context.font = '10px Arial';
            contextHolder.context.textAlign = 'center';
            contextHolder.context.textBaseline = 'middle';

            var x = 640 / 2;
            var y = 480 / 2;

            var textString = "GEEKS FOR GEEKS";
            contextHolder.context.fillText(textString, x, y);*/
        }

        this.initMapDebugCanvas = function() {
            contextHolder.mapDebugCanvas = document.getElementById('mapDebugCanvas');
            contextHolder.mapDebugContext = mapDebugCanvas.getContext('2d');
            contextHolder.mapDebugContext.imageSmoothingEnabled = false;
        }
    }

    return returnedModule;
}
);

