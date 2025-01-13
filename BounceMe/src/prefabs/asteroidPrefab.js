
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class asteroidPrefab extends Phaser.Physics.Arcade.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 1, texture || "asteroid", frame);

		this.scaleX = 1.1884172047010664;
		this.scaleY = 1.1884172047010664;
		scene.physics.add.existing(this, false);
		this.body.collideWorldBounds = true;
		this.body.pushable = false;
		this.body.immovable = true;
		this.body.setCircle(19);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
