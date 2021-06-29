import Phaser from "phaser";
import { GRID_UNIT, GROUND } from "~/GameConfig";

export default class GameOverScene extends Phaser.Scene {
  private gameOverLabel?: Phaser.GameObjects.Text;

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
      .text(GROUND.WIDTH / 2 - GRID_UNIT * 5, GROUND.HEIGHT / 2, "GAME OVER", {
        font: "48px Berkelium",
      })
      .setOrigin(0, 0)
      .setVisible(false);
  }

  private showGameOver() {
    this.gameOverLabel?.setVisible(true);
  }
}
