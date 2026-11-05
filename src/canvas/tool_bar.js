import Phaser from "phaser";

import { TOOLS } from './tool.js';

const tool_move_key = "tool_move";
const tool_select_key = "tool_select";
const tool_eraser_key = "tool_eraser";
import tool_move_image from "../../assets/sprites/ui/tool_move.png"
import tool_select_image from "../../assets/sprites/ui/tool_select.png"
import tool_eraser_image from "../../assets/sprites/ui/tool_eraser.png"
const tool_rot_r_key = "tool_rot_r";
const tool_rot_l_key = "tool_rot_l";
const tool_scl_u_key = "tool_scl_u";
const tool_scl_d_key = "tool_scl_d";
const tool_lyr_u_key = "tool_lyr_u";
const tool_lyr_d_key = "tool_lyr_d";
const tool_lyr_t_key = "tool_lyr_t";
const tool_lyr_b_key = "tool_lyr_b";
import tool_rot_r_image from "../../assets/sprites/ui/tool_rotate_right.png"
import tool_rot_l_image from "../../assets/sprites/ui/tool_rotate_left.png"
import tool_scl_u_image from "../../assets/sprites/ui/tool_scale_up.png"
import tool_scl_d_image from "../../assets/sprites/ui/tool_scale_down.png"
import tool_lyr_u_image from "../../assets/sprites/ui/tool_layer_up.png"
import tool_lyr_d_image from "../../assets/sprites/ui/tool_layer_down.png"
import tool_lyr_t_image from "../../assets/sprites/ui/tool_layer_top.png"
import tool_lyr_b_image from "../../assets/sprites/ui/tool_layer_bottom.png"

export default class ToolBar extends Phaser.GameObjects.Container {
    static preload(scene) {
        scene.load.image(tool_move_key, tool_move_image);
        scene.load.image(tool_select_key, tool_select_image);
        scene.load.image(tool_eraser_key, tool_eraser_image);
        scene.load.image(tool_rot_r_key, tool_rot_r_image);
        scene.load.image(tool_rot_l_key, tool_rot_l_image);
        scene.load.image(tool_scl_u_key, tool_scl_u_image);
        scene.load.image(tool_scl_d_key, tool_scl_d_image);
        scene.load.image(tool_lyr_u_key, tool_lyr_u_image);
        scene.load.image(tool_lyr_d_key, tool_lyr_d_image);
        scene.load.image(tool_lyr_t_key, tool_lyr_t_image);
        scene.load.image(tool_lyr_b_key, tool_lyr_b_image);
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
            if (tool === TOOLS.SELECT)
                this._open_select_options();
            else
                this._close_select_options();
        });
    }

    _add_select_option(x, texture, call) {
        let option_go = new Phaser.GameObjects.Sprite(this.scene, x, 30, texture);
        this._activate_select_option_on_click(option_go, call);
        this.add(option_go);
        return option_go;
    }

    _activate_select_option_on_click(option_button, call) {
        option_button.setInteractive();
        option_button.on('pointerdown', call);
    }

    _open_select_options() {
        this.options = [
            this._add_select_option(-105, tool_rot_r_key, 
                () => { this.tool.rotate_right() }),
            this._add_select_option(-75, tool_rot_l_key, 
                () => { this.tool.rotate_left() }),
            this._add_select_option(-45, tool_scl_u_key, 
                () => { this.tool.scale_up() }),
            this._add_select_option(-15, tool_scl_d_key, 
                () => { this.tool.scale_down() }),
            this._add_select_option(15, tool_lyr_u_key, 
                () => { this.tool.layer_up() }),
            this._add_select_option(45, tool_lyr_d_key, 
                () => { this.tool.layer_down() }),
            this._add_select_option(75, tool_lyr_t_key, 
                () => { this.tool.layer_top() }),
            this._add_select_option(105, tool_lyr_b_key, 
                () => { this.tool.layer_bottom() })
        ]
    }

    _close_select_options() {
        this.options.forEach(option => {
            option.destroy();
        });
    }
}