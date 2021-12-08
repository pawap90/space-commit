import Phaser from 'phaser';

import MainMenuScene from './scenes/MainMenuScene';
import PreloaderScene from './scenes/PreloaderScene';
import GameScene from './scenes/GameScene';
import GameUIScene from './scenes/GameUIScene';

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
    scene: [PreloaderScene, MainMenuScene, GameScene, GameUIScene],
    backgroundColor: '#222034'
};

export default new Phaser.Game(config);