import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT, STORAGE_NAME } from "~/GameConfig";
import ScoreService from "~/services/scoreService";
import { MenuOption } from "./MenuScene";

export default class HighScoreScene extends Phaser.Scene {
  private iconAside?: Phaser.GameObjects.Sprite;
  private currentOptionIndex;
  private menuOptions: MenuOption[] = [];

  private enterKey?: Phaser.Input.Keyboard.Key;
  private scoreService = new ScoreService(STORAGE_NAME);

  constructor() {
    super({ key: "HighScore" });
  }

  create() {
    this.currentOptionIndex = 3;
    this.cameras.main.setBackgroundColor(COLOR_PALETTE.dark1);
    this.add.text(GRID_UNIT * 4, GRID_UNIT * 5, "ANAKONDA", {
      font: "82px Berkelium",
    });
    this.enterKey = this.input.keyboard.addKey("ENTER");
    const highScores = this.scoreService.getHighScores();

    this.menuOptions = [
      {
        x: GRID_UNIT * 13,
        y: GRID_UNIT * 10,
        text: `1ST ${highScores[0]}`,
        callback: () => {},
      },
      {
        x: GRID_UNIT * 13,
        y: GRID_UNIT * 12,
        text: `2ND ${highScores[1]}`,
        callback: () => {},
      },
      {
        x: GRID_UNIT * 13,
        y: GRID_UNIT * 14,
        text: `3RD ${highScores[2]}`,
        callback: () => {},
      },
      {
        x: GRID_UNIT * 8,
        y: GRID_UNIT * 16,
        text: "BACK TO MAIN MENU",
        callback: () => {
          this.scene.start("Menu");
        },
      },
    ];
    this.iconAside = this.add.sprite(
      GRID_UNIT * 7,
      this.menuOptions[this.currentOptionIndex].y + GRID_UNIT / 2,
      "food"
    );

    // rendering buttons
    this.menuOptions.forEach((option, index) => {
      this.buildMenuOption(option, index);
    });
  }

  update() {
    if (this.enterKey?.isDown) {
      this.menuOptions[this.currentOptionIndex].callback();
    }
  }

  private buildMenuOption(
    option: MenuOption,
    index: number,
    debug: boolean = false
  ) {
    const optionBtn = this.add.text(option.x, option.y, option.text, {
      font: "28px Berkelium",
    });
    const zone = this.add
      .zone(
        optionBtn.x - optionBtn.width * optionBtn.originX - 16,
        optionBtn.y - optionBtn.height * optionBtn.originY - 16,
        optionBtn.width + 32,
        optionBtn.height + 32
      )
      .setOrigin(0, 0)
      .setInteractive({ cursor: "hand" })
      .once("pointerup", option.callback)
      .on("pointerover", () => {
        this.goToOption(index);
      });
    if (debug) {
      this.add.graphics().lineStyle(2, 0x00ff00).strokeRectShape(zone);
    }
  }

  private goToOption(indexOption: number) {
    const y = this.menuOptions[indexOption].y + GRID_UNIT / 2;
    this.currentOptionIndex = indexOption;
  }
}
