import Phaser from "phaser";
import { GRID } from "~/GameConfig";

export default class GridSprite extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    const { width, height } = scene.sys.game.config;
    const grid = scene.add
      .grid(
        x,
        y,
        width as number,
        height as number,
        GRID.WIDTH,
        GRID.HEIGHT,
        0xe6ceac
      )
      .setAltFillStyle(0xcdba94);
    grid.setOrigin(0);
    // adds to the scene
    scene.add.existing(this);
  }
}
