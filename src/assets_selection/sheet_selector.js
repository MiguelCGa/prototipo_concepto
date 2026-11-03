import Phaser from 'phaser'

export default class SheetSelector extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y, null);
        this.sheet = undefined;
    }

    get_sheet() {
        return this.sheet;
    }
}