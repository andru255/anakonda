import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT } from "~/GameConfig";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("logo");
  }

  preload() {
    this.load.image("m30-logo", "sprites/m30-logo-4x.png");
  }

  create() {
    this.cameras.main.setBackgroundColor(COLOR_PALETTE.dark1);
    this.add
      .image(GRID_UNIT * 15, GRID_UNIT * 12, "m30-logo")
      .setTintFill(COLOR_PALETTE.light1)
      .setScale(2);

    this.hideAndContinue();

    this.input.keyboard.once("keydown-SPACE", () => {
      this.hideAndContinue(500);
    });

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (camera, fx) => {
        this.time.delayedCall(200, () => {
          this.scene.start("Loader", { fadeIn: true });
        });
      }
    );
  }

  hideAndContinue(time = 1000) {
    this.cameras.main.fadeOut(time, 0, 0, 0);
  }
}
