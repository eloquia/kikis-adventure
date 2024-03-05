import Phaser from 'phaser'
import { ANGRY_KIKI, BOOT_SCENE, COVER, DEBUG_SCENE, DEPARTURE, DETERMINED_KIKI, DEVICE, ENVIRONMENT, GLISSANDO, GRINNING_KIKI, IS_DEBUG, JOY_KIKI, KIKI_WAVE, NEGATIVE, OPENING_SCENE, PILE_OF_ROCKS, PLINK, PLUNK, SAD_KIKI, THEME, THUMBS_UP_KIKI, WISTFUL_KIKI } from '../constants';

import { environment as localIosEnvironment } from '../../config.ios.local';

export default class BootScene extends Phaser.Scene {
	constructor() {
		super(BOOT_SCENE)
	}

  preload() {
    let assetsUrl;
    if (DEVICE === 'ios' && ENVIRONMENT === 'local') {
      assetsUrl = localIosEnvironment.assetsUrl;
    }
    this.load.setBaseURL(assetsUrl);
    // TODO fill out with other devices and environments

    // ----- Sounds: Background -----
    this.load.audio(DEPARTURE, 'sounds/departure.mp3');
    this.load.audio(THEME, "sounds/kikis-theme.mp3");

    // ----- Sounds: Effects -----
    this.load.audio(GLISSANDO, "sounds/opening-glissando.mp3");
    this.load.audio(PLINK, 'sounds/plink.mp3');
    this.load.audio(PLUNK, 'sounds/plunk.mp3');
    this.load.audio(NEGATIVE, 'sounds/negative.mp3')

    // ----- Images: Background -----
    this.load.image(COVER, 'images/kiki-cover.jpeg');
    this.load.image(PILE_OF_ROCKS, 'images/pile-of-rocks.jpeg');

    // ----- Images: Kiki -----
    this.load.image(ANGRY_KIKI, 'images/angry-kiki.png');
    this.load.image(DETERMINED_KIKI, 'images/determined-kiki.png');
    this.load.image(GRINNING_KIKI, 'images/grinning-kiki.png');
    this.load.image(JOY_KIKI, 'images/joy-kiki.png');
    this.load.image(SAD_KIKI, 'images/sad-kiki.png');
    this.load.image(THUMBS_UP_KIKI, 'images/thumbs-up-kiki.png');
    this.load.image(WISTFUL_KIKI, 'images/wistful-kiki.png');
    this.load.image(KIKI_WAVE, 'images/kiki-wave.png');
  }

  create() {
    if (IS_DEBUG) console.log('[BOOT SCENE] Preload')

    // this.scene.launch(OPENING_SCENE).remove();
    this.scene.launch(IS_DEBUG ? DEBUG_SCENE : OPENING_SCENE).remove();
  }
}
