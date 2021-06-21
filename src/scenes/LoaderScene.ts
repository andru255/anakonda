import Phaser from "phaser";
import { COLOR_PALETTE } from "~/GameConfig";

export default class LoaderScene extends Phaser.Scene {
  constructor() {
    super({ key: "Loader" });
  }
  preload() {
    this.load.bitmapFont(
      "clickFont",
      "fonts/click/click_0.png",
      "fonts/click/click.xml"
    );
    this.load.audio("eat", ["sounds/eat.mp3", "sounds/eat.ogg"]);
    this.load.audio("die", ["sounds/die.mp3", "sounds/die.ogg"]);
    this.load.image("bodyPart", "sprites/anakonda-body-part.png");
    this.load.image("headPart", "sprites/anakonda-head-alpha.png");
  }
  create() {
    this.scene.start("Menu");
  }
}
