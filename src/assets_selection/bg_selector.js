import Phaser from 'phaser'

import backgrounds from '../../assets/data/backgrounds.json';

import default_bg from '../../assets/sprites/backgrounds/default_bg.png';
import default_bg2 from '../../assets/sprites/backgrounds/default_bg2.png';

const bgs = [default_bg, default_bg2];

export default class BGSelector extends Phaser.GameObjects.Container {
    static preload(scene) {
        // load background sprites
        let i = 0;
        for (const [key, value] of Object.entries(backgrounds)) {
            scene.load.image(key, bgs[i]);
            ++i;
        }
    }

    constructor(scene, data) {
        super(scene, data.pos.x, data.pos.y, null);
        scene.add.existing(this);
        this.background = undefined;

        this.current_bg = 0;

        this.bg_selected = new Phaser.GameObjects.Sprite(scene, 0, 0, this.get_bg());
        this.add(this.bg_selected);
        this.bg_selected.scale = 0.5;
        this.left_arrow = new Phaser.GameObjects.Text(scene, -180, 0, '<');
        this.add(this.left_arrow);
        this.right_arrow = new Phaser.GameObjects.Text(scene, 170, 0, '>');
        this.add(this.right_arrow);


        this.left_arrow.setInteractive();
        this.left_arrow.on('pointerdown', () => {
            this._go_left();
        });

        this.right_arrow.setInteractive();
        this.right_arrow.on('pointerdown', () => {
            this._go_right();
        });
    }

    _go_right() {
        ++this.current_bg;
        if (this.current_bg >= Object.keys(backgrounds).length)
            this.current_bg = 0;

        this.bg_selected.setTexture(this.get_bg());
    }

    _go_left() {
        --this.current_bg;
        if (this.current_bg < 0)
            this.current_bg = Object.keys(backgrounds).length - 1;
        this.bg_selected.setTexture(this.get_bg());
    }

    get_bg() {
        return Object.keys(backgrounds)[this.current_bg];
    }
}