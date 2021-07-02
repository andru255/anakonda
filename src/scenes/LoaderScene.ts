import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT } from "~/GameConfig";

export default class LoaderScene extends Phaser.Scene {
  /** just for fun **/
  boxDemo?: Phaser.GameObjects.Sprite;
  /** just for fun **/

  constructor() {
    super({ key: "Loader" });
  }

  preload() {
    // audios
    this.load.audio("eat", ["sounds/eat.mp3", "sounds/eat.ogg"]);
    this.load.audio("die", ["sounds/die.mp3", "sounds/die.ogg"]);
    // images
    this.load.image("bodyPart", "sprites/anakonda-body-part-alpha.png");
    this.load.image("headPart", "sprites/anakonda-head-alpha.png");
    this.load.image("food", "sprites/food.png");
  }

  create(data: { fadeIn: boolean }) {
    // It needs to start
    this.cameras.main.setBackgroundColor(COLOR_PALETTE.dark1);
    if (data.fadeIn) {
      this.cameras.main.fadeIn(700, 0, 0, 0);
      this.cameras.main.once(
        Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE,
        () => {
          this.scene.start("Menu");
        }
      );
    }
    /** just for fun **/
    // this.cameras.main.setBackgroundColor(COLOR_PALETTE.dark1);
    // this.boxDemo = this.add.sprite(GRID_UNIT, GRID_UNIT, "headPart");
    // this.boxDemo.s
    // this.boxDemo.setRotation((-90 * Math.PI) / 180);
    /** just for fun **/
  }
}
