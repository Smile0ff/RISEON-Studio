"use strict";

import "../utils/requestAnimation";
import "../utils/cancelRequestAnimation";
import { loadImage } from "../utils/loadImage";
import { getImageData } from "../utils/imageData";
import Particle from "../lib/particle";

const IMAGE_NODE_PATH = "build/images/logo.png";

let imageNodesHolder = $("#image-nodes-holder"),
    _width = 0,
    _height = 0,
    _offset = {},
    _mouse = {
        x: -10000,
        y: -10000,
    },
    _animation = null;

class ImageNodes{

    constructor(){
        this.canvas = document.querySelector("#image-nodes");
        this.ctx = this.canvas.getContext("2d");
        this.photo = null;
        this.density = 6;
        this.sensivity = 3;
        this.particles = [];
        this.imageData = null;

        _width = imageNodesHolder.outerWidth();
        _height = imageNodesHolder.outerHeight();
        _offset = imageNodesHolder.offset();

        this.canvas.width = _width;
        this.canvas.height = _height;

        loadImage(IMAGE_NODE_PATH, (photo) => {
            this.photo = photo;
            this.imageData = getImageData(_width, _height, photo);
            this.prepareParticles();
            this.render();
        });

        this._events();
    }
    _events(){
        imageNodesHolder.on("mousemove", (e) => { this.handleMove(e) });
        $(window).on("resize", (e) => { this.handleResize(e) })
    }
    prepareParticles(){
        let data = this.imageData.data;

        for(let y = 0; y < _height; y += this.density){
            for(let x = 0; x < _width; x += this.density){

                let pixel = (x + y * this.imageData.width) * 4,
                    red = data[pixel],
                    green = data[pixel + 1],
                    blue = data[pixel + 2],
                    alpha = data[pixel + 3];

                if(red <= 17 && green <= 17 && blue <= 17 && alpha <= 0) continue;

                this.particles.push(
                    new Particle(x, y, 1.5, { r: red, g: green, b: blue, a: alpha })
                );
            }
        }
    }
    updateParticles(){
        this.particles.map((particle, index) => {

            let dx = _mouse.x - particle.x,
                dy = _mouse.y - particle.y,

                angle = Math.atan2(particle.y - _mouse.y, particle.x - _mouse.x),
                distance = this.sensivity * 100 / Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

            particle.x += Math.cos(angle) * distance + (particle.ox - particle.x) * 0.05;
            particle.y += Math.sin(angle) * distance + (particle.oy - particle.y) * 0.05;
        });
    }
    drawParticles(){
        this.particles.map((particle, i) => {
            particle.draw(this.ctx);
        });
    }
    render(){
        _animation = requestAnimationFrame(() => this.render());
        this.ctx.clearRect(0, 0, _width, _height);
        
        this.updateParticles();
        this.drawParticles();
    }
    handleMove(e){
        _mouse.x = e.pageX - _offset.left;
        _mouse.y = e.pageY - _offset.top;
        return false;
    }
    handleResize(e){
        cancelAnimationFrame(_animation);

        _width = imageNodesHolder.outerWidth();
        _height = imageNodesHolder.outerHeight();
        _offset = imageNodesHolder.offset();

        this.canvas.width = _width;
        this.canvas.height = _height;

        this.particles = [];

        this.imageData = getImageData(_width, _height, this.photo);
        this.prepareParticles();
        this.render();

        return false;
    }
}

export default ImageNodes;