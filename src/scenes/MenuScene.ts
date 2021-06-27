import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT, GROUND } from "~/GameConfig";

export default class MenuScene extends Phaser.Scene {
  private enterKey;

  constructor() {
    super({ key: "Menu" });
  }

  create() {
    this.cameras.main.setBackgroundColor(COLOR_PALETTE.dark1);
    const x = GRID_UNIT * 10;
    const y = GRID_UNIT * 10;

    let mainTitleText = this.add.text(
      GRID_UNIT * 4,
      GRID_UNIT * 5,
      "ANAKONDA",
      {
        font: "82px Berkelium",
      }
    );

    this.enterKey = this.input.keyboard.addKey("ENTER");

    // start button 2
    const startBtn = this.add.text(
      GRID_UNIT * 11,
      GRID_UNIT * 12,
      "START GAME!",
      {
        font: "28px Berkelium",
      }
    );

    this.add.tween({
      targets: [startBtn],
      ease: (k) => (k < 0.5 ? 0 : 1),
      duration: 250,
      yoyo: true,
      repeat: -1,
    });

    this.add
      .zone(
        startBtn.x - startBtn.width * startBtn.originX - 16,
        startBtn.y - startBtn.height * startBtn.originY - 16,
        startBtn.width + 32,
        startBtn.height + 32
      )
      .setOrigin(0, 0)
      .setInteractive()
      .once("pointerup", () => {
        this.scene.start("Game");
      });
  }

  update() {
    if (this.enterKey.isDown) {
      this.scene.start("Game");
    }
  }
}
