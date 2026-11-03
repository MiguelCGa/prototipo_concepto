import Phaser from "phaser";
import CommisionSignGenerator from '../commision_selection/commision_sign_generator.js'
import { COLLAGE_STATE } from '../collage_state_machine/collage_state_machine.js'

import CommisionSign from '../commision_selection/commision_sign.js';

import StartCommButton from '../assets_selection/start_comm_button.js';
import BGSelector from '../assets_selection/bg_selector.js';
import SheetSelector from '../assets_selection/sheet_selector.js';

import data from "../../assets/data/collage_scene_data.json";

export default class CollageStateManager {

    static preload(scene) {
        CommisionSign.preload(scene);
        StartCommButton.preload(scene);
        BGSelector.preload(scene);
        SheetSelector.preload(scene);
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

            }, /* feedback */ {

            }
        ]
    }
    
    enter_commision_selection(params) {
        this.state_gos[COLLAGE_STATE.COMM_SELECT].signs = this.commision_sign_generator.create_three_signs(
            this.scene, 
            data.comm_select_signs, 
            this.scene.collage_state_controller);
    }

    enter_asset_selection(params) {
        this.state_gos[COLLAGE_STATE.ASSETS_SELECT].sign = new CommisionSign(
            this.scene,
            data.asset_select_sign,
            params.selected_comm,
            this.scene.collage_state_controller);
        let bg = this.state_gos[COLLAGE_STATE.ASSETS_SELECT].bg_selector = new BGSelector(
            this.scene,
            data.asset_select_bg);
        let sheet = this.state_gos[COLLAGE_STATE.ASSETS_SELECT].sheet_selector = new SheetSelector(
            this.scene,
            data.asset_select_sheet);
        this.state_gos[COLLAGE_STATE.ASSETS_SELECT].start_comm_button = new StartCommButton(
            this.scene,
            data.asset_select_start_button,
            this.scene.collage_state_controller,
            params.selected_comm,
            bg,
            sheet);
    }

    enter_canvas(params) {

    }

    enter_feedback(params) {

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
