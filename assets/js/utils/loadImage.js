"use strict";

export function loadImage(path, cb){
    let img = new Image();

    img.onload = () => cb(img);
    img.src = path;
}