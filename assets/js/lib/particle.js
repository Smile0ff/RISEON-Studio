"use strict";

class Particle{

    constructor(x = 0, y = 0, radius = 10, color = {}){
        this.x = x;
        this.y = y;
        this.ox = x;
        this.oy = y;
        this.radius = radius;
        this.color = color;
    }
    draw(context){
        context.save();

        context.fillStyle = "rgba("+ this.color.r +", "+ this.color.g +", "+ this.color.b +", 1)";

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI  * 2, true);
        context.closePath();

        context.fill();

        context.restore();
    }
}

export default Particle;