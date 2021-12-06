import Phaser from 'phaser';
import ControllerKeys from '../utils/ControllerKeys';

export default class InitialScene extends Phaser.Scene {
    private characterSprite!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

    private controllerKeys!: ControllerKeys;

    private characterSpeed = 30;
    private characterJumpSpeed = 30;
    private characterIsJumping = false;

    constructor() {
        super('initial');
    }

    create(): void {

        this.controllerKeys = new ControllerKeys(this, 'wasd');

        // Setup floor
        const floorSprite = this.add.image(0, 0, 'floor');
        floorSprite.setOrigin(0, 0);
        floorSprite.setPosition(0, this.cameras.main.height - floorSprite.height);

        // Setup floor body
        const floorBody = this.add.rectangle(0, this.cameras.main.height - floorSprite.height + 20, floorSprite.width - 20, floorSprite.height - 20);
        floorBody.setOrigin(0, 0);
        this.physics.add.existing(floorBody, true);
        (floorBody.body as Phaser.Physics.Arcade.Body).debugBodyColor = 0x018852;

        // Setup sky
        const skySprite = this.add.image(0, 0, 'sky');
        skySprite.setOrigin(0, 0);
        skySprite.setPosition(0, 0);

        // Setup character
        this.characterSprite = this.physics.add.image(0, 0, 'character');
        this.characterSprite.setOrigin(0, 0);
        this.characterSprite.setCollideWorldBounds(true);
        this.characterSprite.setPosition(0, (this.cameras.main.height - this.characterSprite.height) / 2);
        this.characterSprite.setBounce(0, 0.5);
        this.characterSprite.setMaxVelocity(500, undefined);
        this.characterSprite.setVelocityX(this.characterSpeed)
        this.physics.add.collider(this.characterSprite, floorBody, this.onCharacterCollidesWithFloor, undefined, this);
    }

    onCharacterCollidesWithFloor(go1: Phaser.GameObjects.GameObject, go2: Phaser.GameObjects.GameObject) {
        this.characterIsJumping = false;
    }

    update(time: number, delta: number) {
        super.update(time, delta);

        // Character controller
        let speed = { x: 0, y: 0 };

        if (this.controllerKeys.left.isDown)
            speed.x = -1 * this.characterSpeed * delta;

        else if (this.controllerKeys.right.isDown)
            speed.x = 1 * this.characterSpeed * delta;

        if (this.controllerKeys.jump.isDown && !this.characterIsJumping) {
            this.characterIsJumping = true;
            speed.y = -1 * this.characterJumpSpeed * delta;

            this.characterSprite.setVelocityY(speed.y);
        }

        this.characterSprite.setAccelerationX(speed.x);
    }
}