import Phaser from "phaser";
import { COLOR_PALETTE } from "~/GameConfig";

export default class HUDScene extends Phaser.Scene {
  private scoreLabel?: Phaser.GameObjects.BitmapText;
  private gameOverLabel?: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: "HUD",
    });
  }

  init({ gameScene }: { gameScene: Phaser.Scene }) {
    gameScene.events
      .on("ate", (points) => this.setScore(points))
      .on("lose", () => {
        this.showGameOver();
      });
  }

  create() {
    this.cameras.main.setBackgroundColor(COLOR_PALETTE.dark1);
    this.scoreLabel = this.add.bitmapText(10, 5, "clickFont", "SCORE", 28);
    this.gameOverLabel = this.add
      .bitmapText(100, 100, "clickFont", "GAME OVER", 40)
      .setOrigin(0, 0)
      .setVisible(false);
  }

  private setScore(value = 0) {
    this.scoreLabel?.setText(`SCORE ${String(value)}`);
  }

  private showGameOver() {
    this.gameOverLabel?.setVisible(true);
  }
}
