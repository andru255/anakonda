import Phaser from "phaser";

import GameScene from "./scenes/GameScene";

// from: https://lospec.com/palette-list/justparchment8
export const COLOR_PALETTE = {
  dark4: 0x292418,
  dark3: 0x524839,
  dark2: 0x73654a,
  dark1: 0x8b7d62,
  light4: 0xa48d6a,
  light3: 0xbda583,
  light2: 0xcdba94,
  light1: 0xe6ceac,
};

export const GRID = {
  WIDTH: 50,
  HEIGHT: 50,
  LENGTH: 50,
};

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: [GameScene],
};
