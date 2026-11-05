import Phaser from 'phaser'
import StickerSpawner from './sticker_spawner';

export default class SheetSpawner extends Phaser.GameObjects.Container {
    constructor(scene, data, image, frames, tool, canvas) {
        super(scene, data.pos.x, data.pos.y, null);
        this.scene.add.existing(this);

        this.sticker_spawners = [];

        console.log("sheet spawner constructor. x: " + this.x + ", y: " + this.y);

        let i = 0;
        let y = -200;
        let y_space = 30;
        frames.forEach(frame => {
            this.sticker_spawners[i] = new StickerSpawner(scene, 0, y, image, frame.filename, tool, canvas);
            this.add(this.sticker_spawners[i]);
            y = y + y_space + frame.frame.h;
            ++i;
        });
    }
}