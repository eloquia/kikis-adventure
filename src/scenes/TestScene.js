import Phaser from 'phaser'

import { INPUT_HEIGHT, INTRO_SCENE, IS_DEBUG, OFF_BLACK, OFF_WHITE_HEX, OFF_WHITE_TEXT, OVERLAY_INNER_PADDING, OVERLAY_MARGIN, OVERLAY_TEXT_CONTAINER_WIDTH, OVERLAY_WIDTH, OVERLAY_X_START, OVERLAY_Y_START, PARAGRAPH_SPACING, PILE_OF_ROCKS, WINDOW_HEIGHT, WINDOW_WIDTH, WINDOW_X_CENTER } from '../constants';

export default class TestScene extends Phaser.Scene {
	constructor() {
		super('test-scene')
	}

  create() {
    if (IS_DEBUG) console.log('[TEST SCENE] Preload')
    this.cameras.main.fadeIn(300, 0, 0, 0);

    const backgroundImage = this.add.image(0, 0, PILE_OF_ROCKS);
    backgroundImage.setOrigin(0, 0);
    backgroundImage.displayWidth = window.innerWidth;
    backgroundImage.displayHeight = window.innerHeight;

    const showText = this.add.text(0, 0, "Show overlay!", { color: OFF_WHITE_TEXT });
    showText.setOrigin(0.5, 0.6);
    showText.x = window.innerWidth / 2;
    showText.y = window.innerHeight * 3 / 5;

    this.tweens.add({
      targets: showText,
      alpha: 0,
      duration: 600, // Duration of the tween in milliseconds
      ease: 'Power1',
      yoyo: true, // Repeat the tween in reverse
      repeat: -1 // Repeat indefinitely
    });

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(INTRO_SCENE);
    })

    showText.setInteractive();

    showText.on('pointerup', () => {
      // startAdventureTween.stop();
      this.showOverlay()
    });
  }

  showOverlay() {
    this.overlayGraphics = this.add.graphics();

    // overlay rectangle
    this.overlayGraphics.fillStyle(OFF_WHITE_HEX, 0.8);
    this.overlayGraphics.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    // hint container
    this.hintContainer = this.add.graphics();
    this.hintContainer.fillStyle(OFF_BLACK, 0.8);
    this.hintContainer.fillRoundedRect(OVERLAY_X_START, OVERLAY_Y_START, OVERLAY_WIDTH, 0, 32);

    // primary hint text
    this.hintText = this.add.text(0, 0, 'Primary hint text', {
      color: OFF_WHITE_TEXT,
      wordWrap: { width: OVERLAY_TEXT_CONTAINER_WIDTH },
    });
    this.hintText.setOrigin(0.5);
    this.hintText.x = WINDOW_X_CENTER;
    this.hintText.y = OVERLAY_Y_START + OVERLAY_MARGIN + OVERLAY_INNER_PADDING;
    this.hintText.setAlign('justify');

    // input
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
  }

  // dynamically resize the overlay hint container and its children
  calculateHintContainerHeight() {
    let containerHeight = 0;
    let inputY = this.hintText.y + this.hintText.displayHeight + PARAGRAPH_SPACING;
    // let negativeTextY = inputY + INPUT_HEIGHT + PARAGRAPH_SPACING;
    // if (this.negativeText) {
    //   containerHeight += PARAGRAPH_SPACING + this.negativeText.displayHeight
    // }
    // if (this.secondaryHint) {
    //   containerHeight += PARAGRAPH_SPACING + this.secondaryHint.displayHeight

    //   // also increment inputY
    //   inputY += this.secondaryHint.displayHeight + PARAGRAPH_SPACING * 2

    //   // also increment negativeTextY
    //   negativeTextY += this.secondaryHint.displayHeight + PARAGRAPH_SPACING * 2
    // }

    containerHeight += OVERLAY_INNER_PADDING + this.hintText.displayHeight + PARAGRAPH_SPACING + INPUT_HEIGHT + OVERLAY_INNER_PADDING + OVERLAY_MARGIN;
    this.hintContainer.clear();
    this.hintContainer.fillStyle(OFF_BLACK, 0.8);
    this.hintContainer.fillRoundedRect(OVERLAY_X_START, 300, OVERLAY_WIDTH, containerHeight, 32);

    this.spellFragmentInput.style.top = inputY + 'px';

    // if (this.negativeText) {
    //   this.negativeText.y = negativeTextY
    // }
  }
}
