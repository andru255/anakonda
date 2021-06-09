import Phaser from "phaser";
import { AnakondaObject } from "~/objects/Anakonda";
import FoodSprite from "~/sprites/FoodSprite";
import GridSprite from "~/sprites/GridSprite";

export default class GameScene extends Phaser.Scene {
  private anakonda?: AnakondaObject;
  private food?: FoodSprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private score: number = 0;

  constructor() {
    super("hello-world");
  }

  preload() {
    this.load.bitmapFont(
      "clickFont",
      "fonts/click/click_0.png",
      "fonts/click/click.xml"
    );
  }

  create() {
    const grid = new GridSprite(this, 0, 0, "grid");
    let scoreLabel = this.add.bitmapText(10, 5, "clickFont", "SCORE", 28);

    //anakonda setup
    this.anakonda = new AnakondaObject(this, 50, 50);

    this.food = new FoodSprite(this, 100, 100, "apple");
    this.cursors = this.input.keyboard.createCursorKeys();
    //this.physics.world.addOverlap(
    //  this.anakonda,
    //  this.food,
    //  (anakonda, food) => {
    //    this.score += 1;
    //    scoreLabel.text = `SCORE ${this.score}`;
    //    this.food?.refresh();
    //    let sprite = this.add.sprite(400, 100, "a");
    //    this.anakonda?.add(sprite);
    //  }
    //);
  }

  update(time) {
    this.updateInput();
    this.updateLogic(time);
  }

  updateInput() {
    if (this.cursors?.left.isDown) {
      this.anakonda?.turnLeft();
    }
    if (this.cursors?.right.isDown) {
      this.anakonda?.turnRight();
    }
    if (this.cursors?.down.isDown) {
      this.anakonda?.turnRight();
    }
  }

  updateLogic(time) {
    const { anakonda } = this;
    if (anakonda?.update(time)) {
    }
  }
}
