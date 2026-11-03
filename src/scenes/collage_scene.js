import Phaser from 'phaser';
import CommisionSignGenerator from '../commision_selection/commision_sign_generator.js'
import { COLLAGE_STATE, CollageStateMachine } from '../collage_state_machine/collage_state_machine.js'
import CollageStateController from '../collage_state_machine/collage_state_controller.js'

import CommisionSign from '../commision_selection/commision_sign.js';

import StartCommButton from '../assets_selection/start_comm_button.js';
import BGSelector from '../assets_selection/bg_selector.js';
import SheetSelector from '../assets_selection/sheet_selector.js';

import characters from "../../assets/data/characters.json";
import commisions from "../../assets/data/commisions.json";

import data from "../../assets/data/collage_scene_data.json";

/**
 *  
 * @extends Phaser.Scene
 */
export default class CollageScene extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'collage' });
    }

    preload() {
        // load character sprites
        for (const [key, value] of Object.entries(characters)) {
            this.load.image(key, value["sprite"]);
        }

        CommisionSign.preload(this);
        StartCommButton.preload(this);
        BGSelector.preload(this);
        SheetSelector.preload(this);
    }

    /**
     * Creación de los elementos de la escena de collage
     */
    create() {
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

        this.collage_state_machine = new CollageStateMachine(
            (params) => { this.enter_commision_selection(params) },
            (params) => { this.enter_asset_selection(params) },
            (params) => { this.enter_canvas(params) },
            (params) => { this.enter_feedback(params) },
            () => { this.exit_commision_selection() },
            () => { this.exit_asset_selection() },
            () => { this.exit_canvas() },
            () => { this.exit_feedback() },
        );
        
        this.collage_state_controller = new CollageStateController(this.collage_state_machine);
        this.collage_state_controller.init();
    }

    enter_commision_selection(params) {
        this.state_gos[COLLAGE_STATE.COMM_SELECT].signs = this.commision_sign_generator.create_three_signs(this, 
            data.comm_select_signs, 
            this.collage_state_controller);
    }

    enter_asset_selection(params) {
        this.state_gos[COLLAGE_STATE.ASSETS_SELECT].sign = new CommisionSign(this,
            data.asset_select_sign,
            params.selected_comm,
            this.collage_state_controller);
        let bg = this.state_gos[COLLAGE_STATE.ASSETS_SELECT].bg_selector = new BGSelector(this,
            data.asset_select_bg);
        let sheet = this.state_gos[COLLAGE_STATE.ASSETS_SELECT].sheet_selector = new SheetSelector(this,
            data.asset_select_sheet);
        this.state_gos[COLLAGE_STATE.ASSETS_SELECT].start_comm_button = new StartCommButton(this,
            data.asset_select_start_button,
            this.collage_state_controller,
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