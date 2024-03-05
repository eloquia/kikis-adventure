import Phaser from 'phaser'

import BootScene from './scenes/BootScene'
import OpeningScene from './scenes/OpeningScene'
import IntroScene from './scenes/IntroScene'
import InstructionScene from './scenes/InstructionScene'
import CluesScene from './scenes/CluesScene'
import SpellScene from './scenes/SpellScene'
import FinalScene from './scenes/FinalScene'
import CreditsScene from './scenes/CreditsScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: window.innerWidth,
	height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.CENTER_BOTH,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
	scene: [
    BootScene,
    OpeningScene,
    IntroScene,
    InstructionScene,
    CluesScene,
    SpellScene,
    FinalScene,
    CreditsScene,
  ],
  audio: {
    disableWebAudio: true,
  },
}

export class Game extends Phaser.Game {
  constructor(config) {
      super(config);
  }
}

window.addEventListener("load", () => {
  const game = new Game(config);
});
