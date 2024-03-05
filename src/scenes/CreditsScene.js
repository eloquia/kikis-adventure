import CommonScene from "../common/CommonScene";
import { CREDITS_SCENE, OFF_BLACK_STRING, OFF_WHITE_HEX, WINDOW_HEIGHT, WINDOW_WIDTH, WINDOW_X_CENTER, WINDOW_Y_CENTER, loadFont } from "../constants";

export default class CreditsScene extends CommonScene {
  constructor() {
		super(CREDITS_SCENE)
	}

  preload() {
    loadFont("magicSaturday", "src/assets/fonts/MagicSaturday.ttf");
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.overlayGraphics = this.add.graphics();

    this.overlayGraphics.fillStyle(OFF_WHITE_HEX, 0.8);
    this.overlayGraphics.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    this.theEnd = this.add.text(0, 0, "The End", {
      color: OFF_BLACK_STRING,
    });
    this.theEnd.setOrigin(0.5, 0.5);
    this.theEnd.x = WINDOW_X_CENTER;
    this.theEnd.y = WINDOW_Y_CENTER;
    this.theEnd.setInteractive();
    this.theEnd.on('pointerup', () => {
      this.cameras.main.fadeOut(2000, 0, 0, 0);
      this.game.destroy(true);
    })
  }

}
