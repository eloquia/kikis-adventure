import Phaser from 'phaser'
import { IS_DEBUG } from '../constants';

const dialog = [
  {
    dialogText: "Great! While wearing that headband, you can see all the magic revealing itself.",
    imageLink: "",
    textDisplayDelay: 25
  },
  {
    dialogText: "Not sure about that? Well let's try it out with the first clue!",
    imageLink: "",
    textDisplayDelay: 25
  }
]

let canAdvanceText = true;

export default class RibbonScene extends Phaser.Scene {
	constructor() {
		super('ribbon-scene')
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
    if (IS_DEBUG) {
      console.log('[RIBBON SCENE] Preload')
    }
	}

	create() {
    console.log('[RIBBON SCENE] Create')
    this.cameras.main.fadeIn(1000, 0, 0, 0)

    const padding = 50; // Adjust the padding as needed
    const bottomPadding = 50; // Adjust the bottom padding as needed

    const goldHex = 0xFFD700;

    const graphics = this.add.graphics();
    graphics.lineStyle(4, goldHex, 1); // 4 is the thickness, 0xFFD700 is the color in hexadecimal, 1 is the alpha
    graphics.fillStyle(0x000000, 0.8);
    graphics.fillRect(padding, window.innerHeight - 100 - bottomPadding, window.innerWidth - (padding * 2), 100);
    graphics.strokeRect(padding, window.innerHeight - 100 - bottomPadding, window.innerWidth - (padding * 2), 100);

    let dialogIdx = 0;

    this.characterName = this.add.text(70, window.innerHeight - 130, "Kiki", { color: '#FF0000' });
    this.text = this.add.text(70, window.innerHeight - 110, '', { color: '#fff' });

    this.input.on('pointerup', function () {
      if (canAdvanceText) {
        if (dialogIdx < dialog.length) {
          // text.setText(dialog[dialogIdx].dialogText);
          this.typewriteText(dialog[dialogIdx]);
        }
        
        if (dialogIdx === dialog.length - 1) {
          // All lines have been displayed, handle end of conversation
          triangle.destroy();

          // Stop the tween
          triangleTween.destroy();

        }

        if (dialogIdx === dialog.length) {
          this.createOverlay();
        }

        dialogIdx++
      }
    }, this);

    // Create a triangle shape
    const triangle = this.add.graphics();
    triangle.fillStyle(goldHex, 1);
    triangle.beginPath();
    triangle.lineTo(window.innerWidth - 80, window.innerHeight - 65);
    triangle.lineTo(window.innerWidth - 70, window.innerHeight - 75);
    triangle.lineTo(window.innerWidth - 90, window.innerHeight - 75);
    triangle.closePath();
    triangle.fillPath();

    // Create a tween to make the triangle flash
    const triangleTween = this.tweens.add({
      targets: triangle,
      alpha: 0,
      duration: 500,
      yoyo: true,
      repeat: -1
    });

	}
  createOverlay() {
    canAdvanceText = false;

    const overlayRectangle = this.add.graphics();
    overlayRectangle.fillStyle(0x000000, 0.5);
    overlayRectangle.fillRect(0, 0, window.innerWidth, window.innerHeight);
    overlayRectangle.setInteractive(); // Enable interaction to prevent interaction with content behind it

    const button = this.add.text(0, 0, "Tap here to continue", { color: '#fff' });
    button.setOrigin(0.5, 0.5);
    button.x = window.innerWidth / 2;
    button.y = window.innerHeight / 2;
    button.setInteractive();

    button.on('pointerdown', () => {
      this.scene.start('clue-1');
    })
  }
}
