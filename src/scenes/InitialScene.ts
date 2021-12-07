import Phaser from 'phaser';
import ControllerKeys from '../utils/ControllerKeys';
import InfiniteScrollingImageHelper from '../utils/InfiniteScrollingImageHelper';
import AstronautCharacter from './characters/AstronautCharacter';
import EnemyCharacter from './characters/EnemyCharacter';

export default class InitialScene extends Phaser.Scene {
    private characterSprite!: AstronautCharacter;

    private infiniteScrollingFloorHelper!: InfiniteScrollingImageHelper;
    private infiniteScrollingSkyHelper!: InfiniteScrollingImageHelper;

    private enemyGroup !: Phaser.GameObjects.Group;

    private controllerKeys!: ControllerKeys;

    private floorSpeed = 50;

    constructor() {
        super('initial');
    }

    create(): void {

        this.controllerKeys = new ControllerKeys(this, 'wasd');

        // Create floor
        this.infiniteScrollingFloorHelper = new InfiniteScrollingImageHelper(this, 0, 0, 'floor', this.floorSpeed);

        // Create floor body
        const floorBody = this.add.rectangle(0, this.cameras.main.height - this.infiniteScrollingFloorHelper.img1.height + 20, this.infiniteScrollingFloorHelper.img1.width - 20, this.infiniteScrollingFloorHelper.img1.height - 20);
        floorBody.setOrigin(0, 0);
        this.physics.add.existing(floorBody, true);
        (floorBody.body as Phaser.Physics.Arcade.Body).debugBodyColor = 0x018852;

        // Create sky
        this.infiniteScrollingSkyHelper = new InfiniteScrollingImageHelper(this, 0, 0, 'sky', 10);

        // Create character
        this.characterSprite = new AstronautCharacter(this, 200, 200);
        this.physics.add.collider(this.characterSprite, floorBody, this.characterSprite.onCharacterCollidesWithFloor, undefined, this.characterSprite);

        // Create enemy group
        this.enemyGroup = this.add.group({
            classType: EnemyCharacter,
            runChildUpdate: true
        });

        // Create enemy spawner
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

    update(time: number, delta: number): void {
        super.update(time, delta);

        // Background scroll.
        this.infiniteScrollingFloorHelper.update(time, delta);
        this.infiniteScrollingSkyHelper.update(time, delta);

        this.characterSprite.update(time, delta, this.controllerKeys);
    }
}