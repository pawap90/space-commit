import Phaser from 'phaser';
import ControllerKeys from '../utils/ControllerKeys';
import InfiniteScrollingImageHelper from '../utils/InfiniteScrollingImageHelper';
import EnemyCharacter from './characters/EnemyCharacter';

export default class InitialScene extends Phaser.Scene {
    private characterSprite!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

    private infiniteScrollingFloorHelper!: InfiniteScrollingImageHelper;
    private infiniteScrollingSkyHelper!: InfiniteScrollingImageHelper;

    private enemyGroup !: Phaser.GameObjects.Group;

    private controllerKeys!: ControllerKeys;

    private characterSpeed = 30;
    private characterJumpSpeed = 30;
    private characterIsJumping = false;

    private floorSpeed = 50;
    
    constructor() {
        super('initial');
    }

    create(): void {

        this.controllerKeys = new ControllerKeys(this, 'wasd');

        // Setup floor
        this.infiniteScrollingFloorHelper = new InfiniteScrollingImageHelper(this, 0, 0, 'floor', this.floorSpeed);

        // Setup floor body
        const floorBody = this.add.rectangle(0, this.cameras.main.height - this.infiniteScrollingFloorHelper.img1.height + 20, this.infiniteScrollingFloorHelper.img1.width - 20, this.infiniteScrollingFloorHelper.img1.height - 20);
        floorBody.setOrigin(0, 0);
        this.physics.add.existing(floorBody, true);
        (floorBody.body as Phaser.Physics.Arcade.Body).debugBodyColor = 0x018852;

        // Setup sky
        this.infiniteScrollingSkyHelper = new InfiniteScrollingImageHelper(this, 0, 0, 'sky', 10);

        // Setup character
        this.characterSprite = this.physics.add.image(0, 0, 'character');
        this.characterSprite.setOrigin(0, 0);
        this.characterSprite.setCollideWorldBounds(true);
        this.characterSprite.setPosition(0, (this.cameras.main.height - this.characterSprite.height) / 2);
        this.characterSprite.setBounce(0, 0.5);
        this.characterSprite.setMaxVelocity(500, undefined);
        this.characterSprite.setVelocityX(this.characterSpeed)
        this.physics.add.collider(this.characterSprite, floorBody, this.onCharacterCollidesWithFloor, undefined, this);

        // Setup enemy spawn
        this.enemyGroup = this.add.group({
            classType: EnemyCharacter
        });

        this.time.addEvent({
            callback: () => {
                const newEnemy = this.enemyGroup.get(0, 0) as EnemyCharacter;
                newEnemy.setPosition(this.cameras.main.width, floorBody.y - floorBody.height - (this.characterSprite.height / 2) + (newEnemy.height / 2));
                newEnemy.setSpeed(this.floorSpeed);
            },
            delay: 2000,
            loop: true
        });  
    }

    onCharacterCollidesWithFloor(go1: Phaser.GameObjects.GameObject, go2: Phaser.GameObjects.GameObject) {
        this.characterIsJumping = false;
    }

    update(time: number, delta: number) {
        super.update(time, delta);

        // Background scroll.
        this.infiniteScrollingFloorHelper.update(time, delta);
        this.infiniteScrollingSkyHelper.update(time, delta);

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