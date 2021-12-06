import Phaser from 'phaser';

import PreloaderScene from './scenes/PreloaderScene';
import InitialScene from './scenes/InitialScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1900,
    height: 940,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [PreloaderScene, InitialScene],
    backgroundColor: '#222034'
};

export default new Phaser.Game(config);