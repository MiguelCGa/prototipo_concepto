import Phaser from "phaser";

const end_comm_button_key = "end_comm_button";
import end_comm_button_image from '../../assets/sprites/ui/end_comm_button.png';

export default class EndCommButton extends Phaser.GameObjects.Sprite {
    static preload(scene) {
        scene.load.image(end_comm_button_key, end_comm_button_image);
    }

    constructor(scene, data, state_controller, commision, canvas) {
        super(scene, data.pos.x, data.pos.y, end_comm_button_key);

        this.state_controller = state_controller;

        this.setInteractive();
        this.on('pointerdown', () => {
            this._on_click();
        });
    }

    _on_click() {
        this.state_controller.end_commision();
    }
}