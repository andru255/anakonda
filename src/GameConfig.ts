import Phaser from "phaser";

import GameScene from "./scenes/GameScene";
import GroundScene from "./scenes/GroundScene";
import HUDScene from "./scenes/HUDScene";
import LoaderScene from "./scenes/LoaderScene";
import MenuScene from "./scenes/MenuScene";

// from: https://lospec.com/palette-list/retrocal-8
export const COLOR_PALETTE = {
  dark4: 0x2f142f,
  dark3: 0x774448,
  dark2: 0x2a584f,
  dark1: 0x74a33f,
  light4: 0x6eb8a8,
  light3: 0xc6505a,
  light2: 0xee9c5d,
  light1: 0xfcffc0,
};

export const GRID = {
  WIDTH: 25,
  HEIGHT: 25,
  LENGTH: 25,
};

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
  },
  // scene: [GameScene],
  scene: [LoaderScene, MenuScene, GameScene, HUDScene, GroundScene],
  plugins: {},
};
