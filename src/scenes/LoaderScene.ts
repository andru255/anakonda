import Phaser from "phaser";

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
  }
  create() {
    this.scene.start("Menu");
  }
}
