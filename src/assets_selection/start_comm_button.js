import Phaser from 'phaser'

const start_comm_button_key = 'start_comm_button';
import start_comm_button_image from "../../assets/sprites/ui/start_comm_button.png"

export default class StartCommButton extends Phaser.GameObjects.Sprite {

    static preload(scene) {
        scene.load.image(start_comm_button_key, start_comm_button_image);
    }

    constructor(scene, data, state_controller, commision, bg_selector, sheet_selector) {
        super(scene, data.pos.x, data.pos.y, start_comm_button_key);
        scene.add.existing(this)
        
        this.state_controller = state_controller;
        this.commision = commision;
        this.bg_selector = bg_selector;
        this.sheet_selector = sheet_selector;
        
        this.setInteractive();
        this.on('pointerdown', () => {
            this._on_click();
        });
    }

    _on_click() {
        this.state_controller.start_commision(this.commision, this.bg_selector.get_bg(), this.sheet_selector.get_sheet(), this.sheet_selector.get_sheet_data());
    }
}