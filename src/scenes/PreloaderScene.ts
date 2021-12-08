import Phaser from 'phaser';
import { Contributor } from '../Contributor';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload(): void {
        this.load.image('floor', 'assets/floor.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('astronaut', 'assets/astronaut.png');
        this.load.image('enemy', 'assets/enemy.png');
        
        this.load.image('logo', 'assets/logo.png');
        this.load.image('avatar', Contributor.avatar_url);
        this.load.image('avatar-mask', 'assets/avatar-mask.png');
        this.load.image('menu-avatar-mask', 'assets/menu-avatar-mask.png');
    }

    create(): void {
        this.scene.start('main-menu');
    }
}