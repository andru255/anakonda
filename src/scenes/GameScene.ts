import Phaser from "phaser";
import { COLOR_PALETTE, GRID_UNIT, GROUND } from "~/GameConfig";
import { AnakondaObject } from "~/objects/Anakonda";
import FoodImageObject from "~/objects/Food";
import GroundScene from "./GroundScene";

export default class GameScene extends Phaser.Scene {
  private anakonda?: AnakondaObject;
  private food?: FoodImageObject;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private points: number = 0;
  private highScore: number = 0;

  private eatSound?: Phaser.Sound.BaseSound;
  private dieSound?: Phaser.Sound.BaseSound;
  private isEnabledDieSound: boolean = true;

  constructor() {
    super("Game");
  }

  create() {
    this.cameras.main.setBackgroundColor(COLOR_PALETTE.dark1);

    this.eatSound = this.sound.add("eat");
    this.dieSound = this.sound.add("die");

    const hudScene = this.scene.get("HUD");
    const gameOverScene = this.scene.get("GameOver");
    const groundScene: GroundScene = this.scene.get("Ground") as GroundScene;

    this.scene
      .launch(groundScene)
      .launch(hudScene, { gameScene: this })
      .launch(gameOverScene, { gameScene: this });
    //anakonda setup
    //const ground = groundScene.addGround(0, 0);
    groundScene.addBorders(0, 0);
    this.anakonda = groundScene.addPlayer(
      GROUND.X + GRID_UNIT * 3,
      GROUND.Y + GRID_UNIT * 3
    );
    this.food = groundScene.addFood(GRID_UNIT, GRID_UNIT, "apple");
    this.food.reposition(this, this.anakonda);
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
      this.isEnabledDieSound = true;
      if (anakonda.collideWithFood(this.food, this.points)) {
        this.updatePoints();
        this.food?.reposition(this, anakonda);
        this.eatSound?.play();
      }
    }

    if (!anakonda?.isAlive) {
      this.endGame();
    }
  }

  endGame() {
    if (this.isEnabledDieSound) {
      this.dieSound?.play();
      this.isEnabledDieSound = false;
    }
    this.scene.pause("Ground");
    this.events.emit("lose");
    this.highScore = Math.max(this.points, this.highScore);
    this.time.delayedCall(2300, () => {
      this.scene.stop("HUD").stop("GameOver").stop("Ground").start("Menu");
    });
  }

  updatePoints() {
    this.points += 5;
    this.events.emit("ate", this.points);
  }
}
