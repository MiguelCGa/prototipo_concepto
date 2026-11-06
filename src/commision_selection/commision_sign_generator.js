import Phaser from 'phaser';
import CommisionSign from './commision_sign.js'

import characters from "../../assets/data/characters.json";
import commisions from "../../assets/data/commisions.json";


/**
 * Clase que representa un cartel de encargo. 
 * Contiene el sprite del personaje, el nombre del personaje 
 * y la descripción del encargo.
 */
export default class CommisionSignGenerator {

    constructor() {
        this.current_commision = 0;
    }

    create_three_signs(scene, data, state_controller) {
        this.current_commision = 0;
        let signs = [];
        for (let i = 0; i < 3; ++i) {
            let sign_data = { pos : { x: data.pos.x + 250 * i, y: data.pos.y } };
            signs[i] = new CommisionSign(scene, sign_data, commisions[this.current_commision], state_controller);
            ++this.current_commision;
        }
        return signs;
    }

}