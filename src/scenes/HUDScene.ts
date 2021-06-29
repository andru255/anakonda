import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT, GROUND } from "~/GameConfig";

export default class HUDScene extends Phaser.Scene {
  private scoreLabel?: Phaser.GameObjects.Text;
  private soundLabel?: Phaser.GameObjects.Text;
  private footerLabel?: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "HUD",
    });
  }

  init({ gameScene }: { gameScene: Phaser.Scene }) {
    gameScene.events.on("ate", (points) => this.setScore(points));
  }

  create() {
    this.scoreLabel = this.add.text(GRID_UNIT, GRID_UNIT / 2, "SCORE", {
      font: "28px Berkelium",
    });

    this.soundLabel = this.add.text(
      GROUND.WIDTH - GRID_UNIT * 5,
      GRID_UNIT / 2,
      "SOUND OFF",
      {
        font: "28px Berkelium",
      }
    );

    this.footerLabel = this.add.text(
      GRID_UNIT * 2,
      GROUND.HEIGHT + GRID_UNIT * 5,
      "MESSAGES HERE",
      {
        font: "28px Berkelium",
      }
    );
  }

  private setScore(value = 0) {
    this.scoreLabel?.setText(`SCORE ${String(value)}`);
  }
}
