import Phaser from "phaser";
import { AnakondaObject } from "~/objects/Anakonda";
import FoodImageObject from "~/objects/Food";
import Food from "~/objects/Food";
import GridSprite from "~/sprites/GridSprite";

export default class GameScene extends Phaser.Scene {
  private anakonda?: AnakondaObject;
  private food?: FoodImageObject;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private scoreLabel?: Phaser.GameObjects.BitmapText;
  private points: number = 0;

  constructor() {
    super("Game");
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
    this.scoreLabel = this.add.bitmapText(10, 5, "clickFont", "SCORE", 28);
    //anakonda setup
    this.anakonda = new AnakondaObject(this, 50, 50);
    this.food = new Food(this, 100, 100, "apple");
    this.cursors = this.input.keyboard.createCursorKeys();
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
    if (this.cursors?.up.isDown) {
      this.anakonda?.turnUp();
    }
    if (this.cursors?.down.isDown) {
      this.anakonda?.turnDown();
    }
  }

  updateLogic(time) {
    const { anakonda } = this;
    if (anakonda?.update(this, time)) {
      if (anakonda.collideWithFood(this.food, this.points)) {
        this.updatePoints(this.scoreLabel);
        this.food?.reposition(this, anakonda);
      }
    }

    if (!anakonda?.isAlive) {
      //show screen lose!
      this.scene.pause();
    }
  }

  updatePoints(scoreLabel?: Phaser.GameObjects.BitmapText) {
    this.points += 5;
    if (scoreLabel !== undefined) {
      scoreLabel.text = `SCORE ${this.points}`;
    }
  }
}
