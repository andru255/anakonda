import { GRID } from "~/GameConfig";
import { AnakondaObject } from "./Anakonda";

export default class FoodImageObject extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x, y, texture) {
    super(scene, x, y, texture);
    this.setOrigin(0);
    this.setDisplaySize(GRID.WIDTH, GRID.HEIGHT);
    scene.children.add(this);
  }

  reposition(scene: Phaser.Scene, anakonda: AnakondaObject) {
    const { HEIGHT, WIDTH, LENGTH } = GRID;
    const { width, height } = scene.sys.game.config;
    const numOfCellsY = (height as number) / HEIGHT;
    const numOfCellsX = (width as number) / WIDTH;

    const testGrid = Array.from({ length: numOfCellsY }, () =>
      Array.from({ length: numOfCellsX }, () => true)
    );

    anakonda.updateGrid(testGrid);

    const validLocations: { x: number; y: number }[] = [];

    for (let y = 0; y < numOfCellsY; y++) {
      for (let x = 0; x < numOfCellsX; x++) {
        try {
        } catch (err) {
          console.error(x, y);
        }
        if (testGrid[y][x] === true) {
          validLocations.push({ x, y });
        }
      }
    }

    if (validLocations.length > 0) {
      let pos = Phaser.Math.RND.pick(validLocations);
      this.setPosition(pos.x * GRID.WIDTH, pos.y * GRID.HEIGHT);
      return true;
    }
    return false;
  }
}
