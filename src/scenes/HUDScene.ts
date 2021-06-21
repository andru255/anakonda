import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT } from "~/GameConfig";

export default class HUDScene extends Phaser.Scene {
  private scoreLabel?: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: "HUD",
    });
  }

  init({ gameScene }: { gameScene: Phaser.Scene }) {
    gameScene.events.on("ate", (points) => this.setScore(points));
  }

  create() {
    this.scoreLabel = this.add.bitmapText(
      GRID_UNIT,
      GRID_UNIT / 2,
      "clickFont",
      "SCORE",
      GRID_UNIT
    );
  }

  private setScore(value = 0) {
    this.scoreLabel?.setText(`SCORE ${String(value)}`);
  }
}
