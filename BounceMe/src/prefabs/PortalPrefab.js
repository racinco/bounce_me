
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PortalPrefab extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0.9824923378846009, y ?? -1.964985966682434, texture || "GreenPortal", frame ?? 0);

		this.scaleX = 2.5;
		this.scaleY = 2.5;
		this.setOrigin(0.5102343020525766, 0.47953139589484695);
		scene.physics.add.existing(this, false);
		this.body.pushable = false;
		this.body.immovable = true;
		this.body.setOffset(2, 0);
		this.body.setSize(28, 32, false);

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.play("portalGreenPortal");
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
