import Phaser from 'phaser';
import WebFont from 'webfontloader';
import SceneEventManager from '../utils/SceneEventManager';

export default class GameUIScene extends Phaser.Scene {
    private sceneEventManager: SceneEventManager;
    private gameOverMenuContainer?: Phaser.GameObjects.Container;

    private fontsLoaded = false;
    private pointsText?: Phaser.GameObjects.Text;

    constructor() {
        super('game-ui');

        this.sceneEventManager = SceneEventManager.getInstance();
    }

    create(): void {
        /* eslint-disable  @typescript-eslint/no-this-alias */
        const scene = this;

        const fontFamily = 'Oxanium';
        WebFont.load({
            google: {
                families: [fontFamily]
            },
            active: function () {
                scene.fontsLoaded = true;
            }
        });

        this.sceneEventManager.events.on('points-updated', this.handleUpdatePointsEvent, this);
        this.sceneEventManager.events.on('game-over', this.handleGameOverEvent, this);

        this.input.keyboard.on('keyup', this.anyKey, this);

    }

    private anyKey(event: { keyCode: number }): void {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER) {
            this.scene.start('game');
        }
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC) {
            this.scene.stop('game');
            this.scene.start('main-menu');
        }
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.CAPS_LOCK) {
            this.scene.pause('game');
            this.scene.launch('pause-menu');
        }
        if(event.keyCode === Phaser.Input.Keyboard.KeyCodes.BACKSPACE) {
            this.scene.stop('pause-menu');
            this.scene.run('game');
        }
        
    }

    private addGameOverMenuComponents(fontFamily: string, titleSize: string, smallLabelSize: string): void {
        this.gameOverMenuContainer = this.add.container(0, 0);

        const gameOverText = this.make.text({ x: 0, y: 0, text: 'Game over', style: { fontFamily: fontFamily, fontSize: titleSize, color: '#ffffff' } });
        gameOverText?.setPosition(this.cameras.main.width / 2 - (gameOverText.width / 2), 200);

        const restartText = this.make.text({ x: 0, y: 0, text: 'Press Enter to restart or Esc to return to the main menu', style: { fontFamily: fontFamily, fontSize: smallLabelSize, color: '#ffffff' } });
        restartText?.setPosition(this.cameras.main.width / 2 - (restartText.width / 2), gameOverText.height * 2 + gameOverText.y);

        this.gameOverMenuContainer.add(gameOverText);
        this.gameOverMenuContainer.add(restartText);
    }

    private handleUpdatePointsEvent(points: number): void {
        if (!this.pointsText || !this.pointsText.scene) {
            if (this.fontsLoaded)
                this.createPointsLabel('Oxanium', '26px');
            else
                this.createPointsLabel('Verdana', '22px');
        }

        this.pointsText?.setText(points.toLocaleString());
    }

    private handleGameOverEvent(): void {
        if (this.fontsLoaded)
            this.addGameOverMenuComponents('Oxanium', '42px', '26px');
        else
            this.addGameOverMenuComponents('Verdana', '40px', '22px');
    }


    private createPointsLabel(fontFamily: string, labelSize: string) {
        this.pointsText = this.add.text(0, 0, '000000', { fontFamily: fontFamily, fontSize: labelSize, color: '#ffffff' });
        this.pointsText.setOrigin(0, 0);
        this.pointsText.setPosition(100, this.pointsText.height);
    }
}