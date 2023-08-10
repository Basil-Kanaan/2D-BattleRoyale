import Ball from './Ball.js';

// bullet class 
export default class Bullet extends Ball {
    constructor(position, velocity, colour, radius, damage, type, shooter) {
        super(position, velocity, colour, radius);

        this.name = "Bullet";
        this.shooter = shooter;
        this.damage = damage;
        this.type = type;
    }
}