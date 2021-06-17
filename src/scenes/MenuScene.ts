import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
  private enterKey;

  constructor() {
    super({ key: "Menu" });
  }

  create() {
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height / 2;
    this.enterKey = this.input.keyboard.addKey("ENTER");

    // start button
    const startBtn = this.add
      .bitmapText(x, y, "clickFont", "NEW GAME")
      .setOrigin(0.5, 1);
    startBtn.setScale(2);

    this.add.tween({
      targets: [startBtn],
      ease: (k) => (k < 0.5 ? 0 : 1),
      duration: 250,
      yoyo: true,
      repeat: -1,
    });

    this.add
      .zone(
        startBtn.x - startBtn.width * startBtn.originX - 16,
        startBtn.y - startBtn.height * startBtn.originY - 16,
        startBtn.width + 32,
        startBtn.height + 32
      )
      .setOrigin(0, 0)
      .setInteractive()
      .once("pointerup", () => {
        this.scene.start("Game");
      });
  }

  update() {
    if (this.enterKey.isDown) {
      this.scene.start("Game");
    }
  }
}
