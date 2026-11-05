import Phaser from 'phaser';

import sheets from '../../assets/data/sticker_sheets.json';

const sheets_frame_key = "select_sheets_frame";
import sheets_frame_image from "../../assets/sprites/ui/select_sheet_frame.png";

const default_sheet_key = "default_sheet";
import default_sheet_image from "../../assets/sprites/sheets/default_sheet.png";
import default_sheet_data from "../../assets/sprites/sheets/default_sheet.json";

const default_sheet2_key = "default_sheet2";
import default_sheet2_image from "../../assets/sprites/sheets/default_sheet2.png";
import default_sheet2_data from "../../assets/sprites/sheets/default_sheet2.json";

const sheets_data = [default_sheet_data, default_sheet2_data];

export default class SheetSelector extends Phaser.GameObjects.Container {
    static preload(scene) {
        // load sticker sheets
        // for (const [key, value] of Object.entries(sheets)) {
        //     scene.load.atlas(key, value["image"], value["atlas"]);
        // }

        scene.load.atlas(default_sheet_key, default_sheet_image, default_sheet_data);
        scene.load.atlas(default_sheet2_key, default_sheet2_image, default_sheet2_data);

        scene.load.image(sheets_frame_key, sheets_frame_image)
    }


    constructor(scene, data) {
        super(scene, data.pos.x, data.pos.y, null);
        scene.add.existing(this);

        this.current_sheet = 0;

        this.sheet_frame = new Phaser.GameObjects.Sprite(scene, 0, 0, sheets_frame_key);
        this.add(this.sheet_frame);
        this.sheet_frame.scale = 0.5;

        this.sheet_selected = new Phaser.GameObjects.Sprite(scene, 0, 0, this.get_sheet());
        this.add(this.sheet_selected);
        this.sheet_selected.scale = 0.5;

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
        ++this.current_sheet;
        if (this.current_sheet >= Object.keys(sheets).length)
            this.current_sheet = 0;

        this.sheet_selected.setTexture(this.get_sheet());
    }

    _go_left() {
        --this.current_sheet;
        if (this.current_sheet < 0)
            this.current_sheet = Object.keys(sheets).length - 1;
        this.sheet_selected.setTexture(this.get_sheet());
    }

    get_sheet() {
        return Object.keys(sheets)[this.current_sheet];
    }

    get_sheet_data() {
        return sheets_data[this.current_sheet].frames;
    }
}
