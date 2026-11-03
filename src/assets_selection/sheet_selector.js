import Phaser from 'phaser'

import sheets from '../../assets/data/sticker_sheets.json';

const sheets_frame_key = "select_sheets_frame"

export default class SheetSelector extends Phaser.GameObjects.Container {
    static preload(scene) {
        // load character sprites
        for (const [key, value] of Object.entries(sheets)) {
            scene.load.image(key, value["image"]);
        }
        scene.load.image(sheets_frame_key, "./assets/sprites/ui/select_sheet_frame.png")
    }


    constructor(scene, data) {
        super(scene, data.pos.x, data.pos.y, null);
        scene.add.existing(this);
        this.sheet = undefined;

        this.sheet_frame = new Phaser.GameObjects.Sprite(scene, 0, 0, sheets_frame_key);
        this.add(this.sheet_frame);
        this.sheet_frame.scale = 0.5;

        this.sheet_selected = new Phaser.GameObjects.Sprite(scene, 0, 0, Object.keys(sheets)[0]);
        this.add(this.sheet_selected);
        this.sheet_selected.scale = 0.5;

        this.left_arrow = new Phaser.GameObjects.Text(scene, -180, 0, '<');
        this.add(this.left_arrow);
        this.right_arrow = new Phaser.GameObjects.Text(scene, 170, 0, '>');
        this.add(this.right_arrow);

        this.current_sheet = 0;

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
        ++this.current_sheet;
        if (this.current_sheet >= Object.keys(sheets).length)
            this.current_sheet = 0;

        this.sheet_selected.setTexture(Object.keys(sheets)[this.current_sheet]);
    }

    _go_left() {
        --this.current_sheet;
        if (this.current_sheet < 0)
            this.current_sheet = Object.keys(sheets).length - 1;
        this.sheet_selected.setTexture(Object.keys(sheets)[this.current_sheet]);
    }

    get_sheet() {
        return this.sheet;
    }
}
