import Phaser from "phaser";
import { GRID_UNIT, GROUND } from "~/GameConfig";

export default class GridSprite extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    const grid = scene.add
      .grid(
        GROUND.X,
        GROUND.Y,
        GROUND.WIDTH,
        GROUND.HEIGHT,
        GRID_UNIT,
        GRID_UNIT,
        0xe6ceac
      )
      .setAltFillStyle(0xcdba94)
      .setOutlineStyle();
    grid.setAlpha(0.3);
    grid.setOrigin(0);
  }
}
