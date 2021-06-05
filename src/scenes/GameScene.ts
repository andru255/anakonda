import Phaser from "phaser";
import FoodSprite from "~/sprites/FoodSprite";
import PlayerSprite from "~/sprites/PlayerSprite";

export default class GameScene extends Phaser.Scene {
  private anakonda?: PlayerSprite;
  private food?: FoodSprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("hello-world");
  }

  preload() {}

  create() {
    this.anakonda = new PlayerSprite(this, 50, 50, "anakonda");
    this.food = new FoodSprite(this, 100, 100, "apple");
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.world.addOverlap(
      this.anakonda,
      this.food,
      (anakonda, food) => {
        food.destroy();
      }
    );
  }

  update() {
    if (!this.cursors) {
      this.anakonda?.setVelocityX(0);
    }

    if (this.cursors?.right.isDown) {
      this.anakonda?.faceRight();
      return;
    }

    if (this.cursors?.left.isDown) {
      this.anakonda?.faceLeft();
      return;
    }

    if (this.cursors?.up.isDown) {
      this.anakonda?.faceTop();
      return;
    }

    if (this.cursors?.down.isDown) {
      this.anakonda?.faceBottom();
      return;
    }
  }
}
