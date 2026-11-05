import Phaser from 'phaser';

import { TOOLS } from './tool.js';

import data from '../../assets/data/sticker.json';

export default class Sticker extends Phaser.GameObjects.Sprite {


    constructor(scene, x, y, sheet, sticker_index, canvas, tool) {
        super(scene, x, y, sheet, sticker_index);
        this.scene.add.existing(this);

        this.sheet = sheet;
        this.sticker_index = sticker_index;

        this.moving = false;
        this.selected = false;

        this.canvas = canvas;
        this.tool = tool;

        this.scaling = data.scaling;
        this.rotation_angle = data.rotation_angle;

        this.setInteractive();
        this.on('pointerdown', () => {
            this._on_click();
        });

    }

    _on_click() {
        switch (this.tool.get_current()) {
            case TOOLS.SELECT:
                if (this.selected) this.unselect();
                else this.select();
                break;
            case TOOLS.MOVE:
                if (this.moving) this.place();
                else this.move();
                break;
            case TOOLS.ERASE:
                this.erase();
                break;
        }
    }

    /**
     * -- MOVE TOOL --
     * not moving + click:
     * - move()
     * moving + click:
     * - place()
     */
    move() {
        // remove from canvas
        this.canvas.remove_sticker(this);
        // follow mouse
        // set as moving
        this.tool.set_moving(this);
        this.moving = true;
    }
    place() {
        // add to canvas
        if (!this.canvas.place_sticker(this))
            return false;
        // stop following mouse
        // set as not moving
        // this.tool.set_not_moving(this);
        // this.moving = false;
        return true;
    }

    /**
     * -- ERASE TOOL --
     * click:
     * - erase()
     */

    erase() {
        // remove from canvas
        this.canvas.remove_sticker(this);
        // destroy
        this.destroy();
    }


    /**
     * -- SELECT TOOL --
     * not selected + click:
     * - select()
     * selected + click:
     * - unselect()
     */
    select() {
        this.selected = true;
        this.tool.set_selected(this);
        // resaltar de alguna manera
        // activar botones de opciones de selección
    }

    unselect() {
        this.selected = false;
        this.tool.set_unselected(this);
        // quitar resalto
        // desactivar opciones selección
    }

    // -- opciones de selección --

    rotate_right() {
        // fixed angles to right
        this.angle += this.rotation_angle; 
    }

    rotate_left() {
        // fixed angles to left
        this.angle -= this.rotation_angle; 
    }

    scale_up() {
        // fixed value up
        this.scale += this.scaling;
    }

    scale_down() {
        // fixed value down
        this.scale -= this.scaling;
    }

    layer_up() {
        // call canvas func
        this.canvas.layer_up(this);
    }

    layer_down() {
        // call canvas func
        this.canvas.layer_down(this);
    }

    layer_top() {
        // call canvas func
        this.canvas.layer_top(this);
    }

    layer_bottom() {
        // call canvas func
        this.canvas.layer_bottom(this);
    }

    // -- fin--

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.moving) {
            this.x = this.scene.input.activePointer.x;
            this.y = this.scene.input.activePointer.y;

            let x_big_limit = this.canvas.x + (this.canvas.width / 2 - this.width / 2);
            let x_little_limit = this.canvas.x - (this.canvas.width / 2 - this.width / 2);
            if (this.x > x_big_limit)
                this.x = x_big_limit;
            else if (this.x < x_little_limit)
                this.x = x_little_limit;

            let y_big_limit = this.canvas.y + (this.canvas.height / 2 - this.height / 2);
            let y_little_limit = this.canvas.y - (this.canvas.height / 2 - this.height / 2);
            if (this.y > y_big_limit)
                this.y = y_big_limit;
            else if (this.y < y_little_limit)
                this.y = y_little_limit;
        }
    }
    
}
