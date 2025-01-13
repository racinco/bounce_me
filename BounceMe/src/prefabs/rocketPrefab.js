
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class rocketPrefab extends Phaser.Physics.Arcade.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "rocket", frame);

		this.scaleX = 0.3;
		this.scaleY = 0.3;
		scene.physics.add.existing(this, false);
		this.body.pushable = false;
		this.body.immovable = true;
		this.body.setOffset(24, 1);
		this.body.setSize(139, 305, false);

		/* START-USER-CTR-CODE */
		 this.body.setVelocityY(-200); 
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
