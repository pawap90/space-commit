import Phaser from 'phaser';

import { Contributor } from '../Contributor';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload(): void {
        this.load.image('hero', Contributor.avatar_url);
        
        this.load.image('ground', 'assets/ground.png');
    }

    create(): void {
        this.scene.start('initial');
    }
}