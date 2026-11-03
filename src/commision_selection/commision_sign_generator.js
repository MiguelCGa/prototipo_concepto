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

    constructor(){
        this.current_commision = 0;
    }

    create_sign(scene, x, y, commision, state_controller) {
        let sign = new CommisionSign(scene, x, y, commision, state_controller)
        scene.add.existing(sign);
        return sign;
    }

    create_three_signs(scene, x, y, state_controller) {
        let signs = [];
        for (let i = 0; i < 3; ++i) {
            signs[i] = this.create_sign(scene, x + 250 * i, y, commisions[this.current_commision], state_controller);
            ++this.current_commision;
        }
        return signs;
    }

}