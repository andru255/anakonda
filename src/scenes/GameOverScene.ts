import Phaser from "phaser";
import { GRID_UNIT, GROUND } from "~/GameConfig";

export default class GameOverScene extends Phaser.Scene {
  private gameOverLabel?: Phaser.GameObjects.BitmapText;

  constructor() {
    super({ key: "GameOver" });
  }

  init({ gameScene }: { gameScene: Phaser.Scene }) {
    gameScene.events.on("lose", () => {
      this.showGameOver();
    });
  }

  create() {
    this.gameOverLabel = this.add
      .bitmapText(
        GROUND.WIDTH / 2 - GRID_UNIT * 2,
        GROUND.HEIGHT / 2,
        "clickFont",
        "GAME OVER",
        GRID_UNIT * 2
      )
      .setOrigin(0, 0)
      .setVisible(false);
  }

  private showGameOver() {
    this.gameOverLabel?.setVisible(true);
  }
}
