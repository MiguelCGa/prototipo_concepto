import Phaser from 'phaser'

export default class Canvas extends Phaser.GameObjects.Container {

    constructor(scene, data) {
        super(scene, data.pos.x, data.pos.y, null);
        
        this.width = data.size.width;
        this.height = data.size.height;
    }

    is_in_bounds(sticker) {
        return 
            sticker.x - this.x > (this.width / -2) &&
            sticker.y - this.y > (this.height / -2) &&
            sticker.x - this.x < (this.width / 2) &&
            sticker.y - this.y < (this.height / 2);
    }

    /**
     * ¡¡¡POTENCIAL ERROR!!! que al convertir en child se vaya la posición a la mierda
     * @param {Sticker} sticker 
     * @returns true si está dentro del lienzo y se puede colocar. false si no está dentro del lienzo.
     */
    place_sticker(sticker) {
        if (!this.is_in_bounds(sticker))
            return false;
        
        let clone = Phaser.Utils.Objects.Clone(sticker);
        this.add(clone);

        // ¡¡¡SOLUCIÓN POTENCIAL ERROR!!!
        // clone.x -= this.x;
        // clone.y -= this.y;

        return true;
    }

    /**
     * ¡¡¡POTENCIAL ERROR!!! que al convertir en no child se vaya la posición a la mierda
     * @param {Sticker} sticker 
     * @returns sticker eliminado
     */
    remove_sticker(sticker) {
        this.remove(sticker);

        // ¡¡¡SOLUCIÓN POTENCIAL ERROR!!!
        // clone.x += this.x;
        // clone.y += this.y;

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
        if (index >= this.length - 1 || index < 0)
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
    layer_down(sticker) {
        let index = this.getIndex(sticker);
        if (index >= this.length - 1 || index < 0)
            return false;
        this.sendToBack(sticker);
        return true;
    }
}
