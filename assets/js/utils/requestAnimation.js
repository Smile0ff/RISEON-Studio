window.requestAnimationFrame = window.requestAnimationFrame || 
                               window.webkitRequestAnimtionFrame ||
                               window.mozRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               function(callback){
                                   window.setTimeout(callback, 1000 / 60);
                               };