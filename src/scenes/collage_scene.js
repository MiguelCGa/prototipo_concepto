import Phaser from 'phaser';
import CommisionSignGenerator from '../commision_info/commision_sign_generator.js'

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
        for (const [key, value] of Object.entries(characters)) {
            this.load.image(key, value["sprite"]);
        }
    }

    /**
     * Creación de los elementos de la escena de collage
     */
    create() {
        this.commision_sign_generator = new CommisionSignGenerator();
        this.commision_sign_generator.create_three_signs(this, 0, 0);
    }

}