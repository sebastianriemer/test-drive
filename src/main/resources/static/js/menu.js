define([], function () {

    let menu = function() {
       this.init = function() {
           document.getElementById("startFullScreen").onclick = function() {
               document.getElementById("canvas").requestFullscreen();
           };
       }
    };


    if (!menu.instance) {
        menu.instance = new menu();
    }
    return menu.instance;

}
);