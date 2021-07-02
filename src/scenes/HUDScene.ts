import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT, GROUND, STORAGE_NAME } from "~/GameConfig";
import ScoreService from "~/services/scoreService";

export default class HUDScene extends Phaser.Scene {
  private scoreLabel?: Phaser.GameObjects.Text;
  private soundLabel?: Phaser.GameObjects.Text;
  private footerLabel?: Phaser.GameObjects.Text;

  private footerMessages = [
    "Use the arrow keys to move around",
    "Press P to pause/resume the game",
    "Be careful with the borders!",
    "Press M to mute/unmute the game",
  ];

  private footerText = "";

  constructor() {
    super({
      key: "HUD",
    });
  }

  init({ gameScene }: { gameScene: Phaser.Scene }) {
    gameScene.events.on("ate", (points) => this.setScore(points));
    gameScene.events.on("mute", (points) => {
      this.setSoundStateText("OFF");
    });
    gameScene.events.on("unmute", (points) => {
      this.setSoundStateText();
    });
  }

  create() {
    this.scoreLabel = this.add.text(GRID_UNIT, GRID_UNIT / 2, "SCORE 00", {
      font: "28px Berkelium",
    });

    this.soundLabel = this.add.text(
      GROUND.WIDTH - GRID_UNIT * 5,
      GRID_UNIT / 2,
      ``,
      {
        font: "28px Berkelium",
      }
    );
    console.log("sound");
    let value = this.game.sound.mute ? "OFF" : "ON";
    this.setSoundStateText(value);

    this.footerText = this.footerMessages[0];
    this.time.addEvent({
      callback: () => {
        this.footerText = Phaser.Math.RND.pick(this.footerMessages);
        this.footerLabel?.setText(this.footerText);
      },
      delay: 3600,
      loop: true,
    });

    this.footerLabel = this.add.text(
      GRID_UNIT * 2,
      GROUND.HEIGHT + GRID_UNIT * 5,
      this.footerText,
      {
        font: "28px Berkelium",
      }
    );
  }

  private setScore(value = 0) {
    this.scoreLabel?.setText(`SCORE ${String(value)}`);
  }

  private setSoundStateText(value = "ON") {
    this.soundLabel?.setText(`SOUND ${value}`);
  }
}
