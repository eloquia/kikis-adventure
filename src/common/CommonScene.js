import Phaser from 'phaser'
import { DIALOG_BOX_MARGIN, DIALOG_BOX_INNER_HEIGHT, DIALOG_BOX_INNER_WIDTH, DIALOG_TOP_LEFT_Y, GOLD, NAME_Y, OFF_BLACK } from '../constants';

export default class CommonScene extends Phaser.Scene {
  constructor(sceneKey) {
    super(sceneKey)
    this.triangle = null;
    this.triangleTween = null;
  }
  createDialogBox() {
    const graphics = this.add.graphics();
    graphics.lineStyle(4, GOLD, 1); // 4 is the thickness, 0xFFD700 is the color in hexadecimal, 1 is the alpha
    graphics.fillStyle(OFF_BLACK, 0.8);
    graphics.fillRect(DIALOG_BOX_MARGIN, DIALOG_TOP_LEFT_Y, DIALOG_BOX_INNER_WIDTH, DIALOG_BOX_INNER_HEIGHT);
    graphics.strokeRect(DIALOG_BOX_MARGIN, DIALOG_TOP_LEFT_Y, DIALOG_BOX_INNER_WIDTH, DIALOG_BOX_INNER_HEIGHT);
  }
  initDialogBox() {
    this.createDialogBox();
    this.characterName = this.add.text(70, NAME_Y, "Kiki", { color: '#FF0000' });
  }
  showTextAdvance() {
    // Create a triangle shape
    const triangle = this.add.graphics();
    triangle.fillStyle(GOLD, 1);
    triangle.beginPath();
    triangle.lineTo(window.innerWidth - 80, window.innerHeight - 65);
    triangle.lineTo(window.innerWidth - 70, window.innerHeight - 75);
    triangle.lineTo(window.innerWidth - 90, window.innerHeight - 75);
    triangle.closePath();
    triangle.fillPath();
    this.triangle = triangle

    // Create a tween to make the triangle flash
    const triangleTween = this.tweens.add({
      targets: triangle,
      alpha: 0,
      duration: 500,
      yoyo: true,
      repeat: -1
    });
    this.triangleTween = triangleTween
  }
  destroyTextAdvance() {
    if (this.triangle) {
      this.triangle.destroy();
    }
    if (this.triangleTween) {
      this.triangleTween.destroy();
    }
  }
}
