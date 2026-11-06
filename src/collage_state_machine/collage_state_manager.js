import Phaser from "phaser";
import CommisionSignGenerator from '../commision_selection/commision_sign_generator.js'
import { COLLAGE_STATE } from '../collage_state_machine/collage_state_machine.js'

import CommisionSign from '../commision_selection/commision_sign.js';

import StartCommButton from '../assets_selection/start_comm_button.js';
import BGSelector from '../assets_selection/bg_selector.js';
import SheetSelector from '../assets_selection/sheet_selector.js';

import Canvas from '../canvas/canvas.js';
import SheetSpawner from '../canvas/sheet_spawner.js';
import { Tool } from '../canvas/tool.js';
import ToolBar from "../canvas/tool_bar.js";

import data from "../../assets/data/collage_scene_data.json";
import SendCommButton from "../canvas/send_comm_button.js";

const dialogue_box_key = "dialogue_box";
import dialogue_box_image from "../../assets/sprites/ui/dialogue_box.png";
import EndCommButton from "../feedback/end_comm_button.js";

const comm_done_key = "comm_done";
import comm_done_image from "../../assets/sprites/ui/commision_done.png";

export default class CollageStateManager {

    static preload(scene) {
        CommisionSign.preload(scene);
        StartCommButton.preload(scene);
        BGSelector.preload(scene);
        SheetSelector.preload(scene);
        ToolBar.preload(scene);
        scene.load.image(dialogue_box_key, dialogue_box_image);
        SendCommButton.preload(scene);
        EndCommButton.preload(scene);
        scene.load.image(comm_done_key, comm_done_image);
    }

    constructor(scene) {
        this.scene = scene;

        this.commision_sign_generator = new CommisionSignGenerator();

        this.state_gos = [
            /* comm select */{
                signs: undefined 
            }, /* assets select */ {
                sign: undefined,
                bg_selector: undefined,
                sheet_selector: undefined,
                start_comm_button: undefined
            }, /* canvas */{
                sign: undefined,
                canvas: undefined,
                sheet_spawner: undefined,
                tool_bar: undefined,
                send_comm_button: undefined
            }, /* feedback */ {
                painting: undefined,
                character: undefined,
                dialogue: undefined,
                dialogue_box: undefined,
                end_comm_button: undefined
            }
        ]

        this.tool = new Tool();
    }
    
    enter_commision_selection(params) {
        let gos = this.state_gos[COLLAGE_STATE.COMM_SELECT];
        gos.signs = this.commision_sign_generator.create_three_signs(
            this.scene, 
            data.comm_select_signs, 
            this.scene.collage_state_controller);
    }

    enter_asset_selection(params) {
        let gos = this.state_gos[COLLAGE_STATE.ASSETS_SELECT];
        gos.sign = new CommisionSign(
            this.scene,
            data.asset_select_sign,
            params.selected_comm,
            this.scene.collage_state_controller);
        let bg = gos.bg_selector = new BGSelector(
            this.scene,
            data.asset_select_bg);
        let sheet = gos.sheet_selector = new SheetSelector(
            this.scene,
            data.asset_select_sheet);
        gos.start_comm_button = new StartCommButton(
            this.scene,
            data.asset_select_start_button,
            this.scene.collage_state_controller,
            params.selected_comm,
            bg,
            sheet);
    }

    enter_canvas(params) {
        let gos = this.state_gos[COLLAGE_STATE.CANVAS];
        gos.sign = new CommisionSign(
            this.scene,
            data.canvas_sign,
            params.selected_comm,
            this.scene.collage_state_controller);
        
        gos.canvas = new Canvas(
            this.scene,
            data.canvas_canvas,
            params.selected_bg);

        gos.sheet_spawner = new SheetSpawner(
            this.scene,
            data.canvas_sheet_spawner,
            params.selected_sheet,
            params.sheet_info,
            this.tool,
            gos.canvas);

        gos.tool_bar = new ToolBar(
            this.scene,
            data.canvas_tool_bar,
            this.tool);

        gos.send_comm_button = new SendCommButton(
            this.scene,
            data.canvas_send_comm_button,
            this.scene.collage_state_controller,
            params.selected_comm,
            gos.canvas,
            this.tool
            );
    }

    enter_feedback(params) {
        let gos = this.state_gos[COLLAGE_STATE.FEEDBACK];
        gos.painting = new Phaser.GameObjects.Sprite(
            this.scene,
            data.feedback_painting.pos.x,
            data.feedback_painting.pos.y,
            comm_done_key);
        this.scene.add.existing(gos.painting);

        gos.character = new Phaser.GameObjects.Sprite(
            this.scene,
            data.feedback_character.pos.x,
            data.feedback_character.pos.y,
            params.commision.character);
        this.scene.add.existing(gos.character);
        
        gos.dialog_box = new Phaser.GameObjects.Sprite(
            this.scene,
            data.feedback_dialogue_box.pos.x,
            data.feedback_dialogue_box.pos.y,
            dialogue_box_key);
        this.scene.add.existing(gos.dialog_box);

        gos.dialogue = new Phaser.GameObjects.Text(
            this.scene,
            data.feedback_dialogue_text.pos.x,
            data.feedback_dialogue_text.pos.y,
            params.commision.feedback);
        this.scene.add.existing(gos.dialogue);
        
        gos.end_comm_button = new EndCommButton(
            this.scene,
            data.feedback_end_comm_button,
            this.scene.collage_state_controller);
        this.scene.add.existing(gos.end_comm_button);
    }

    exit_state(state) {
        for (const [key, value] of Object.entries(this.state_gos[state])) {
            if (value === undefined || !value.hasOwnProperty("isDestroyed"))
                continue;
            value.destroy();
            this.state_gos[state][key] = undefined;
        }
    }

    exit_commision_selection() {
        this.exit_state(COLLAGE_STATE.COMM_SELECT);
        this.state_gos[COLLAGE_STATE.COMM_SELECT].signs.forEach((sign) => {
            sign.destroy();
        });
    }

    exit_asset_selection() {
        this.exit_state(COLLAGE_STATE.ASSETS_SELECT);
    }

    exit_canvas() {
        this.exit_state(COLLAGE_STATE.CANVAS);
    }

    exit_feedback() {
        this.exit_state(COLLAGE_STATE.FEEDBACK);
    }
}
