"use strict";

const IMG_WIDTH_IN_PERCENTS = 20;

export function getImageData(width, height, img){
    let canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        cx = 0,
        cy = 0,
        imageData = null,
        resizedWidth = 0,
        resizedHeight = 0,
        imageRatio = img.height / img.width;

    canvas.width = width;
    canvas.height = height;

    resizedWidth = width / 100 * IMG_WIDTH_IN_PERCENTS;
    resizedHeight = resizedWidth * imageRatio;

    cx = (width - resizedWidth) / 2;
    cy = (height - resizedHeight) / 2;

    context.drawImage(img, 0, 0, img.width, img.height, cx, cy, resizedWidth, resizedHeight);

    imageData = context.getImageData(0, 0, width, height);

    return imageData;
}