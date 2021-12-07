import ScrollingImage from './ScrollingImage';

export default class InfiniteScrollingImageHelper {

    img1: ScrollingImage;
    img2: ScrollingImage;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, speed: number, frame?: string | number | undefined) {

        this.img1 = new ScrollingImage(scene, x, y, texture, speed, frame);
        this.img1.y = scene.cameras.main.height - this.img1.height;
        scene.add.existing(this.img1);

        this.img2 = new ScrollingImage(scene, x, y, texture, speed, frame);
        this.img2.setPosition(this.img1.width - this.img1.x, scene.cameras.main.height - this.img2.height);
        scene.add.existing(this.img2);

        this.img2.setInitialXPosition(this.img1.width - this.img1.x);
        this.img1.setInitialXPosition(this.img2.x);
    }

    update(time: number, delta: number): void {

        this.img1.update(time, delta);
        this.img2.update(time, delta);
    }
}