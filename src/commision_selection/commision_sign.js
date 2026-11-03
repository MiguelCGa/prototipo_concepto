import Phaser from 'phaser';

import characters from "../../assets/data/characters.json";

const comm_frame_key = "commision_frame";

/**
 * Clase que representa un cartel de encargo. 
 * Contiene el sprite del personaje, el nombre del personaje 
 * y la descripción del encargo.
 */
export default class CommisionSign extends Phaser.GameObjects.Container {

    static preload(scene) {
        scene.load.image(comm_frame_key, "./assets/sprites/ui/commision_frame.png");
    }

    /**
     * Constructor del cartel de encargo
     * @param {Phaser.Scene} scene Escena a la que pertenece el cartel de encargo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {object} commision_info Objeto JSON con la información del encargo
     * @param {object} satate_controller 
     */
    constructor(scene, x, y, commision_info, state_controller) {
        super(scene, x, y, null);
        this.scene.add.existing(this);

        this.state_controller = state_controller;
        this.commision_info = commision_info;

        let character_id = commision_info["character"];

        // Marco cartel
        let commision_frame = new Phaser.GameObjects.Sprite(scene, 0, 0, comm_frame_key);
        this.add(commision_frame);

        // Imágen personje
        this.add(new Phaser.GameObjects.Sprite(scene, 0, -50, character_id));
        
        // Nomber personaje
        this.add(new Phaser.GameObjects.Text(scene, -100, 50, characters[character_id]["name"]));
        
        // Descripción encargo
        this.add(new Phaser.GameObjects.Text(scene, -100, 75, commision_info["description"]));

        this._make_clickable(commision_frame, state_controller);
    }

    _make_clickable(commision_frame) {
        commision_frame.setInteractive();
        commision_frame.on('pointerdown', () => {
            this._on_click();
        });
    }

    _on_click() {
        this.state_controller.select_commision(this.commision_info);
    }

}
