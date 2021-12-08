type TypeWriterConfig = { text: string, label?: Phaser.GameObjects.Text };

export default class TypeWriterEffectHelper {

    static startTypewriter(scene: Phaser.Scene, config: TypeWriterConfig | TypeWriterConfig[], speed: number): void {
        let textIndex = 0;

        if (!Array.isArray(config)) {
            scene.time.addEvent({
                callback: () => {
                    if (config.label)
                        config.label.text += config.text[textIndex];
                    ++textIndex;
                },
                repeat: config.text.length - 1,
                delay: speed
            });
        }
        else {
            const topConfig = config.shift();
            if (!topConfig) return;

            scene.time.addEvent({
                callback: () => {

                    if (topConfig.label)
                        topConfig.label.text += topConfig.text[textIndex];
                    ++textIndex;
                    if (textIndex == topConfig.text.length - 1)
                        this.startTypewriter(scene, config, speed);
                },
                repeat: topConfig.text.length - 1,
                delay: speed
            });
        }
    }
}