import Pair from './Pair.js';

// camera that pans around the world with player in it's center
// uses canvas
export default class Camera {
    constructor(canvas, player, world) {
        this.canvas = canvas;
        this.actors = world.actors;
        this.world = world;

        // the logical width and height of the stage
        this.width = canvas.width;
        // console.log(canvas.width, canvas.height);
        // console.log(canvas.clientWidth, canvas.clientHeight);
        this.height = canvas.height;

        // create frame of reference
        this.x = player.x - this.width / 2;
        this.y = player.y - this.height / 2;

        this.position = new Pair(this.x, this.y);
    }

    // check camera within world boundaries
    viewWithin() {
        return this.x >= 0
            && this.y >= 0
            && this.x + this.width <= this.world.width
            && this.y + this.height <= this.world.height;
    }

    draw() {
        // console.log(this.width, this.height);
        var context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.width, this.height);

        var x = this.x, y = this.y;

        // if camera not in world boundaries, make it go back
        if (!this.viewWithin()) {
            if (x < 0) {
                this.x = 0;
            }
            if (y < 0) {
                this.y = 0;
            }
            if (x + this.width > this.world.width) {
                this.x = this.world.width - this.width;
                this.position.x = this.x;
            }
            if (y + this.height > this.world.height) {
                this.y = this.world.height - this.height;
                this.position.y = this.y;
            }
        }

        // draw map relative to camera
        context.drawImage(this.world.map_bg, 0, 0, this.world.map_bg.width, this.world.map_bg.height,
            -this.x, -this.y, this.world.map_bg.width, this.world.map_bg.height);

        for (var i = 0; i < this.actors.length; i++) {
            this.actors[i].draw(context, this);
        }

        const center = new Pair(this.width / 2, this.height / 2);
        const scoreTxt = "SCORE: " + this.world.player.score;
        const ammoTxt = `AMMO: ${this.world.player.ammo[this.world.player.weapon]} (${this.world.player.weapon})`;
        const measure = {};

        const drawText = (context, text, x, y, font, gradientColors, align = "left") => {
            context.save();
            context.font = font;
            measure.width = context.measureText(text).width;
            x = Math.floor(x);
            y = Math.floor(y);

            if (align === "center"){
                x -= measure.width/2;
            } else if (align === "right") {
                x -= measure.width;
            }

            const gradient = context.createLinearGradient(x, y, x + measure.width, y);
            const gradLen = !(gradientColors.length - 1) ? 1 : gradientColors.length - 1 ;

            gradientColors.forEach((color, index) => gradient.addColorStop(index / (gradLen), color));

            context.fillStyle = gradient;
            context.fillText(text, x, y);
            context.strokeText(text, x, y);
            context.restore();
        };

        if (this.world.end) {
            const gradient = context.createRadialGradient(center.x, center.y, 200, center.x, center.y, 300);
            gradient.addColorStop("0", "gray");
            gradient.addColorStop("1.0", "black");

            context.fillStyle = gradient;
            context.rect(center.x - 300, center.y - 150, 600, 300);
            context.fill();

            context.beginPath();
            context.fillStyle = "white";
            context.rect(center.x - 280, center.y - 130, 560, 260);
            context.fill();
            context.stroke();
            context.closePath();

            let GOtext = "GAME OVER";
            drawText(context, GOtext, center.x, center.y, "bold 60px Verdana", ["black"], "center");

            drawText(context, scoreTxt, center.x, center.y + 70, "50px Verdana", ["magenta", "blue", "red"], "center");
        } else {
            drawText(context, scoreTxt, this.width - 15, this.height - 15, "35px Verdana", ["magenta", "blue", "red"], "right");
            drawText(context, ammoTxt, 10, this.height - 15, "35px Verdana", ["magenta", "blue", "red"]);
        }
    }

    // get mouse pos relative to camera
    getMousePos(mouse) {
        var rect = this.canvas.getBoundingClientRect();
        return new Pair(mouse.x - rect.left, mouse.y - rect.top);
    }
}