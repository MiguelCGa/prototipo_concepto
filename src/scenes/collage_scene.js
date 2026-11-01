import Phaser from 'phaser';
import CommisionSignGenerator from '../commision_info/commision_sign_generator.js'
import { CollageStateMachine } from '../collage_state_machine/collage_state_machine.js'
import CollageStateController from '../collage_state_machine/collage_state_controller.js'

import CommisionSign from '../commision_info/commision_sign.js';

import characters from "../../assets/data/characters.json";
import commisions from "../../assets/data/commisions.json";

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

        // load commision frame
        this.load.image("commision_frame", "./assets/sprites/ui/commision_frame.png");

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
                sheet_selector: undefined
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
        this.state_gos.signs = this.commision_sign_generator.create_three_signs(this, 200, 200, this.collage_state_controller);
    }

    enter_asset_selection(params) {
        this.state_gos.sign = new CommisionSign(this, 200, 200, params.selected_comm, this.collage_state_controller);
    }

    enter_canvas(params) {

    }

    enter_feedback(params) {

    }

    exit_commision_selection(params) {
        this.state_gos.signs.forEach((sign) => {
            sign.destroy();
        });
    }

    exit_asset_selection(params) {

    }

    exit_canvas(params) {

    }

    exit_feedback(params) {

    }
}