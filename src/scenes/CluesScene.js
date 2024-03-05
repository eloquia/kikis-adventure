import Phaser from 'phaser'

import { CLUES_SCENE, DIALOG_TEXT_WIDTH, GRINNING_KIKI, IS_DEBUG, NEGATIVE, NORMAL_SPEED, OFF_BLACK, OFF_WHITE_HEX, OFF_WHITE_TEXT, OVERLAY_INNER_PADDING, OVERLAY_TEXT_CONTAINER_WIDTH, OVERLAY_WIDTH, OVERLAY_X_START, PARAGRAPH_SPACING, PILE_OF_ROCKS, PLINK, PLUNK, SAD_KIKI, SPELL_SCENE, TEAL_STRING, TEXT_Y, WINDOW_HEIGHT, WINDOW_WIDTH, WINDOW_X_CENTER, WINDOW_Y_CENTER, randomPositiveAffirmation } from '../constants';
import CommonScene from '../common/CommonScene';

const hints = [
  {
    dialogHint: "Alright the first spell fragment sits with your maternal elders and their wisdom.",
    overlayHint: "This first spell fragment sits with your maternal elders and their wisdom.",
    secondaryHint: "They gaze over you at night, making sure you are safe.",
    spellFragment: "Grace",
    imageLink: SAD_KIKI,
    textDisplayDelay: NORMAL_SPEED,
    state: 'INIT', // INIT, TYPEWRITE, OVERLAY, HINT, SOLVED
    incorrectCount: 0,
  },
  {
    dialogHint: "This next spell fragment can be found in metamorphosis, it comes in sets of two and dressed in blue.",
    overlayHint: "This next spell fragment can be found in metamorphosis, it comes in sets of two and dressed in blue.",
    secondaryHint: "This pair has their beauty confined in a clear cage.",
    spellFragment: "Place",
    imageLink: SAD_KIKI,
    textDisplayDelay: NORMAL_SPEED,
    state: 'INIT', // INIT, TYPEWRITE, OVERLAY, HINT, SOLVED
    incorrectCount: 0,
  },
  {
    dialogHint: "This next spell fragment is a famously powerful phrase known to heal or soothe any ailment.",
    overlayHint: "A famously powerful phrase known to heal or soothe any ailment.",
    secondaryHint: "사랑해 to this orange pair.",
    spellFragment: "Plight",
    imageLink: SAD_KIKI,
    textDisplayDelay: NORMAL_SPEED,
    state: 'INIT', // INIT, TYPEWRITE, OVERLAY, HINT, SOLVED
    incorrectCount: 0,
  },
  {
    dialogHint: "This next spell fragment can be found in the office of a famously powerful wizard.",
    overlayHint: "In the office of a famously powerful wizard.",
    secondaryHint: "He wields the Elder Wand and a flaming bird.",
    spellFragment: "Delight",
    imageLink: SAD_KIKI,
    textDisplayDelay: NORMAL_SPEED,
    state: 'INIT', // INIT, TYPEWRITE, OVERLAY, HINT, SOLVED
    incorrectCount: 0,
  },
  {
    dialogHint: "This next spell fragment can be found something that every witch needs: a chart of their life.",
    overlayHint: "Every witch needs a chart of their life because it provides them with such insight.",
    secondaryHint: "It's a spellbook given to you by your friends on your solar return",
    spellFragment: "Day",
    imageLink: SAD_KIKI,
    textDisplayDelay: NORMAL_SPEED,
    state: 'INIT', // INIT, TYPEWRITE, OVERLAY, HINT, SOLVED
    incorrectCount: 0,
  },
  {
    dialogHint: "This next spell fragment is found inside a blue spellbook that allows you to access magic all over the world.",
    overlayHint: "Inside a book that allows you to access magic all over the world.",
    secondaryHint: "Each country has it's own spellbook and insignia. They even come in different colors.",
    spellFragment: "Away",
    imageLink: SAD_KIKI,
    textDisplayDelay: NORMAL_SPEED,
    state: 'INIT', // INIT, TYPEWRITE, OVERLAY, HINT, SOLVED
    incorrectCount: 0,
  },
  "Keep going! You're halfway done!",
  {
    dialogHint: "This next spell fragment is found in something that every witch's lair needs: an overgrown monster of a plant.",
    overlayHint: "An overgrown vertiable monster of a plant hides this next spell fragment.",
    secondaryHint: "Think about the words describing this plant.",
    spellFragment: "Deep",
    imageLink: SAD_KIKI,
    textDisplayDelay: NORMAL_SPEED,
    state: 'INIT', // INIT, TYPEWRITE, OVERLAY, HINT, SOLVED
    incorrectCount: 0,
  },
  {
    dialogHint: "In this day, a witch needs a secret identity, and this next spell fragment is hidden in a game box full of them.",
    overlayHint: "In a box full of secret identities.",
    secondaryHint: "Each of these secret identities has a unique power or ability.",
    spellFragment: "Keep",
    imageLink: SAD_KIKI,
    textDisplayDelay: NORMAL_SPEED,
    state: 'INIT', // INIT, TYPEWRITE, OVERLAY, HINT, SOLVED
    incorrectCount: 0,
  },
  {
    dialogHint: "This next spell fragment lays preserved in a dish made of a creature from a magical watery world.",
    overlayHint: "Lays preserved in a dish made of a creature from a magical watery world.",
    secondaryHint: "This dish is also from the same lands that inspired the powerful wizard from a previous clue.",
    spellFragment: "Fades",
    imageLink: SAD_KIKI,
    textDisplayDelay: NORMAL_SPEED,
    state: 'INIT', // INIT, TYPEWRITE, OVERLAY, HINT, SOLVED
    incorrectCount: 0,
  },
  "Just three more left!",
  {
    dialogHint: "Your familiar's former domain holds this next spell fragment.",
    overlayHint: "Your familiar's former domain.",
    secondaryHint: "Jiji might take too much of a liking to this little princess.",
    spellFragment: "Made",
    imageLink: SAD_KIKI,
    textDisplayDelay: NORMAL_SPEED,
    state: 'INIT', // INIT, TYPEWRITE, OVERLAY, HINT, SOLVED
    incorrectCount: 0,
  },
  {
    dialogHint: "The penultimate spell fragment hides past a rocking chair, a tiny staircase, and behind a tiny door.",
    overlayHint: "Past a rocking chair, a tiny staircase, and behind a tiny door.",
    secondaryHint: "The light doesn't work but the spirit is still here.",
    spellFragment: "Caress",
    imageLink: SAD_KIKI,
    textDisplayDelay: NORMAL_SPEED,
    state: 'INIT', // INIT, TYPEWRITE, OVERLAY, HINT, SOLVED
    incorrectCount: 0,
  },
  {
    dialogHint: "This final spell fragment lies between tomes of past lives lived, where meaning can get lost in translation.",
    overlayHint: "Between tomes of past lives lived, where meaning can get lost in translation.",
    secondaryHint: "Nestled between the queens and the brain.",
    spellFragment: "Tenderness",
    imageLink: SAD_KIKI,
    textDisplayDelay: NORMAL_SPEED,
    state: 'INIT', // INIT, TYPEWRITE, OVERLAY, HINT, SOLVED
    incorrectCount: 0,
  },
  "Hooray, you've found all of the spell fragments!",
  "Let me complete the spell of unsealing"
]

let canAdvanceText = true;

export default class CluesScene extends CommonScene {
	constructor() {
		super(CLUES_SCENE)
	}

  typewriteText(dialogOption) {
    if (typeof dialogOption === 'string' || dialogOption instanceof String) {
      const length = dialogOption.length
      let i = 0
      this.text.setText("")
      this.time.addEvent({
        callback: () => {
          canAdvanceText = false
          this.text.text += dialogOption[i]
          ++i
          if (this.text.text.length === dialogOption.length) {
            canAdvanceText = true
          }
        },
        repeat: length - 1,
        delay: IS_DEBUG ? 1 : NORMAL_SPEED
      })
    } else {
      const length = dialogOption.dialogHint.length
      let i = 0
      this.text.setText("")
      this.time.addEvent({
        callback: () => {
          canAdvanceText = false
          this.text.text += dialogOption.dialogHint[i]
          ++i
          if (this.text.text.length === dialogOption.dialogHint.length) {
            canAdvanceText = true
          }
        },
        repeat: length - 1,
        delay: IS_DEBUG ? 1 : dialogOption.textDisplayDelay
      })
    }
  }


  initSounds() {
    if (IS_DEBUG) console.log('[CLUES SCENE] Preload')

    this.plink = this.sound.add(PLINK);
    this.plunk = this.sound.add(PLUNK);
    this.negative = this.sound.add(NEGATIVE);
  }

  initBackground() {
    const backgroundImage = this.add.image(0, 0, PILE_OF_ROCKS);
    backgroundImage.setOrigin(0, 0);
    backgroundImage.displayWidth = window.innerWidth;
    backgroundImage.displayHeight = window.innerHeight;
  }

  initKiki() {
    this.kikiImage = this.add.image(WINDOW_X_CENTER, WINDOW_Y_CENTER, SAD_KIKI);
    this.kikiImage.setOrigin(0.5, 0.5);
  }

  initImages() {
    this.initBackground()
    this.initKiki()
  }

	create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.initSounds();
    this.initImages();
    this.initDialogBox();
    this.showTextAdvance();

    this.hintIdx = 0;
    this.clueState = 'EMPTY' // 'EMPTY', 'CLUE', 'INPUT', 'SOLVED', 'ERROR'

    this.text = this.add.text(70, TEXT_Y, '', {
      color: OFF_WHITE_TEXT,
      wordWrap: { width: DIALOG_TEXT_WIDTH },
    });

    this.input.on('pointerup', function () {
      if (canAdvanceText) {
        this.plink.play();

        const hint = hints[this.hintIdx];

        if (this.hintIdx === hints.length - 1) {
          this.destroyTextAdvance();
          this.cameras.main.fadeOut(3000, 0, 0, 0);
        }

        if (typeof hint === 'string' || hint instanceof String) {
          this.typewriteText(hint);
          this.hintIdx++;
        } else {
          if (hint.state === 'INIT') {
            hint.state = 'TYPEWRITE';
            this.typewriteText(hint);
          } else if (hint.state === 'TYPEWRITE') {
            hint.state = 'OVERLAY';
            this.createOverlay(hints[this.hintIdx]);
          }
        }

      }
    }, this);

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(SPELL_SCENE);
    })
	}

  createOverlay(hint) {
    canAdvanceText = false;

    this.overlayGraphics = this.add.graphics();

    // overlay rectangle
    this.overlayGraphics.fillStyle(OFF_WHITE_HEX, 0.8);
    this.overlayGraphics.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    // hint container
    this.hintContainer = this.add.graphics();

    // button with answer
    this.button = this.add.text(WINDOW_X_CENTER, WINDOW_Y_CENTER, hint.spellFragment, {
      color: TEAL_STRING,
    });
    this.button.setOrigin(0.5, 0);
    this.button.setInteractive();
    this.button.on('pointerup', () => {
      this.plunk.play();
      this.cleanUpOverlay();
      this.kikiImage.setTexture(GRINNING_KIKI);
      canAdvanceText = true;
      this.hintIdx++;
      this.typewriteText(randomPositiveAffirmation());
    })

    // primary hint text
    this.hintText = this.add.text(0, 0, hint.overlayHint, {
      color: OFF_WHITE_TEXT,
      wordWrap: { width: OVERLAY_TEXT_CONTAINER_WIDTH },
    });
    this.hintText.setOrigin(0.5, 0);
    this.hintText.x = WINDOW_X_CENTER;
    this.hintText.setAlign('justify');

    const hintContentHeight = this.hintText.displayHeight + PARAGRAPH_SPACING * 2 + this.button.displayHeight;
    const hintContainerHeight = hintContentHeight + 2 * OVERLAY_INNER_PADDING;

    const hintContainerY = WINDOW_Y_CENTER - hintContainerHeight / 2;

    this.hintContainer.fillStyle(OFF_BLACK, 0.8);
    this.hintContainer.fillRoundedRect(OVERLAY_X_START, hintContainerY, OVERLAY_WIDTH, hintContainerHeight, 32);

    const hintTextY = WINDOW_Y_CENTER - hintContentHeight / 2;
    this.hintText.y = hintTextY;

    const buttonY = hintTextY + this.hintText.displayHeight + PARAGRAPH_SPACING * 2;
    this.button.y = buttonY;

    /*
    const inputY = this.hintText.y + this.hintText.displayHeight + PARAGRAPH_SPACING;
    this.spellFragmentInput = document.createElement('input');
    this.spellFragmentInput.id = 'spell-fragment-input';
    this.spellFragmentInput.type = 'text';
    this.spellFragmentInput.style.position = 'absolute';
    this.spellFragmentInput.style.top = inputY + 'px'; // Set the desired top position
    this.spellFragmentInput.style.left = '50%'; // Set the desired left position
    this.spellFragmentInput.style.transform = 'translate(-50%, -50%)'; // Center the input
    document.body.appendChild(this.spellFragmentInput);
    this.spellFragmentInput.focus();

    this.calculateHintContainerHeight()

    this.spellFragmentInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        if (this.spellFragmentInput.value.toLowerCase() === hint.spellFragment.toLowerCase()) {
          this.plunk.play();

          this.cleanUpOverlay()

          canAdvanceText = true;
          this.hintIdx++;
          this.typewriteText(randomPositiveAffirmation())
          this.kikiImage.setTexture(THUMBS_UP_KIKI);
        } else {
          if (!this.negativeText) {
            const NEGATIVE_RESULT_Y = inputY + INPUT_HEIGHT + PARAGRAPH_SPACING;
            this.negativeText = this.add.text(0, 0, '', {
              color: SOFT_RED_STRING,
            })
            this.negativeText.setOrigin(0.5, 0.5);
            this.negativeText.x = OVERLAY_X_START + OVERLAY_WIDTH / 2;
            this.negativeText.y = NEGATIVE_RESULT_Y;
          }

          if (hint.incorrectCount > 2 && !this.secondaryHint) {
            this.secondaryHint = this.add.text(0, 0, hint.secondaryHint, {
              color: OFF_WHITE_TEXT,
              wordWrap: { width: OVERLAY_TEXT_CONTAINER_WIDTH },
            });
            this.secondaryHint.setOrigin(0.5);
            this.secondaryHint.x = WINDOW_X_CENTER;
            this.secondaryHint.y = OVERLAY_Y_START + OVERLAY_MARGIN + OVERLAY_INNER_PADDING + this.hintText.displayHeight + PARAGRAPH_SPACING + PARAGRAPH_SPACING;
            this.secondaryHint.setAlign('justify');
          }

          this.cameras.main.shake(150, 0.01);
          this.negative.play();
          this.negativeText.text = randomNegativeOption()

          this.calculateHintContainerHeight()

          hint.incorrectCount++;
        }
      }
    })
    */
  }

  cleanUpOverlay() {
    this.overlayGraphics.destroy();
    this.overlayGraphics = null

    this.hintContainer.destroy();
    this.hintContainer = null

    this.hintText.destroy();
    this.hintText = null

    if (this.button) {
      this.button.destroy();
      this.button = null
    }
    
    // document.body.removeChild(this.spellFragmentInput);
    if (this.negativeText) {
      this.negativeText.destroy();
      this.negativeText = null;
    }
    if (this.secondaryHint) {
      this.secondaryHint.destroy();
      this.secondaryHint = null
    }
  }

}
