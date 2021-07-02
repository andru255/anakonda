import Phaser from "phaser";
import { GRID_UNIT, GROUND, STORAGE_NAME } from "~/GameConfig";
import ScoreService from "~/services/scoreService";

export default class PauseScene extends Phaser.Scene {
  private label?: Phaser.GameObjects.Text;

  constructor() {
    super("Pause");
  }

  init({ gameScene }: { gameScene: Phaser.Scene }) {
    gameScene.events.on("paused", (score) => {
      this.showLabel();
    });

    gameScene.events.on("resume", (score) => {
      this.hideLabel();
    });
  }

  create() {
    this.label = this.add
      .text(GROUND.WIDTH / 2 - GRID_UNIT * 2, GROUND.HEIGHT / 2, "PAUSED", {
        font: "48px Berkelium",
      })
      .setOrigin(0, 0)
      .setVisible(false);

    this.tweens.add({
      targets: this.label,
      alpha: { from: 1, to: 0 },
      ease: "Sine.InOut",
      duration: 300,
      repeat: -1,
      yoyo: true,
    });
  }

  private showLabel() {
    this.label?.setVisible(true);
  }

  private hideLabel() {
    this.label?.setVisible(false);
  }
}
