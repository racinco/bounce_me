
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class planet1 extends Phaser.Physics.Arcade.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "planet_1", frame);

		this.scaleX = 0.25;
		this.scaleY = 0.25;
		scene.physics.add.existing(this, false);
		this.body.pushable = false;
		this.body.immovable = true;
		this.body.setOffset(-5, -5);
		this.body.setCircle(303);

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
