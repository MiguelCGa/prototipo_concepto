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

    create_sign(scene, x, y) {
        scene.add.existing(new CommisionSign(scene, x, y, commisions[this.current_commision], characters));
        ++this.current_commision;
    }

    create_three_signs(scene, x, y) {
        for (let i = 0; i < 3; ++i) {
            this.create_sign(scene, x + 250 * i, y);
        }
    }

}