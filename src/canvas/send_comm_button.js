import Phaser from "phaser";

const send_comm_button_key = "send_comm_button";
import send_comm_button_image from '../../assets/sprites/ui/send_comm_button.png';

export default class SendCommButton extends Phaser.GameObjects.Sprite {
    static preload(scene) {
        scene.load.image(send_comm_button_key, send_comm_button_image);
    }

    constructor(scene, data, state_controller, commision, canvas, tool) {
        super(scene, data.pos.x, data.pos.y, send_comm_button_key);
        this.scene.add.existing(this);

        this.state_controller = state_controller;
        this.commision = commision;
        this.canvas = canvas;
        this.tool = tool;

        this.setInteractive();
        this.on('pointerdown', () => {
            this._on_click();
        });
    }

    _on_click() {
        if (this.tool.moving != null) {
            this.tool.moving.destroy();
        }
        this.state_controller.send_commision(this.commision, this.canvas);
    }
}