import { COLOR_PALETTE, GRID_UNIT, GROUND } from "~/GameConfig";
import { AnakondaObject } from "./Anakonda";

export default class FoodImageObject extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x, y, texture) {
    super(scene, x, y, texture);
    this.setDisplaySize(GRID_UNIT, GRID_UNIT);
    this.setTintFill(COLOR_PALETTE.light3);
    scene.children.add(this);
  }

  reposition(scene: Phaser.Scene, anakonda: AnakondaObject) {
    const numOfCellsY = GROUND.HEIGHT / GRID_UNIT;
    const numOfCellsX = GROUND.WIDTH / GRID_UNIT;

    const testGrid = Array.from({ length: numOfCellsY }, () =>
      Array.from({ length: numOfCellsX }, () => true)
    );

    anakonda.updateGrid(testGrid);

    const validLocations: { x: number; y: number }[] = [];

    for (let y = 0; y < numOfCellsY; y++) {
      for (let x = 0; x < numOfCellsX; x++) {
        if (testGrid[y][x] === true) {
          validLocations.push({ x, y });
        }
      }
    }

    if (validLocations.length > 0) {
      let pos = Phaser.Math.RND.pick(validLocations);
      this.setPosition(
        pos.x * GRID_UNIT + GROUND.X + GRID_UNIT / 2,
        pos.y * GRID_UNIT + GROUND.Y + GRID_UNIT / 2
      );
      //test all positions
      // this.renderValidLocations(scene, validLocations);

      return true;
    }
    return false;
  }

  private renderValidLocations(scene: Phaser.Scene, validLocations: any[]) {
    const body = scene.add.group({
      defaultKey: "testFoodGroup",
      createCallback: () => {},
    });
    validLocations.forEach((location) => {
      const foodTest = body.create(
        location.x * GRID_UNIT + GROUND.X + GRID_UNIT / 2,
        location.y * GRID_UNIT + GROUND.Y + GRID_UNIT / 2
      ) as Phaser.GameObjects.Sprite;
      foodTest.setDisplaySize(GRID_UNIT, GRID_UNIT);
      foodTest.setTintFill(COLOR_PALETTE.dark3);
    });
  }
}
