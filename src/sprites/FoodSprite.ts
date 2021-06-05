import Phaser from "phaser";

export default class FoodSprite extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.setPosition(x, y);
    this.setOrigin(0);
    this.setTint(0xfff000);
    this.setTintFill(0xfff000);
    this.setDisplaySize(10, 10);

    // adds to the scene
    scene.add.existing(this);
    // it enables methods like Velocity into to the PlayerSprite
    scene.physics.add.existing(this);
  }
}
