import ControllerKeys from "../../utils/ControllerKeys";

export default class AstronautCharacter extends Phaser.Physics.Arcade.Image {

    private avatar: Phaser.GameObjects.Image;
    private avatarMask: Phaser.GameObjects.Image;
    
    private speed = 50;
    private jumpSpeed = 30;
    private isJumping = false;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'astronaut');
        
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setOrigin(0, 0);
        this.setCollideWorldBounds(true);
        this.setPosition(0, (scene.cameras.main.height - this.height) / 2);
        this.setBounce(0, 0.5);
        this.setMaxVelocity(500, undefined);
        this.setVelocityX(this.speed);
        this.setDepth(1);

        this.avatar = scene.add.image(100, 100, 'avatar');
        this.avatar.setScale(0.25, 0.25)
        
        this.avatarMask = scene.make.image({ x: 0, y: 0, key: 'avatar-mask', add: false });
        this.avatar.mask = new Phaser.Display.Masks.BitmapMask(scene, this.avatarMask);

    }

    update(time: number, delta: number, controllerKeys: ControllerKeys): void {
        super.update(time, delta);

        // Avatar positioning
        this.avatar.copyPosition(new Phaser.Math.Vector2(this.x, this.y));
        this.avatar.x += 82;
        this.avatar.y += 82;
        this.avatarMask.copyPosition(this.avatar);

        // Character controller
        const speed = { x: 0, y: 0 };

        if (controllerKeys.left.isDown)
            speed.x = -1 * this.speed * delta;

        else if (controllerKeys.right.isDown)
            speed.x = 1 * this.speed * delta;

        if (controllerKeys.jump.isDown && !this.isJumping) {
            this.isJumping = true;
            speed.y = -1 * this.jumpSpeed * delta;

            this.setVelocityY(speed.y);
        }

        this.setAccelerationX(speed.x);
    }

    destroy(): void {
        this.avatar.destroy();
        super.destroy();
    }

    onCharacterCollidesWithFloor(): void {
        this.isJumping = false;
    }
}