import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT, GROUND } from "~/GameConfig";

export interface MenuOption {
  x: number;
  y: number;
  text: string;
  callback: () => void;
}
export default class MenuScene extends Phaser.Scene {
  private iconAside?: Phaser.GameObjects.Sprite;
  private currentOptionIndex = 0;

  private enterKey?: Phaser.Input.Keyboard.Key;
  private upKey?: Phaser.Input.Keyboard.Key;
  private downKey?: Phaser.Input.Keyboard.Key;

  private menuOptions: MenuOption[] = [];

  constructor() {
    super({ key: "Menu" });
  }

  create() {
    this.menuOptions = [
      {
        x: GRID_UNIT * 11,
        y: GRID_UNIT * 12,
        text: "START GAME!",
        callback: () => {
          this.scene.start("Game");
        },
      },
      {
        x: GRID_UNIT * 11,
        y: GRID_UNIT * 15,
        text: "HALL OF FAME",
        callback: () => {
          console.log("Show hall of fame! :D");
        },
      },
    ];

    this.cameras.main.setBackgroundColor(COLOR_PALETTE.dark1);

    this.iconAside = this.add.sprite(
      GRID_UNIT * 10,
      this.menuOptions[0].y + GRID_UNIT / 2,
      "food"
    );

    this.add.text(GRID_UNIT * 4, GRID_UNIT * 5, "ANAKONDA", {
      font: "82px Berkelium",
    });

    this.enterKey = this.input.keyboard.addKey("ENTER");
    this.upKey = this.input.keyboard.addKey("UP");
    this.downKey = this.input.keyboard.addKey("DOWN");

    // rendering buttons
    this.menuOptions.forEach((option, index) => {
      this.buildMenuOption(option, index);
    });
  }

  update() {
    if (this.enterKey?.isDown) {
      this.menuOptions[this.currentOptionIndex].callback();
    }

    if (this.upKey?.isDown) {
      this.goToOption(0);
    }

    if (this.downKey?.isDown) {
      this.goToOption(1);
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
    this.iconAside?.setY(y);
    this.currentOptionIndex = indexOption;
  }
}
