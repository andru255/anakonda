import Phaser from "phaser";
import { COLOR_PALETTE } from "~/GameConfig";

export default class PlayerSprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    //this.setPosition(x, y);
    this.setOrigin(0);

    // adds to the scene
    scene.add.existing(this);
    // it enables methods like Velocity into to the PlayerSprite
    //scene.physics.add.existing(this);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }

  faceRight() {
    this.setVelocity(100, 0);
  }

  faceLeft() {
    this.setVelocity(-100, 0);
  }

  faceTop() {
    this.setVelocity(0, -100);
  }

  faceBottom() {
    this.setVelocity(0, 100);
  }
}
