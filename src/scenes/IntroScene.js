import Phaser from 'phaser'

import { ANGRY_KIKI, DEPARTURE, DETERMINED_KIKI, DIALOG_TEXT_WIDTH, GRINNING_KIKI, INSTRUCTION_SCENE, INTRO_SCENE, IS_DEBUG, OFF_WHITE_HEX, OFF_WHITE_TEXT, PILE_OF_ROCKS, PLINK, PLUNK, SAD_KIKI, TEAL_STRING, TEXT_Y, THUMBS_UP_KIKI, WISTFUL_KIKI } from '../constants';
import CommonScene from '../common/CommonScene';

const dialog = [
  {
    dialogText: "...",
    imageLink: SAD_KIKI,
    textDisplayDelay: 100
  },
  {
    dialogText: "*sob*",
    imageLink: SAD_KIKI,
    textDisplayDelay: 100
  },
  {
    dialogText: "*sniffles* I-i-is somebody there?",
    imageLink: SAD_KIKI,
    textDisplayDelay: 75
  },
  {
    dialogText: "Oh, it's you, Hannah! I'm so glad you're here!",
    imageLink: GRINNING_KIKI,
    textDisplayDelay: 20
  },
  {
    dialogText: "I could really use your help...",
    imageLink: SAD_KIKI,
    textDisplayDelay: 75
  },
  {
    dialogText: "An evil wizard sealed away my powers and destroyed my home.",
    imageLink: ANGRY_KIKI,
    textDisplayDelay: 25,
    action: 'shake'
  },
  {
    dialogText: "I need your help to break the seal and rebuild my house!",
    imageLink: DETERMINED_KIKI,
    textDisplayDelay: 15
  },
  {
    dialogText: "While I was delivering something, I scattered magic spells in your home.",
    imageLink: WISTFUL_KIKI,
    textDisplayDelay: 20
  },
  {
    dialogText: "However you can't see them without a magic ribbon headband.",
    imageLink: THUMBS_UP_KIKI,
    textDisplayDelay: 20
  },
  {
    dialogText: "Can you put on the magic headband I gave to Dale?",
    imageLink: WISTFUL_KIKI,
    textDisplayDelay: 25
  },
  {
    dialogText: "",
    imageLink: "",
    textDisplayDelay: 100
  }
]

let canAdvanceText = true;

export default class IntroScene extends CommonScene {
	constructor() {
		super(INTRO_SCENE)
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

	preload() {
    if (IS_DEBUG) console.log('[INTRO SCENE] Preload')
	}

  initSounds() {
    this.departure = this.sound.add(DEPARTURE);
    this.departure.play({ loop: true });

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

    const kikiImage = this.add.image(window.innerWidth / 2, window.innerHeight / 2, SAD_KIKI);
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

        if (dialogIdx < dialog.length) {
          this.typewriteText(dialog[dialogIdx]);
          kikiImage.setTexture(dialog[dialogIdx].imageLink);

          if (dialog[dialogIdx].action) {
            if (dialog[dialogIdx].action === 'shake') {
              this.cameras.main.shake(400, 0.01);
            }
          }

          dialogIdx++;
        }

        if (dialogIdx === dialog.length) {
          this.createOverlay();
        }

        if (dialogIdx === dialog.length - 1) {
          this.destroyTextAdvance();
          dialogIdx++
        }

      }
    }, this);

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(INSTRUCTION_SCENE);
    })
	}

  createOverlay() {
    canAdvanceText = false;

    const overlayRectangle = this.add.graphics();
    overlayRectangle.fillStyle(OFF_WHITE_HEX, 0.5);
    overlayRectangle.fillRect(0, 0, window.innerWidth, window.innerHeight);
    overlayRectangle.setInteractive(); // Enable interaction to prevent interaction with content behind it

    const button = this.add.text(0, 0, "Put on the headband", { color: TEAL_STRING });
    button.setOrigin(0.5, 0.5);
    button.x = window.innerWidth / 2;
    button.y = window.innerHeight / 2;
    button.setInteractive();
    button.on('pointerup', () => {
      this.plunk.play();
      this.typewriteText({
        dialogText: "Looking good!",
        imageLink: "thumbs-up-kiki",
        textDisplayDelay: 25
      })
      this.cameras.main.fadeOut(2000, 0, 0, 0);
    });
  }

}
