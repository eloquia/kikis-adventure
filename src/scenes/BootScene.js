import Phaser from 'phaser'
import { ANGRY_KIKI, BOOT_SCENE, COVER, DEBUG_SCENE, DEPARTURE, DETERMINED_KIKI, DEVICE, ENVIRONMENT, GLISSANDO, GRINNING_KIKI, IS_DEBUG, JOY_KIKI, KIKI_WAVE, NEGATIVE, OPENING_SCENE, PILE_OF_ROCKS, PLINK, PLUNK, SAD_KIKI, THEME, THUMBS_UP_KIKI, WISTFUL_KIKI } from '../constants';

import { environment } from '../../config.ios.gcp';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super(BOOT_SCENE)
  }

  preload() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        color: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        color: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '12px monospace',
        color: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // ------------------------------------------
    // Loading assets
    // ------------------------------------------

    let assetsUrl;
    if (DEVICE === 'ios' && ENVIRONMENT === 'gcp') {
      assetsUrl = environment.assetsUrl;
    }
    this.load.setCORS('anonymous');
    this.load.setBaseURL(assetsUrl);
    // TODO fill out with other devices and environments

    this.load.on('progress', function (value) {
      if (IS_DEBUG) console.log(value);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
      // @ts-ignore
      percentText.setText(parseInt(value * 100) + '%');
    });

    this.load.on('fileprogress', function (file) {
      // console.log(file);
      assetText.setText('Loading asset: ' + file.src);
    });
    this.load.on('complete', function (complete) {
      // console.log('complete', Object.keys(complete));
      // console.log('complete.image', complete.image);
      // console.log('thing[totalFailed]', complete.totalFailed);
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
    this.load.on('filecomplete', function (key, type) {
      // console.log('filecomplete]', key, type);
    });
    this.load.once('loaderror', function (file) {
      // console.log('loaderror', file);
      // for (const key of Object.keys(file)) {
      //   console.log('file[' + key + ']', file[key]);
      // }
    });

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
