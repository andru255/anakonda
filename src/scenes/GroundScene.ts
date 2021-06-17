import Phaser from "phaser";
import { GRID } from "~/GameConfig";
import { AnakondaObject } from "~/objects/Anakonda";
import FoodImageObject from "~/objects/Food";
import GridSprite from "~/sprites/GridSprite";

export default class GroundScene extends Phaser.Scene {
  constructor() {
    super({
      key: "Ground",
    });
  }

  addGround(x = 0, y = 0) {
    return new GridSprite(this, x, y, "grid");
  }

  addFood(x = 0, y = 0, texture) {
    return new FoodImageObject(this, x, y, texture);
  }

  addPlayer(x = 0, y = 0) {
    return new AnakondaObject(this, x, y);
  }
}
