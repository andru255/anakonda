import Phaser from "phaser";
import customFont from "./customFont";

import { config } from "./GameConfig";

customFont();

export default new Phaser.Game(config);
