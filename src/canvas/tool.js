import Phaser from 'phaser'

export const TOOLS = {
    SELECT: 0,
    MOVE: 1,
    ERASE: 2
}

export class Tool /** extends Phaser.GameObjects.Sprite */ {
    
    constructor() {
        this.current_tool = TOOLS.SELECT;
        this.selected = null;
        this.moving = null;
    }

    change_tool(tool) {
        this.current_tool = tool;
        if (tool !== TOOLS.MOVE && this.moving !== null) {
            this.moving.destroy();
            this.moving = null;
        }
        if (tool !== TOOLS.SELECT && this.selected !== null) {
            this.selected.unselect();
            console.log("change tool " + this.selected);
            this.selected = null;
        }
    }

    get_current() {
        return this.current_tool;
    }

    set_moving(sticker) {
        if (this.moving === sticker)
            return;
        // if (this.moving !== null)
        //     this.moving.place();
        this.moving = sticker;
    }

    set_not_moving(sticker) {
        if (this.moving !== sticker)
            return;
        this.moving = null;
    }

    get_moving() {
        return this.moving;
    }

    set_selected(sticker) {
        if (this.selected === sticker)
            return;
        if (this.selected !== null)
            this.selected.unselect();
        this.selected = sticker;        
    }
    
    set_unselected(sticker) {
        if (this.selected !== sticker)
            return;
        this.selected = null;
    }

    // -- opciones de selección --

    rotate_right() {
        if (this.selected == null)
            return;

        // fixed angles to right
        this.selected.rotate_right(); 
    }

    rotate_left() {
        if (this.selected == null)
            return;
        // fixed angles to left
        this.selected.rotate_left(); 
    }

    scale_up() {
        if (this.selected == null)
            return;
        // fixed value up
        this.selected.scale_up(); 
    }

    scale_down() {
        if (this.selected == null)
            return;
        // fixed value down
        this.selected.scale_down(); 
    }

    layer_up() {
        if (this.selected == null)
            return;
        // call canvas func
        this.selected.layer_up(); 
    }

    layer_down() {
        if (this.selected == null)
            return;
        // call canvas func
        this.selected.layer_down(); 
    }

    layer_top() {
        if (this.selected == null)
            return;
        // call canvas func
        this.selected.layer_top(); 
    }

    layer_bottom() {
        if (this.selected == null)
            return;
        // call canvas func
        this.selected.layer_bottom(); 
    }

    // -- fin--
}