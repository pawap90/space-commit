export default class EnemyCharacter extends Phaser.GameObjects.Image {

    private speed = 10;

    hitbox !: Phaser.GameObjects.Rectangle;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'enemy');

        this.setOrigin(0, 0);

        this.hitbox = this.scene.add.rectangle(0, 0, 70, 70);

        this.scene.physics.add.existing(this.hitbox);
        (this.hitbox.body as Phaser.Physics.Arcade.Body).allowGravity = false;
        
    }
    
    update(time: number, delta: number): void {
        super.update(time, delta);

        this.hitbox.copyPosition(new Phaser.Math.Vector2(this.x, this.y));
        this.hitbox.x += 65;
        this.hitbox.y += 75;

        this.setX(this.x - this.speed * delta);
        if (this.x <= this.width * -1) {
            this.destroy();
        }
    }

    destroy(): void {
        this.hitbox.destroy();
        super.destroy();
    }

    setSpeed(speed: number): void {
        this.speed = speed / 100;
    }
}