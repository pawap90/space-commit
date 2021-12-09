import Phaser from 'phaser';

import MainMenuScene from './scenes/MainMenuScene';
import PreloaderScene from './scenes/PreloaderScene';
import GameScene from './scenes/GameScene';
import GameUIScene from './scenes/GameUIScene';

const height = window.outerHeight * 0.6;
const zoom = ((height * 100) / 1080) / 100;

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [PreloaderScene, MainMenuScene, GameScene, GameUIScene],
    backgroundColor: '#222034',
    zoom
};

export default new Phaser.Game(config);