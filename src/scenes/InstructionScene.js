import Phaser from 'phaser'

import CommonScene from '../common/CommonScene'
import { CLUES_SCENE, DIALOG_TEXT_WIDTH, GRINNING_KIKI, INSTRUCTION_SCENE, IS_DEBUG, NORMAL_SPEED, OFF_WHITE_HEX, OFF_WHITE_TEXT, PILE_OF_ROCKS, PLINK, PLUNK, SAD_KIKI, TEAL_STRING, TEXT_Y, THUMBS_UP_KIKI } from '../constants'

const dialog = [
  {
    dialogText: "Now that you've put on the magic headband, you should be able to see the magic spells in your home!",
    imageLink: THUMBS_UP_KIKI,
    textDisplayDelay: NORMAL_SPEED
  },
  {
    dialogText: "The headband reveals the magic spells once it feels that you know the answer.",
    imageLink: GRINNING_KIKI,
    textDisplayDelay: NORMAL_SPEED
  },
  {
    dialogText: "When you find the magic spell, I need you to tell me what it is.",
    imageLink: THUMBS_UP_KIKI,
    textDisplayDelay: NORMAL_SPEED
  },
  {
    dialogText: "When you give me the right magic spell, I'll give you the next clue.",
    imageLink: SAD_KIKI,
    textDisplayDelay: NORMAL_SPEED
  },
  {
    dialogText: "And the next and the next until we've found all the magic spell fragments!",
    imageLink: GRINNING_KIKI,
    textDisplayDelay: NORMAL_SPEED
  },
  {
    dialogText: "When you've found all the magic spells, I can combine them to release my home from the seal!",
    imageLink: THUMBS_UP_KIKI,
    textDisplayDelay: NORMAL_SPEED
  },
  {
    dialogText: "Are you ready?",
    imageLink: GRINNING_KIKI,
    textDisplayDelay: NORMAL_SPEED
  },
]

let canAdvanceText = true;

export default class InstructionScene extends CommonScene {

	constructor() {
		super(INSTRUCTION_SCENE)
	}

  create() {
    if (IS_DEBUG) console.log('[INSTRUCTION SCENE] Preload')
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.initSounds();
    this.initBackground();

    const kikiImage = this.add.image(window.innerWidth / 2, window.innerHeight / 2, GRINNING_KIKI);
    kikiImage.setOrigin(0.5, 0.5);

    this.initDialogBox();
    this.showTextAdvance();

    let dialogIdx = 0;

    this.text = this.add.text(70, TEXT_Y, dialog[dialogIdx].dialogText, {
      color: OFF_WHITE_TEXT,
      wordWrap: { width: DIALOG_TEXT_WIDTH },
    });

    this.input.on('pointerup', function () {
      if (canAdvanceText) {
        this.plink.play();
        dialogIdx++;

        if (dialogIdx < dialog.length) {
          this.typewriteText(dialog[dialogIdx]);
          kikiImage.setTexture(dialog[dialogIdx].imageLink);
        }

        if (dialogIdx === dialog.length) {
          this.createOverlay();
        }

        if (dialogIdx === dialog.length - 1) {
          this.destroyTextAdvance();
        }

      }
    }, this);

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(CLUES_SCENE);
    })
  }

  initSounds() {
    this.plink = this.sound.add(PLINK);
    this.plunk = this.sound.add(PLUNK);
  }

  initBackground() {
    const backgroundImage = this.add.image(0, 0, PILE_OF_ROCKS);
    backgroundImage.setOrigin(0, 0);
    backgroundImage.displayWidth = window.innerWidth;
    backgroundImage.displayHeight = window.innerHeight;
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

  createOverlay() {
    canAdvanceText = false;

    const overlayRectangle = this.add.graphics();
    overlayRectangle.fillStyle(OFF_WHITE_HEX, 0.5);
    overlayRectangle.fillRect(0, 0, window.innerWidth, window.innerHeight);
    overlayRectangle.setInteractive(); // Enable interaction to prevent interaction with content behind it

    const button = this.add.text(0, 0, "Let's Go!", { color: TEAL_STRING });
    button.setOrigin(0.5, 0.5);
    button.x = window.innerWidth / 2;
    button.y = window.innerHeight / 2;
    button.setInteractive();
    button.on('pointerup', () => {
      this.plunk.play();
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });
  }
}
