import Phaser from "phaser";
import GameOverScene from "./scenes/GameOverScene";

import GameScene from "./scenes/GameScene";
import GroundScene from "./scenes/GroundScene";
import HighScoreScene from "./scenes/HighScoresScene";
import HUDScene from "./scenes/HUDScene";
import LoaderScene from "./scenes/LoaderScene";
import LogoScene from "./scenes/LogoScene";
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

export const GRID_UNIT = 25;

export const GROUND = {
  X: GRID_UNIT * 2,
  Y: GRID_UNIT * 3,
  WIDTH: GRID_UNIT * 28,
  HEIGHT: GRID_UNIT * 17,
};

export const STORAGE_NAME = "anakonda-score";

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
  },
  scene: [
    LogoScene,
    LoaderScene,
    MenuScene,
    HighScoreScene,
    GameScene,
    HUDScene,
    GroundScene,
    GameOverScene,
  ],
  plugins: {},
};
