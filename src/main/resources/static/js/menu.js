define([], function () {

    let returnedModule = function() {
       this.init = function() {
           document.getElementById("startFullScreen").onclick = function() {
               document.getElementById("canvas").requestFullscreen();
           };
       }
    };

    return returnedModule;

}
);