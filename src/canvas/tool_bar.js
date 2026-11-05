import Phaser from "phaser";

import { TOOLS } from './tool.js';

const tool_move_key = "tool_move";
const tool_select_key = "tool_select";
const tool_eraser_key = "tool_eraser";
import tool_move_image from "../../assets/sprites/ui/tool_move.png"
import tool_select_image from "../../assets/sprites/ui/tool_select.png"
import tool_eraser_image from "../../assets/sprites/ui/tool_eraser.png"

export default class ToolBar extends Phaser.GameObjects.Container {
    static preload(scene) {
        scene.load.image(tool_move_key, tool_move_image);
        scene.load.image(tool_select_key, tool_select_image);
        scene.load.image(tool_eraser_key, tool_eraser_image);
    }

    constructor(scene, data, tool) {
        super(scene, data.pos.x, data.pos.y, null);
        this.scene.add.existing(this);
        this.tool = tool;

        this.select_tool = this._add_tool(-30, tool_select_key, TOOLS.SELECT);
        this.move_tool = this._add_tool(0, tool_move_key, TOOLS.MOVE);
        this.eraser_tool = this._add_tool(30, tool_eraser_key, TOOLS.ERASE);
    }

    _add_tool(x, texture, tool) {
        let tool_go = new Phaser.GameObjects.Sprite(this.scene, x, 0, texture);
        this._activate_tool_on_click(tool_go, tool);
        this.add(tool_go);
        return tool_go;
    }

    _activate_tool_on_click(tool_button, tool) {
        tool_button.setInteractive();
        tool_button.on('pointerdown', () => {
            this.tool.change_tool(tool);
        });
    }
}