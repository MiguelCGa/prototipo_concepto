import Phaser from 'phaser';

import { CollageStateMachine } from '../collage_state_machine/collage_state_machine.js';
import CollageStateController from '../collage_state_machine/collage_state_controller.js';
import CollageStateManager from '../collage_state_machine/collage_state_manager.js';

import CommisionSign from '../commision_selection/commision_sign.js';

import StartCommButton from '../assets_selection/start_comm_button.js';
import BGSelector from '../assets_selection/bg_selector.js';
import SheetSelector from '../assets_selection/sheet_selector.js';

import characters from "../../assets/data/characters.json";

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

        CollageStateManager.preload(this);
    }

    /**
     * Creación de los elementos de la escena de collage
     */
    create() {
        this.collage_state_manager = new CollageStateManager(this);

        this.collage_state_machine = new CollageStateMachine(
            (params) => { this.collage_state_manager.enter_commision_selection(params) },
            (params) => { this.collage_state_manager.enter_asset_selection(params) },
            (params) => { this.collage_state_manager.enter_canvas(params) },
            (params) => { this.collage_state_manager.enter_feedback(params) },
            () => { this.collage_state_manager.exit_commision_selection() },
            () => { this.collage_state_manager.exit_asset_selection() },
            () => { this.collage_state_manager.exit_canvas() },
            () => { this.collage_state_manager.exit_feedback() },
        );
        
        this.collage_state_controller = new CollageStateController(this.collage_state_machine);
        this.collage_state_controller.init();
    }
}