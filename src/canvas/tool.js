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
}