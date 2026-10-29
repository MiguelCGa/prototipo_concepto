import Phaser from 'phaser';


/**
 * Clase que representa un cartel de encargo. 
 * Contiene el sprite del personaje, el nombre del personaje 
 * y la descripción del encargo.
 */
export default class CommisionSign extends Phaser.GameObjects.Container {

    /**
     * Constructor del cartel de encargo
     * @param {Phaser.Scene} scene Escena a la que pertenece el cartel de encargo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {object} commision_info Objeto JSON con la información del encargo
     * @param {object} characters Objeto JSON con la información de los personajes
     */
    constructor(scene, x, y, commision_info, characters) {
        super(scene, x, y, null);
        this.scene.add.existing(this);

        let character_id = commision_info["character"];

        // cuadro UI
        this.add(new Phaser.GameObjects.Sprite(scene, 0, 0, character_id));
        this.add(new Phaser.GameObjects.Text(scene, 0, 200, characters[character_id]["name"]));
        this.add(new Phaser.GameObjects.Text(scene, 0, 250, commision_info["description"]));
    }



    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    // preUpdate(t, dt) {
    //     super.preUpdate(t, dt);
        
    // }

}
