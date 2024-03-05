import Phaser from 'phaser'

import CommonScene from '../common/CommonScene';
import { DEPARTURE, FINAL_SCENE, FINAL_VERSE_HEIGHT, HEIGHT_BY_INDEX, IS_DEBUG, OFF_WHITE_TEXT, PILE_OF_ROCKS, PLINK, PLUNK, SPELL_FRAGMENT_Y, SPELL_FRAGMENT_Y_INITIAL, SPELL_SCENE } from '../constants';

let canAdvance = false;

const spellFragments = [
  "grace",
  "place",
  "plight",
  "delight",
  "day",
  "away",
  "deep",
  "keep",
  "fades",
  "made",
  "caress",
  "tenderness",
]

const verses = [
  "Quiet grace",
  "Beside you, my place",
  "Psoriasis plight",
  "Picking brings delight",
  "Weighty day",
  "Here, it fades away",
  "Caring deep",
  "Love's sweet keep",
  "The world fades",
  "and moments are made",
  "Scalp caress",
  "Sweet tenderness",
]

export default class SpellScene extends CommonScene {
	constructor() {
		super(SPELL_SCENE)
	}

  preload() {
    if (IS_DEBUG) console.log('[SPELL SCENE] Preload')
	}

  initSounds() {
    const departure = this.sound.add(DEPARTURE);
    departure.play({ loop: true });

    this.plink = this.sound.add(PLINK);
    this.plunk = this.sound.add(PLUNK);
  }

  initBackground() {
    const backgroundImage = this.add.image(0, 0, PILE_OF_ROCKS);
    backgroundImage.setOrigin(0, 0);
    backgroundImage.displayWidth = window.innerWidth;
    backgroundImage.displayHeight = window.innerHeight;
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    spellFragments.forEach((fragment, index) => {
      const text = this.add.text(0, 0, fragment, { color: OFF_WHITE_TEXT });
      text.alpha = 0;
      text.setOrigin(0, 0.5);
      text.x = SPELL_FRAGMENT_Y_INITIAL;
      text.y = HEIGHT_BY_INDEX(index);

      this.tweens.add({
        targets: text,
        alpha: {
          getStart: () => 0,
          getEnd: () => 1
        },
        duration: 2000,
        delay: index * 1000
      })
      // 12,000 ms total

      this.tweens.add({
        targets: text,
        x: SPELL_FRAGMENT_Y - text.displayWidth, // Set the desired final x position
        duration: 2000,
        ease: 'Sine',
        delay: (1000 * spellFragments.length) + index * 500
      });
      // 18,000 ms total
      // first animation starts 12,000; ends 12,000 + 2000 = 14,000
      // second animation starts 12,000 + 500 = 12,500; end 12,500 + 2,000 = 14,500
      // third animation starts 12,000 + 1000 = 13,000; ends 13,000 + 2,000 = 15,000
      // last animation starts 12,000 + 6000 = 18,000; ends 18,000 + 2,000 = 20,000

      const verse = this.add.text(0, 0, verses[index], { color: OFF_WHITE_TEXT });
      verse.alpha = 0;
      verse.setOrigin(1, 0.5);
      verse.x = SPELL_FRAGMENT_Y;
      verse.y = HEIGHT_BY_INDEX(index);

      // verse fade in should happen as soon as the text finishes moving to the right
      this.tweens.add({
        targets: verse,
        alpha: {
          getStart: () => 0,
          getEnd: () => 1
        },
        duration: 1000,
        delay: (1000 * spellFragments.length) + (index * 500) + 2000
      })
      // first animation starts at 12,000 + 500 + 1000 = 13,500; ends 13,500 + 1000 = 14,500
      // second animation starts at 12,000 + 1000 + 1000 = 14,000; ends 14,000 + 1000 = 15,000
      // third animation starts at 12,000 + 1500 + 1000 = 14,500; ends 14,500 + 1000 = 15,500
      // all animation ends at 12,000 + 6,000 + 2,000 + 1,000 = 21,000

      // text fade out
      this.tweens.add({
        targets: text,
        alpha: {
          getStart: () => 1,
          getEnd: () => 0
        },
        duration: 100,
        delay: (1000 * spellFragments.length) + (index * 500) + 3000
      });

      // move verse to left after verse fades in
      this.tweens.add({
        targets: verse,
        x: SPELL_FRAGMENT_Y_INITIAL + verse.displayWidth,
        y: FINAL_VERSE_HEIGHT(index),

        duration: 1000,
        delay: 21000
      })

    })

    setTimeout(function() {
      // fade out the scene
      canAdvance = true
    }, 27000);

    this.input.on('pointerup', function () {
      if (canAdvance) {
        this.sound.getAllPlaying().forEach(sound => {
          this.tweens.add({
            targets:  sound,
            volume:   0,
            duration: 1950,
            onComplete: () => {
              sound.destroy();
              this.tweens.getTweensOf(sound).forEach(t => t.destroy());
            }
          });
        })
        this.cameras.main.fadeOut(2000, 0, 0, 0);
      }
    }, this);

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(FINAL_SCENE);
    })
  }
}
