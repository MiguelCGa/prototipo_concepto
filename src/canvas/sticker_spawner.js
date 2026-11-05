import Phaser from 'phaser';

import Sticker from './sticker.js';

import { TOOLS } from './tool.js';

export default class StickerSpawner extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sheet, sticker_index, tool, canvas) {
        super(scene, x, y, sheet, sticker_index);
        
        console.log("sticker spawner constructor: " + sheet + " | " + sticker_index);
        
        this.tool = tool;
        this.canvas = canvas;
        this.sheet = sheet;
        this.sticker_index = sticker_index;

        this.setInteractive();
        this.on('pointerdown', () => {
            this._on_click();
        });
    }

    _destroy_previously_moving_with_tool() {
        let moving = this.tool.get_moving();
        if (moving === null)
            return;
        
        this.tool.set_not_moving(moving);
        moving.destroy();
    }

    _on_click() {
        this._destroy_previously_moving_with_tool();
        let sticker = new Sticker(this.scene, this.x, this.y, this.sheet, this.sticker_index, this.canvas, this.tool);
        sticker.move();
        this.tool.change_tool(TOOLS.MOVE);
    }
}
