import Phaser from 'phaser';

import { Contributor } from '../Contributor';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload(): void {
        this.load.image('floor', 'assets/floor.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('character', 'assets/character.png');
        this.load.image('enemy', 'assets/enemy.png');
    }

    create(): void {
        this.scene.start('initial');
    }
}