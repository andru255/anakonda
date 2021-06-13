import Phaser from "phaser";
import { COLOR_PALETTE, GRID } from "~/GameConfig";
import FoodGridData from "./Food";

export class AnakondaObject {
  private body?: Phaser.GameObjects.Group;
  private head: Phaser.GameObjects.Sprite;
  private direction: Phaser.Geom.Point;
  private headPosition: Phaser.Geom.Point = new Phaser.Geom.Point(0, 0);
  private tailPosition = new Phaser.Math.Vector2(0, 0);

  public isAlive: Boolean = true;
  private updated: Boolean = true;
  private moveTime: number = 0;
  private moveDelay: number = 100;

  constructor(scene: Phaser.Scene, x, y) {
    this.body = scene.add.group({
      defaultKey: "anakondaBody",
      createCallback: (obj) => {},
    });
    this.head = this.body.create(x, y);
    this.head.setTintFill(COLOR_PALETTE.light4);
    this.head.setOrigin(0);
    this.head.setDisplaySize(GRID.WIDTH, GRID.WIDTH);
    this.direction = new Phaser.Geom.Point(GRID.LENGTH, 0);
    this.grow();
  }

  update(scene: Phaser.Scene, time: number) {
    if (time >= this.moveTime) {
      this.updated = true;
      return this.move(scene, time);
    }
    return false;
  }

  turnLeft(): void {
    if (this.updated) {
      this.direction.setTo(-GRID.WIDTH, 0);
      this.updated = false;
    }
  }

  turnRight(): void {
    if (this.updated) {
      this.direction.setTo(GRID.WIDTH, 0);
      this.updated = false;
    }
  }

  turnUp(): void {
    if (this.updated) {
      this.direction.setTo(0, -GRID.WIDTH);
      this.updated = false;
    }
  }

  turnDown(): void {
    if (this.updated) {
      this.direction.setTo(0, GRID.WIDTH);
      this.updated = false;
    }
  }

  move(scene: Phaser.Scene, time: number): boolean {
    // it sets the new position of the anakonda head
    this.headPosition.setTo(
      this.head.x + this.direction.x,
      this.head.y + this.direction.y
    );

    Phaser.Actions.ShiftPosition(
      this.body?.children.entries || [],
      this.headPosition.x || 0,
      this.headPosition.y || 0,
      1,
      this.tailPosition
    );

    if (this.hitBody() || this.hitEdge(scene)) {
      this.isAlive = false;
      return false;
    }

    this.moveTime = time + this.moveDelay;
    return true;
  }

  collideWithFood(food, points): boolean {
    if (this.head?.x == food.x && this.head?.y == food.y) {
      this.grow();
      if (this.moveDelay > 20 && points % 25 === 0) {
        this.moveDelay -= 5;
      }
      return true;
    }
    return false;
  }

  hitBody() {
    const children = this.body?.children.entries || [];
    return Phaser.Actions.GetFirst(
      children,
      { x: this.head.x, y: this.head.y },
      1
    );
  }

  hitEdge(scene: Phaser.Scene): boolean {
    const { width, height } = scene.sys.game.config;
    const { x: headX, y: headY } = this.head;
    return headX > width || headX < 0 || headY > height || headY < 0;
  }

  grow() {
    let part: Phaser.GameObjects.Sprite = this.body?.create(
      this.tailPosition.x,
      this.tailPosition.y
    );
    part.setOrigin(0);
    part.setTintFill(COLOR_PALETTE.dark2);
    part.setDisplaySize(GRID.WIDTH, GRID.HEIGHT);
  }

  updateGrid(grid) {
    const children = this.body?.getChildren() || [];
    for (const segment of children) {
      const x = segment["x"] / GRID.WIDTH;
      const y = segment["y"] / GRID.HEIGHT;
      if (grid[y] !== undefined) {
        if (grid[y][x] !== undefined) {
          grid[y][x] = false;
        }
      }
    }
    return grid;
  }
}
