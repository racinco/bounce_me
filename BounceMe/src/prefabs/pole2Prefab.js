
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class pole2Prefab extends Phaser.Physics.Arcade.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "pole2", frame);

		this.scaleX = 0.15;
		this.scaleY = 0.2;
		scene.physics.add.existing(this, false);
		this.body.pushable = false;
		this.body.immovable = true;
		this.body.setOffset(0, 52.5);
		this.body.setSize(856, 93, false);

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
