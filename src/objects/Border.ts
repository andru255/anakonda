import Phaser from "phaser";
import { GRID_UNIT, COLOR_PALETTE, GROUND } from "~/GameConfig";

export class BorderObject {
  private body?: Phaser.GameObjects.Group;
  private borderPiece?: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x, y) {
    this.body = scene.add.group({
      defaultKey: "borderGround",
      createCallback: (obj) => {},
    });
    this.init();
  }

  init() {
    // TOP
    this.borderPiece = this.body?.create(GROUND.X, GROUND.Y - GRID_UNIT);
    this.borderPiece?.setOrigin(0);
    this.borderPiece?.setDisplaySize(GROUND.WIDTH, GRID_UNIT);
    this.borderPiece?.setTintFill(COLOR_PALETTE.dark2);
    // BOTTOM
    this.borderPiece = this.body?.create(GROUND.X, GROUND.Y + GROUND.HEIGHT);
    this.borderPiece?.setOrigin(0);
    this.borderPiece?.setDisplaySize(GROUND.WIDTH, GRID_UNIT);
    this.borderPiece?.setTintFill(COLOR_PALETTE.dark2);
    // LEFT
    this.borderPiece = this.body?.create(
      GROUND.X - GRID_UNIT,
      GROUND.Y - GRID_UNIT
    );
    this.borderPiece?.setOrigin(0);
    this.borderPiece?.setDisplaySize(GRID_UNIT, GROUND.HEIGHT + GRID_UNIT * 2);
    this.borderPiece?.setTintFill(COLOR_PALETTE.dark2);
    // RIGHT
    this.borderPiece = this.body?.create(
      GROUND.WIDTH + GRID_UNIT * 2,
      GROUND.Y - GRID_UNIT
    );
    this.borderPiece?.setOrigin(0);
    this.borderPiece?.setDisplaySize(GRID_UNIT, GROUND.HEIGHT + GRID_UNIT * 2);
    this.borderPiece?.setTintFill(COLOR_PALETTE.dark2);
  }
}
