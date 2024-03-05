import Phaser from 'phaser'

import { COVER, GLISSANDO, INTRO_SCENE, IS_DEBUG, OFF_WHITE_TEXT, OPENING_SCENE, THEME, WINDOW_HEIGHT, WINDOW_WIDTH } from '../constants';

export default class OpeningScene extends Phaser.Scene {
	constructor() {
		super(OPENING_SCENE)
	}

  create() {
    if (IS_DEBUG) console.log('[OPENING SCENE] Preload')
    this.theme = this.sound.add(THEME)
    this.theme.play({ loop: true })
    this.glissando = this.sound.add(GLISSANDO);

    this.cameras.main.fadeIn(1500, 0, 0, 0);

    const backgroundImage = this.add.image(0, 0, COVER);
    backgroundImage.setOrigin(0);
    backgroundImage.displayHeight = WINDOW_HEIGHT;
    backgroundImage.displayWidth = WINDOW_WIDTH;

    const title = this.add.text(0, 0, "Kiki's Magical Adventure", { color: OFF_WHITE_TEXT });
    title.setOrigin(0.5, 0.3);
    title.setFontSize(24);
    title.x = window.innerWidth / 2;
    title.y = window.innerHeight * 3 / 10;

    const startAdventure = this.add.text(0, 0, "Start Adventure!", { color: OFF_WHITE_TEXT });
    startAdventure.setOrigin(0.5, 0.6);
    startAdventure.x = window.innerWidth / 2;
    startAdventure.y = window.innerHeight * 3 / 5;

    const startAdventureTween = this.tweens.add({
      targets: startAdventure,
      alpha: 0,
      duration: 600, // Duration of the tween in milliseconds
      ease: 'Power1',
      yoyo: true, // Repeat the tween in reverse
      repeat: -1 // Repeat indefinitely
    });

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(INTRO_SCENE);
    })

    startAdventure.setInteractive();

    startAdventure.on('pointerup', () => {
      this.tweens.add({
        targets:  this.theme,
        volume:   0,
        duration: 1950,
        onComplete: () => {
          this.theme.destroy();
          this.tweens.getTweensOf(this.theme).forEach(t => t.destroy());
        }
      });
      startAdventureTween.stop();
      this.glissando.play();
      this.cameras.main.fadeOut(2000, 0, 0, 0);
    });
  }
}
