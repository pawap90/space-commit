import Phaser from 'phaser';
import WebFont from 'webfontloader';
import { Contributor } from '../Contributor';

export default class InitialScene extends Phaser.Scene {

    constructor() {
        super('main-menu');
    }

    preload() {
        this.load.image('avatar', Contributor.avatar_url);
        this.load.image('menu-avatar-mask', 'assets/menu-avatar-mask.png');
        this.load.image('logo', 'assets/logo.png');
    }

    create(): void {
        const scene = this;

        const fontFamily = 'Oxanium';
        WebFont.load({
            google: {
                families: [fontFamily]
            },
            active: function () {
                scene.addComponents(fontFamily, '42px', '38px', '22px')
            },
            inactive: function () {
                scene.addComponents('Verdana', '40px', '32px', '20px')
            }
        });


        this.input.keyboard.on('keyup', this.anyKey, this);
    }

    private anyKey(event: any) {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER) {
            this.scene.start('preloader');
        }
    }

    private addComponents(fontFamily: string, titleSize: string, labelSize: string, smallLabelSize: string) {
        const fontColor = '#ffffff'

        const title = this.add.image(0, 0, 'logo');
        title.setAlpha(0);
        title?.setPosition(this.cameras.main.width / 2, title.height + 50);

        this.tweens.add({
            targets: title,
            alpha: 1,
            duration: 500,
            ease: 'Power2'
          });

        const startText = this.add.text(16, 0, 'Press enter to start', { fontFamily: fontFamily, fontSize: titleSize, color: fontColor });
        startText?.setPosition(this.cameras.main.width / 2 - (startText.width / 2), 200);

        const explorerLabel = this.add.text(16, 0, '', { fontFamily: fontFamily, fontSize: smallLabelSize, color: fontColor });
        explorerLabel.setPosition(400, 400);

        const username = this.add.text(16, 0, '', { fontFamily: fontFamily, fontSize: labelSize, color: fontColor });
        username.setPosition(explorerLabel.x, explorerLabel.y + explorerLabel.height);

        const experimentLabel = this.add.text(16, 0, '', { fontFamily: fontFamily, fontSize: smallLabelSize, color: fontColor });
        experimentLabel.setPosition(username.x, username.y + username.height * 2);

        const simplifiedCommit = Contributor.commit.toUpperCase().substr(Contributor.commit.length - 8, Contributor.commit.length);
        const experiment = this.add.text(16, 0, '', { fontFamily: fontFamily, fontSize: labelSize, color: fontColor });
        experiment.setPosition(experimentLabel.x, experimentLabel.y + experimentLabel.height);

        const messageLabel = this.add.text(16, 0, '', { fontFamily: fontFamily, fontSize: smallLabelSize, color: fontColor });
        messageLabel.setPosition(experiment.x, experiment.y + experiment.height * 2);

        const message = this.add.text(16, 0, '', { fontFamily: fontFamily, fontSize: labelSize, color: fontColor, wordWrap: { width: 700, useAdvancedWrap: true } });
        message.setPosition(messageLabel.x, messageLabel.y + messageLabel.height);
        message.setMaxLines(4);

        this.startTypewriter('EXPLORER:', explorerLabel, () =>
            this.startTypewriter(Contributor.username.toUpperCase().trim(), username, () =>
                this.startTypewriter('EXPERIMENT N°:', experimentLabel, () =>
                    this.startTypewriter(`...${simplifiedCommit}`, experiment, () =>
                        this.startTypewriter('LOG ENTRY:', messageLabel, () =>
                            this.startTypewriter(Contributor.message, message)
                        )
                    )
                )
            )
        );

        const avatar = this.add.image(200, 550, 'avatar');
        avatar.setScale(0.45, 0.45);

        const avatarMask = this.make.image({ x: 0, y: 0, key: 'menu-avatar-mask', add: false });
        avatar.mask = new Phaser.Display.Masks.BitmapMask(this, avatarMask);
        avatarMask.copyPosition(avatar);
    }

    private startTypewriter(text: string, label?: Phaser.GameObjects.Text, callback?: Function) {
        let i = 0
        this.time.addEvent({
            callback: () => {
                if (label)
                    label.text += text[i]
                ++i
                if (callback && i == text.length -1)
                    callback();
            },
            repeat: text.length - 1,
            delay: 50
        })
    }
}