
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class purpleportalPrefab extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 1, texture || "PurplePortal", frame ?? 0);

		this.scaleX = 1.5;
		this.scaleY = 1.5;
		scene.physics.add.existing(this, false);
		this.body.pushable = false;
		this.body.immovable = true;
		this.body.setOffset(25, 15);
		this.body.setSize(13, 44, false);

		/* START-USER-CTR-CODE */
		this.play("popportalPurplePortal");
		this.on('animationcomplete', (animation, frame) => {
    	if (animation.key === 'popportalPurplePortal') {
       			this.idle();
    		}
		});
		
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	idle(){
		this.play("idleportalPurplePortal");
	}
	remove(){
		this.play("deleteportalPurplePortal");
	}
	teleport(){
		this.play("teleportPurplePortal");

	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
