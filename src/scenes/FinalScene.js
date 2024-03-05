import Phaser from 'phaser'

import CommonScene from '../common/CommonScene';
import { CREDITS_SCENE, DIALOG_TEXT_WIDTH, GRINNING_KIKI, IS_DEBUG, JOY_KIKI, KIKI_WAVE, NORMAL_SPEED, OFF_BLACK, OFF_WHITE_TEXT, PILE_OF_ROCKS, PLINK, PLUNK, TEXT_Y, THEME, WINDOW_X_CENTER, WINDOW_Y_CENTER, WISTFUL_KIKI } from '../constants';

let canAdvanceText = true;

const dialog = [
  {
    dialogText: "Now that's all done, I still need your help putting together my home.",
    imageLink: JOY_KIKI,
    textDisplayDelay: NORMAL_SPEED,
  },
  {
    dialogText: "The pieces can be found in a chest of your magic slippers; let me know when you've found them.",
    imageLink: WISTFUL_KIKI,
    textDisplayDelay: NORMAL_SPEED,
  },
  'overlay',
  {
    dialogText: "Great! thank you so much again for all of your help!",
    imageLink: GRINNING_KIKI,
    textDisplayDelay: NORMAL_SPEED,
  },
  {
    dialogText: "I'll leave you to it to build my new house",
    imageLink: WISTFUL_KIKI,
    textDisplayDelay: NORMAL_SPEED,
  },
  {
    dialogText: "Until next time!",
    imageLink: KIKI_WAVE,
    textDisplayDelay: NORMAL_SPEED,
  },
]

export default class FinalScene extends CommonScene {
	constructor() {
		super('final-scene')
	}

  preload() {
    if (IS_DEBUG) {
      console.log('[FINAL SCENE] Preload')
    }
	}

  initSounds() {
    const theme = this.sound.add(THEME);
    theme.play({ loop: true });

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

    this.initSounds();
    this.initBackground();

    const kikiImage = this.add.image(window.innerWidth / 2, window.innerHeight / 2, JOY_KIKI);
    kikiImage.setOrigin(0.5, 0.5);

    this.initDialogBox();
    this.showTextAdvance();

    this.dialogIdx = 0;

    this.text = this.add.text(70, TEXT_Y, '...', {
      color: OFF_WHITE_TEXT,
      wordWrap: { width: DIALOG_TEXT_WIDTH },
    });

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(CREDITS_SCENE);
    })

    this.input.on('pointerup', function () {
      if (canAdvanceText) {
        const dialogOption = dialog[this.dialogIdx];
        this.plink.play();

        if (this.dialogIdx === dialog.length - 1) {
          this.cameras.main.fadeOut(3000, 0, 0, 0);
        }

        if (typeof dialogOption === 'string' || dialogOption instanceof String) {
          canAdvanceText = false
            this.showOverlay()
        } else {
          this.typewriteText(dialogOption)
        }

        this.dialogIdx++
      }
    }, this);
  }

  showOverlay() {
    canAdvanceText = false;

    this.overlayGraphics = this.add.graphics();

    // overlay rectangle
    this.overlayGraphics.fillStyle(OFF_BLACK, 0.5);
    this.overlayGraphics.fillRect(0, 0, window.innerWidth, window.innerHeight);
    this.overlayGraphics.setInteractive(); // Enable interaction to prevent interaction with content behind it

    const hintText = this.add.text(window.innerWidth / 2, window.innerHeight / 2, "The parts to my house can be found in a chest of your magic slippers!", {
      color: OFF_WHITE_TEXT,
      wordWrap: { width: DIALOG_TEXT_WIDTH },
    });
    hintText.setOrigin(0.5, 0.5);
    hintText.x = window.innerWidth / 2;
    hintText.y = window.innerHeight / 2 - 32;

    const buttonBackground = this.add.graphics();
    buttonBackground.fillStyle(0x367588, 1);
    buttonBackground.fillRoundedRect(WINDOW_X_CENTER - 100, WINDOW_Y_CENTER + 50 - 16, 200, 32, 16);

    const buttonText = this.add.text(0, 0, "Found them!", {
      color: OFF_WHITE_TEXT,
    });
    buttonText.setOrigin(0.5, 0.5);
    buttonText.x = window.innerWidth / 2;
    buttonText.y = window.innerHeight / 2 + 50;
    buttonText.setInteractive();
    buttonText.on('pointerup', () => {
      this.plunk.play();

      buttonBackground.destroy();
      hintText.destroy();
      this.overlayGraphics.destroy();
      buttonText.destroy();
      canAdvanceText = true
      this.dialogIdx++;
    });
  }

  typewriteText(dialogOption) {
    const length = dialogOption.dialogText.length
    let i = 0
    this.text.setText("")
    this.time.addEvent({
      callback: () => {
        canAdvanceText = false
        this.text.text += dialogOption.dialogText[i]
        ++i
        if (this.text.text.length === dialogOption.dialogText.length) {
          canAdvanceText = true
        }
      },
      repeat: length - 1,
      delay: IS_DEBUG ? 1 : dialogOption.textDisplayDelay
    })
  }
}
