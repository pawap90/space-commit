
export default class ScrollingImage extends Phaser.GameObjects.Image {

    speed: number;
    private initialXPosition: number;
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, speed: number, frame?: string | number | undefined) {
        super(scene, x, y, texture, frame);
        this.speed = speed / 100;

        this.setOrigin(0, 0);
        this.initialXPosition = 0;
    }

    setInitialXPosition(x?: number): void {
        this.initialXPosition = x ?? this.x;
    }

    update(time: number, delta: number): void {
        super.update(time, delta);

        this.setX(this.x - this.speed * delta);
        if (this.x <= this.width * -1)
            this.x = this.initialXPosition;


    }
}