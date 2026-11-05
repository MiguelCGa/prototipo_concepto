import Phaser from 'phaser'

import Sticker from './sticker.js';

export default class Canvas extends Phaser.GameObjects.Container {

    constructor(scene, data, background) {
        super(scene, data.pos.x, data.pos.y, null);
        scene.add.existing(this);
        
        let background_go = new Phaser.GameObjects.Sprite(scene, 0, 0, background);
        this.add(background_go);
        this.width = background_go.width;
        this.height = background_go.height;
    }

    is_in_bounds(sticker) {
        return sticker.x - this.x > -(this.width / 2 - sticker.width / 2)
            && sticker.y - this.y > -(this.height / 2 - sticker.height / 2)
            && sticker.x - this.x < (this.width / 2 - sticker.width / 2)
            && sticker.y - this.y < (this.height / 2 - sticker.height / 2);
    }

    /**
     * ¡¡¡POTENCIAL ERROR!!! que al convertir en child se vaya la posición a la mierda
     * @param {Sticker} sticker 
     * @returns true si está dentro del lienzo y se puede colocar. false si no está dentro del lienzo.
     */
    place_sticker(sticker) {
        if (!this.is_in_bounds(sticker))
            return false;
        
        let clone = new Sticker(sticker.scene, sticker.x, sticker.y, sticker.sheet, sticker.sticker_index, sticker.canvas, sticker.tool);//Phaser.Utils.Objects.Clone(sticker);
        this.add(clone);
        clone.moving = false;
        clone.scale = sticker.scale;
        clone.angle = sticker.angle;

        // ¡¡¡SOLUCIÓN POTENCIAL ERROR!!!
        clone.x -= this.x;
        clone.y -= this.y;

        return true;
    }

    /**
     * ¡¡¡POTENCIAL ERROR!!! que al convertir en no child se vaya la posición a la mierda
     * @param {Sticker} sticker 
     * @returns sticker eliminado
     */
    remove_sticker(sticker) {
        if (this.getIndex(sticker) < 0)
            return sticker;

        this.remove(sticker, false);

        // ¡¡¡SOLUCIÓN POTENCIAL ERROR!!!
        sticker.x += this.x;
        sticker.y += this.y;

        return sticker;
    }

    /**
     * Mueve la pegatina dada una capa hacia arriba.
     * @param {Sticker} sticker Pegatina a mover.
     * @returns true si se puede mover. false si no se puede mover.
     */
    layer_up(sticker) {
        if (this.getIndex(sticker) <= 0)
            return false;
        this.moveUp(sticker);
        return true;
    }

    /**
     * Mueve la pegatina dada una capa hacia abajo.
     * @param {Sticker} sticker Pegatina a mover.
     * @returns true si se puede mover. false si no se puede mover.
     */
    layer_down(sticker) {
        let index = this.getIndex(sticker);
        if (index >= this.length || index < 2)
            return false;
        this.moveDown(sticker);
        return true;
    }

    /**
     * Mueve la pegatina dada a la capa más superior.
     * @param {Sticker} sticker Pegatina a mover.
     * @returns true si se puede mover. false si no se puede mover.
     */
    layer_top(sticker) {
        if (this.getIndex(sticker) <= 0)
            return false;
        this.bringToTop(sticker);
        return true;
    }

    /**
     * Mueve la pegatina dada a la capa más inferior.
     * @param {Sticker} sticker Pegatina a mover.
     * @returns true si se puede mover. false si no se puede mover.
     */
    layer_bottom(sticker) {
        let index = this.getIndex(sticker);
        if (index >= this.length || index < 2)
            return false;
        this.moveTo(sticker, 1);
        return true;
    }
    
}
