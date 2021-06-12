import { GRID } from "~/GameConfig";
import { AnakondaObject } from "./Anakonda";

export default class FoodImageObject extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x, y, texture) {
    super(scene, x, y, texture);
    this.setOrigin(0);
    scene.children.add(this);
  }

  reposition(anakonda: AnakondaObject) {
    const { HEIGHT, WIDTH, LENGTH } = GRID;
    const testGrid = Array.from({ length: HEIGHT }, () =>
      Array.from({ length: WIDTH }, () => true)
    );

    anakonda.updateGrid(testGrid);

    const validLocations: { x: number; y: number }[] = [];

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        if (testGrid[x][y] === true) {
          validLocations.push({ x, y });
        }
      }
    }

    if (validLocations.length > 0) {
      let pos = Phaser.Math.RND.pick(validLocations);
      this.setPosition(pos.x * LENGTH, pos.y * LENGTH);
      console.log("reposition!:pos", this.x, this.y);
      return true;
    }
    return false;
  }
}
