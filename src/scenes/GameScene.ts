import Phaser from "phaser";
import { AnakondaObject } from "~/objects/Anakonda";
import FoodImageObject from "~/objects/Food";
import GroundScene from "./GroundScene";

export default class GameScene extends Phaser.Scene {
  private anakonda?: AnakondaObject;
  private food?: FoodImageObject;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private points: number = 0;
  private highScore: number = 0;

  constructor() {
    super("Game");
  }

  create() {
    const hudScene = this.scene.get("HUD");
    const groundScene: GroundScene = this.scene.get("Ground") as GroundScene;

    this.scene.launch(groundScene).launch(hudScene, { gameScene: this });
    //anakonda setup
    const ground = groundScene.addGround(0, 50);
    this.anakonda = groundScene.addPlayer(50, 50);
    this.food = groundScene.addFood(100, 100, "apple");
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
        this.updatePoints();
        this.food?.reposition(this, anakonda);
      }
    }

    if (!anakonda?.isAlive) {
      this.endGame();
    }
  }

  endGame() {
    this.events.emit("lose");
    this.highScore = Math.max(this.points, this.highScore);
    this.time.delayedCall(2500, () => {
      this.scene.stop("HUD").stop("Ground").start("Menu");
    });
  }

  updatePoints() {
    this.points += 5;
    this.events.emit("ate", this.points);
  }
}
