import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload(): void {
        this.load.image('floor', 'assets/floor.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('astronaut', 'assets/astronaut.png');
        this.load.image('enemy', 'assets/enemy.png');
        
        this.load.image('avatar-mask', 'assets/avatar-mask.png');
    }

    create(): void {
        this.scene.start('initial');
    }
}