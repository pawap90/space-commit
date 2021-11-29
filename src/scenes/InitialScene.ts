import Phaser from 'phaser';

import { Contributor } from '../Contributor';

export default class InitialScene extends Phaser.Scene {
    private hero!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

    constructor() {
        super('initial');
    }

    create(): void {

        this.add.image(400, 570, 'ground');
        this.hero = this.physics.add.image(0, 0, 'hero');

        console.info('Contributor: ' + Contributor.username)
        console.info('Commit: ' + Contributor.commit)
        console.info('Commig message: ' + Contributor.message)
        
        this.hero.setCollideWorldBounds(true);
        this.hero.setBounce(1, 1);
        this.hero.setVelocityX(300);
    }
}