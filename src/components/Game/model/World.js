import Player from './Player.js';
import Ammo from './Ammo.js';
import Pair from './Pair.js';
import Bullet from './Bullet.js';
import Camera from './Camera.js';
import Ai from './Ai.js';
import Wall from './Wall.js';


function randint(n) {
    return Math.round(Math.random() * n);
}

function rand(n) {
    return Math.random() * n;
}

let playerHealth = 100;
const AiSpeed = 12;

// Model! World
export default class World {
    constructor(collisionHandler, ammunitionFactory, aiFactory, difficulty, canvas) {

        let normalAi, sprayAi, bossAi;

        // change game settings based on difficulty
        switch (difficulty) {
            case "easy":
                playerHealth = 400;
                normalAi = 8;
                sprayAi = 2;
                bossAi = 1;
                break;
            case "medium":
                playerHealth = 200;
                normalAi = 10;
                sprayAi = 3;
                bossAi = 1;
                break;
            case "hard":
                playerHealth = 100;
                normalAi = 12;
                sprayAi = 4;
                bossAi = 2;
                break;
        }

        // inject collision handler and factories
        this.collisionHandler = collisionHandler;
        this.ammunitionFactory = ammunitionFactory;
        this.aiFactory = aiFactory;

        this.ammunitionFactory.setWorld(this);
        this.aiFactory.setWorld(this);

        // init world size and mouse
        this.mouse = new Pair(0, 0);
        this.end = false;

        // the logical width and height of the world
        this.width = 5000;
        this.height = 5000;

        //game canvas
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");

        // generate game objects and map
        this.actors = []; // all actors on this stage (monsters, player, boxes, ...)
        this.generateMap();
        this.generateAmmo(60, "pistol");
        this.generateAmmo(40, "railgun");
        this.generateAmmo(20, "cannon");
        this.generateAi(normalAi, "normal");
        this.generateAi(sprayAi, "spray");
        this.generateAi(bossAi, "boss");
        this.generateBoundaries();
        this.generateObstacles();

        // create new player and add to world
        this.spawnPlayer();

        // create new camera
        this.camera = new Camera(canvas, this.player, this);
    }

    // update mouse position
    updateMouse(event) {
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
    }

    // adds player to actors and world
    spawnPlayer() {
        // init player data
        const velocity = new Pair(0, 0);
        const radius = 20;
        const colour = 'rgba(77,153,79,1)';

        while (true) {

            const x = randint(this.width - radius * 2) + radius;
            const y = randint(this.height - radius * 2) + radius;
            const position = new Pair(x, y);

            this.player = null;
            this.addPlayer(new Player(position, velocity, colour, radius, playerHealth));

            let isColliding = false;

            // for each actor, take a step and perform operations
            for (let i = 0; i < this.actors.length; i++) {

                const actor = this.actors[i];
                const className = actor.constructor.name;

                if (actor === this.player) {
                    continue;
                }

                switch (className) {
                    case "Ai":
                        if (this.collisionHandler.isCollision["ballball"](this.player, actor)) {
                            isColliding = true;
                        }
                        break;

                    case "Wall":
                        if (this.collisionHandler.isCollision["ballwall"](this.player, actor)) {
                            isColliding = true;
                        }
                        break;
                }

                if (isColliding) break;
            }

            if (!isColliding) break;
            else this.removePlayer();
        }
    }

    // player shoot event handler
    playerShoot(event) {
        if (this.player.ammo[this.player.weapon] > 0) {
            const playerRelativePos = new Pair(this.player.x - this.camera.x, this.player.y - this.camera.y);
            const mouseRelativePos = this.camera.getMousePos(this.mouse);

            const position = this.player.turret_position.copy();
            const velocity = mouseRelativePos.sub(playerRelativePos).normalize().mult(25);

            this.shootBullet(position, velocity, this.player.weapon, this.player);
            this.player.ammo[this.player.weapon]--;
        }
    }

    // generate map background
    generateMap() {

        let context = document.createElement("canvas").getContext("2d");
        context.canvas.width = this.width;
        context.canvas.height = this.height;

        const cell = 34;
        const square = 33;

        const rows = Math.floor(this.width / cell);
        const columns = Math.floor(this.height / cell);

        const purple = `rgba(${[56, 8, 82].join()},1)`;
        const yellow = `rgba(${[219, 214, 46].join()},1)`;
        const green = `rgba(${[33, 171, 26].join()},1)`;
        const blue = `rgba(${[0, 204, 197].join()},1)`;

        context.save();
        let x = 0, i = 0;
        for (; i < rows; x += cell, i++) {

            let y = 0, j = 0;
            for (; j < columns; y += cell, j++) {

                if (j < columns / 2 && i < rows / 2) {
                    context.fillStyle = purple;
                } else if (j < columns / 2 && i >= rows / 2) {
                    context.fillStyle = green;
                } else if (j >= columns / 2 && i < rows / 2) {
                    context.fillStyle = blue;
                } else {
                    context.fillStyle = yellow;
                }

                context.beginPath();
                context.rect(x, y, square, square);
                context.fill();
                context.closePath();
            }
        }
        context.restore();

        // store the generate map as this image texture
        this.map_bg = new Image();
        this.map_bg.src = context.canvas.toDataURL("image/png");

        context = null;

    }

    // create walls all over the map
    generateObstacles() {
        this.addActor(new Wall(new Pair(this.width / 2 + 100, this.height / 2 - 250), 'rgba(77,77,77,1)', 75, 75));
        this.addActor(new Wall(new Pair(this.width / 2 - 400, this.height / 2 + 50), 'rgba(77,77,77,1)', 70, 210));
        this.addActor(new Wall(new Pair(this.width / 2 + 223, this.height / 2 + 323), 'rgba(77,77,77,1)', 200, 200));

        this.addActor(new Wall(new Pair(400, 400), 'rgba(77,77,77,1)', 300, 70));
        this.addActor(new Wall(new Pair(400, 470), 'rgba(77,77,77,1)', 70, 230));


        this.addActor(new Wall(new Pair(1600, 1300), 'rgba(77,77,77,1)', 400, 100));
        this.addActor(new Wall(new Pair(1030, 1800), 'rgba(77,77,77,1)', 200, 500));

    }

    // spawn ammo randomly based on type over the map
    generateAmmo(n, type) {
        for (let i = 0; i < n; i++) {
            const ammo = this.ammunitionFactory.getAmmo(type);
            this.addActor(ammo);
        }
    }

    // randomly spawn ai based on type on the map
    generateAi(n, type) {
        for (let i = 0; i < n; i++) {
            const x = randint(this.width - 2 * 50) + 50;
            const y = randint(this.height - 2 * 50) + 50;
            const position = new Pair(x, y);

            const ai = this.aiFactory.getAi(position, type);
            this.addActor(ai);
        }
    }

    // generate walls boundaries on all 4 sides of world
    generateBoundaries() {
        const leftWall = new Wall(new Pair(-this.width, -this.height), 'rgba(77,77,77,1)', this.width, 3 * this.height);
        const topWall = new Wall(new Pair(0, -this.height), 'rgba(77,77,77,1)', this.width, this.height);
        const rightWall = new Wall(new Pair(this.width, -this.height), 'rgba(77,77,77,1)', this.width, 3 * this.height);
        const bottomWall = new Wall(new Pair(0, this.height), 'rgba(77,77,77,1)', this.width, this.height);

        this.addActor(leftWall);
        this.addActor(topWall);
        this.addActor(rightWall);
        this.addActor(bottomWall);
    }

    addPlayer(player) {
        this.addActor(player);
        this.player = player;
    }

    removePlayer() {
        this.removeActor(this.player);
        this.player = null;
    }

    addActor(actor) {
        this.actors.push(actor);
    }

    removeActor(actor) {
        const index = this.actors.indexOf(actor);
        if (index !== -1) {
            this.actors.splice(index, 1);
        }
    }

    // Take one step in the animation of the game.  Do this by asking each of the actors to take a single step.
    // NOTE: Careful if an actor died, this may break!
    step() {
        // create frame of reference
        this.camera.x = this.player.x - this.camera.width / 2;
        this.camera.y = this.player.y - this.camera.height / 2;

        // for each actor, take a step and perform operations
        for (let i = 0; i < this.actors.length; i++) {

            const actor1 = this.actors[i];
            const className = actor1.constructor.name;
            console.log("checking actor className")

            // if actor1 is ai or player, change conditions based on terrain
            if (className == "Ai" || className == "Player") {
                console.log("player or ai")
                if (actor1.position.y > this.height / 2) {
                    if (actor1.position.x <= this.width / 2) {
                        actor1.condition = "fast";
                    } else {
                        actor1.condition = "slowed";
                    }
                } else {
                    if (actor1.position.x <= this.width / 2) {
                        actor1.condition = "hurt";
                    } else {
                        actor1.condition = "normal";
                    }
                }
            }

            // if actor1 is ai, move/shoot depending on position to player
            if (className == "Ai") {
                const AiToPlayerVector = this.player.position.copy().sub(actor1.position);
                const x = AiToPlayerVector.x;
                const y = AiToPlayerVector.y;

                if (x * x + y * y >= 300 * 300) {
                    actor1.velocity = AiToPlayerVector.normalize().mult(AiSpeed);
                    clearInterval(actor1.interval);
                    actor1.interval = null;

                } else {
                    actor1.velocity = new Pair(0, 0);
                    if (actor1.interval === null) {

                        actor1.interval = setInterval((world, actor, player) => {
                            const position = actor.turret_position.copy();
                            const velocity = player.position.copy().sub(actor.position).normalize().mult(25);

                            world.shootBullet(position, velocity, actor.weapon, actor);
                        }, 1000, this, actor1, this.player);
                    }
                }
            }

            // actor1 takes a step
            actor1.step();

            // if actor1 is an ai, player, or bullet, check collisions
            if (className == "Ai" || className == "Player" || className == "Bullet") {
                for (let j = 0; j < this.actors.length; j++) {

                    const actor2 = this.actors[j];
                    const className2 = actor2.constructor.name;

                    // ignore actor 2 if they are a bullet or ammo. smart :)
                    if (className === "Bullet" && (className2 === "Bullet" || className2 === "Ammo") || i === j) {
                        continue;
                    }

                    this.collisionHandler.handle(actor1, actor2);
                }
            }
        }
        console.log("step taken 1")
    }

    // return the first actor at coordinates (x,y) return null if there is no such actor
    getActor(x, y) {
        for (let i = 0; i < this.actors.length; i++) {
            if (this.actors[i].x === x && this.actors[i].y === y) {
                return this.actors[i];
            }
        }
        return null;
    }

    // shoot a bullet for some ai based on type
    shootBullet(position, velocity, type, shooter) {

        let bullet;
        if (type === "railgun") {
            bullet = this.ammunitionFactory.getBullet(position, velocity, type, shooter);
            this.addActor(bullet);

            setTimeout((world, bullet) => {
                world.addActor(bullet);
            }, 100, this, this.ammunitionFactory.getBullet(position, velocity, type, shooter));

            setTimeout((world, bullet) => {
                world.addActor(bullet);
            }, 200, this, this.ammunitionFactory.getBullet(position, velocity, type, shooter));

        } else {
            bullet = this.ammunitionFactory.getBullet(position, velocity, type, shooter);
            this.addActor(bullet);
        }
    }
}
