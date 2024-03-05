import Phaser from 'phaser'

const debug = true;

const dialog = [
  {
    dialogText: "*sob*",
    imageLink: "sad-kiki",
    textDisplayDelay: 100
  },
  {
    dialogText: "*sniffles* I-i-is somebody there?",
    imageLink: "sad-kiki",
    textDisplayDelay: 75
  },
  {
    dialogText: "Oh, it's you, Hannah! I'm so glad you're here!",
    imageLink: "surprised-kiki",
    textDisplayDelay: 20
  },
  {
    dialogText: "I could really use your help...",
    imageLink: "sad-kiki",
    textDisplayDelay: 75
  },
  {
    dialogText: "An evil wizard sealed away my powers and destroyed my home.",
    imageLink: "angry-kiki",
    textDisplayDelay: 25
  },
  {
    dialogText: "I need your help to break the seal and rebuild my house!",
    imageLink: "determined-kiki",
    textDisplayDelay: 15
  },
  {
    dialogText: "While I was delivering something, I scattered magic spells in your home.",
    imageLink: "",
    textDisplayDelay: 20
  },
  {
    dialogText: "However you can't see them without a magic ribbon headband.",
    imageLink: "",
    textDisplayDelay: 20
  },
  {
    dialogText: "Can you put on the magic headband I gave to Dale?",
    imageLink: "",
    textDisplayDelay: 25,
    interrupt: 'ribbonPrompt'
  },
  {
    dialogText: "Great! While wearing that, you can see all the magic scattered around.",
    imageLink: "",
    textDisplayDelay: 25
  },
  {
    dialogText: "I'll give you clues to where you can find each magic spell\nand I need you to send them back to me.",
    imageLink: "",
    textDisplayDelay: 25
  },
  {
    dialogText: "Are you ready to get started?",
    imageLink: "",
    textDisplayDelay: 25
  },
  {
    dialogText: "Alright! Let's go!",
    imageLink: "",
    textDisplayDelay: 15
  }
]

let canAdvanceText = true;
let interrupt = false;

export default class HelloWorldScene extends Phaser.Scene {
	constructor() {
		super('hello-world')
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
      delay: debug ? 1 : dialogOption.textDisplayDelay
    })
  }

	preload() {
    console.log('[HELLO WORLD] Preload')
		// this.load.image('sky', 'assets/skies/space3.png')
	}

	create() {
    console.log('[HELLO WORLD] Create')
		// this.add.image(400, 300, 'sky')

		// const particles = this.add.particles('red')

		// const emitter = particles.createEmitter({
		// 	speed: 100,
		// 	scale: { start: 1, end: 0 },
		// 	blendMode: 'ADD',
		// })

		// const logo = this.physics.add.image(400, 100, 'logo')

		// logo.setVelocity(100, 200)
		// logo.setBounce(1, 1)
		// logo.setCollideWorldBounds(true)

		// emitter.startFollow(logo)

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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
    this.text = this.add.text(70, window.innerHeight - 110, dialog[dialogIdx].dialogText, { color: '#fff' });

    // ---- Text animation mask start ---- ---- ----  ---- ---- ---- ---- ---- ----
    /*
    const text = this.add.text(70, window.innerHeight - 110, dialog[dialogIdx].dialogText, { color: '#fff' });
    
    const {
      lineHeight,
      lineSpacing,
      lineWidths
    } = Phaser.GameObjects.GetTextSize(
      text,
      text.getTextMetrics(),
      dialog[dialogIdx].dialogText.split("\n")
    );
    const totalLineHeight = lineHeight + lineSpacing;
    const maskImage = this.add
      .graphics({
        fillStyle: { color: 0xff0000, alpha: 0.5 }
      })
      .setVisible(false);
    const mask = maskImage.createGeometryMask();

    text.setMask(mask);

    const path = new Phaser.Curves.Path();

    for (let i = 0, len = lineWidths.length; i < len; i++) {
      const lineWidth = lineWidths[i];
      const y = text.y + i * totalLineHeight;

      path.moveTo(text.x, y).lineTo(text.x + lineWidth, y);
    }

    const pathDisplay = this.add
      .graphics({ lineStyle: { color: 0xffff00, alpha: 0.5, width: 2 } })
      .setVisible(false);

    path.draw(pathDisplay);

    this.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 40 * dialog[dialogIdx].dialogText.length,
      onUpdate: (counter) => {
        const { x, y } = path.getPoint(counter.getValue());

        maskImage.clear();

        if (y > 0) {
          maskImage.fillRect(text.x, text.y, text.width, y - text.y);
        }

        maskImage.fillRect(text.x, y, x - text.x, totalLineHeight);
      }
    });
    */

    // ---- Text animation mask end ---- ---- ----  ---- ---- ---- ---- ---- ----

    this.input.on('pointerup', function () {
      if (canAdvanceText) {
        if (interrupt) {
          canAdvanceText = false;
          this.ribbonPrompt()
        }

        if (dialogIdx < dialog.length) {
          dialogIdx++;
          // text.setText(dialog[dialogIdx].dialogText);
          this.typewriteText(dialog[dialogIdx]);

          if (dialog[dialogIdx].interrupt) {
            interrupt = true;
          }
        }
        
        if (dialogIdx === dialog.length - 1) {
          // All lines have been displayed, handle end of conversation
          triangle.destroy();

          // Stop the tween
          triangleTween.destroy();

          dialogIdx++
        }

        if (dialogIdx === dialog.length) {
          this.createOverlay();
        }

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

  ribbonPrompt() {
    interrupt = false;

    const ribbonOverlay = this.add.graphics();
    ribbonOverlay.fillStyle(0x000000, 0.5);
    ribbonOverlay.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ribbonOverlay.setInteractive(); // Enable interaction to prevent interaction with content behind it

    const ribbonButton = this.add.text(0, 0, "Put on the headband", { color: '#fff' });
    ribbonButton.setOrigin(0.5, 0.5);
    ribbonButton.x = window.innerWidth / 2;
    ribbonButton.y = window.innerHeight / 2;
    ribbonButton.setInteractive();

    ribbonButton.on('pointerdown', () => {
      console.log('tapped ribbonButton')
      ribbonButton.destroy();
      ribbonOverlay.destroy();
      canAdvanceText = true;
    })
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
      this.startNextScene();
    })
  }

  startNextScene() {
    this.scene.start('clue-1');
  }
}
