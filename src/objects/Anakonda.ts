import Phaser from "phaser";
import { GRID } from "~/GameConfig";

export class AnakondaObject {
  private body?: Phaser.GameObjects.Group;
  private head: Phaser.GameObjects.Sprite;
  private direction: Phaser.Geom.Point;
  private headPosition: Phaser.Geom.Point = new Phaser.Geom.Point(0, 0);
  private tailPosition = new Phaser.Math.Vector2(0, 0);

  private alive: Boolean = true;
  private updated: Boolean = true;
  private moveTime: number = 0;
  private moveDelay: number = 300;

  constructor(scene: Phaser.Scene, x, y) {
    this.body = scene.add.group({
      defaultKey: "anakondaBody",
      createCallback: (obj) => {},
    });
    this.head = this.body.create(x, y);
    this.head.setOrigin(0);
    this.direction = new Phaser.Geom.Point(GRID.LENGTH, 0);
  }

  update(time: number) {
    if (time >= this.moveTime) {
      this.updated = true;
      return this.move(time);
    }
    return false;
  }

  turnLeft(): void {
    if (this.updated) {
      this.direction.setTo(this.direction.y, -this.direction.x);
      this.updated = false;
    }
  }

  turnRight(): void {
    if (this.updated) {
      this.direction.setTo(-this.direction.y, this.direction.x);
      this.updated = false;
    }
  }

  turnDown(): void {
    if (this.updated) {
      this.direction.setTo(this.direction.y, 0);
      this.updated = false;
    }
  }

  move(time: number): boolean {
    // it sets the new position of the anakonda head
    this.headPosition.setTo(
      Phaser.Math.Wrap(
        this.head.x + this.direction.x,
        0,
        GRID.WIDTH * GRID.LENGTH
      ),
      Phaser.Math.Wrap(
        this.head.y + this.direction.y,
        0,
        GRID.HEIGHT * GRID.LENGTH
      )
    );

    Phaser.Actions.ShiftPosition(
      this.body?.children.entries || [],
      this.headPosition.x || 0,
      this.headPosition.y || 0,
      1,
      this.tailPosition
    );
    this.moveTime = time + this.moveDelay;
    return true;
  }

  collideWithFood(food, points): boolean {
    if (this.head?.x == food.x && this.head?.y == food.y) {
      if (this.moveDelay > 20 && points % 25 === 0) {
        this.moveDelay -= 5;
      }
      return true;
    }
    return false;
  }
}
