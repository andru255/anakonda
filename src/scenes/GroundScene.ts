import Phaser from "phaser";
import { AnakondaObject } from "~/objects/Anakonda";
import { BorderObject } from "~/objects/Border";
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

  addBorders(x = 0, y = 0) {
    return new BorderObject(this, x, y);
  }

  addFood(x = 0, y = 0, texture) {
    return new FoodImageObject(this, x, y, texture);
  }

  addPlayer(x = 0, y = 0): AnakondaObject {
    return new AnakondaObject(this, x, y);
  }
}
