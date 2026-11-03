import Phaser from 'phaser';


export default class Sticker extends Phaser.GameObjects.Sticker {

    /**
     * -- MOVE TOOL --
     * not moving + click:
     * - move()
     * moving + click:
     * - place()
     */
    move() {
        // remove from canvas
        // follow mouse
        // set as moving
    }
    place() {
        // stop following mouse
        // add to canvas
        // set as not moving
    }

    /**
     * -- ERASE TOOL --
     * click:
     * - erase()
     */

    erase() {
        // remove from canvas
        // destroy
    }


    /**
     * -- SELECT TOOL --
     * not selected + click:
     * - select()
     * selected + click:
     * - unselect()
     */
    select() {
        // resaltar de alguna manera
        // activar botones de opciones de selección
    }

    unselect() {
        // quitar resalto
        // desactivar opciones selección
    }

    // -- opciones de selección --

    rotate_right() {
        // fixed angles to right
    }

    rotate_left() {
        // fixed angles to left
    }

    scale_up() {
        // fixed value up
    }

    scale_down() {
        // fixed value down
    }

    layer_up() {
        // call canvas func
    }

    layer_down() {
        // call canvas func
    }

    layer_top() {
        // call canvas func
    }

    layer_bottom() {
        // call canvas func
    }

    // -- fin--
}
