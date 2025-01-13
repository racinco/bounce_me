
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class missilePrefab extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "Bomb", frame ?? 481);

		this.scaleX = 1.5103552901511894;
		this.scaleY = 1.5103552901511894;
		scene.physics.add.existing(this, false);
		this.body.pushable = false;
		this.body.immovable = true;
		this.body.setSize(32, 32, false);

		/* START-USER-CTR-CODE */
		this.play("bomb2Bomb");
		this.hasCollided = false;
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	 explode() {
         if (!this.hasCollided) {
            this.hasCollided = true; 
            this.play("explosionbigexplosion"); // Play the explosion animation
            this.on('animationcomplete', () => {
                this.destroy(); // Destroy the bomb after the animation completes
            });
        }
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
