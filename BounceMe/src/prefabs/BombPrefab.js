// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class BombPrefab extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "Bomb", frame ?? 121);

		this.scaleX = 1.3192932373032797;
		this.scaleY = 1.3192932373032797;
		scene.physics.add.existing(this, false);
		this.body.pushable = false;
		this.body.immovable = true;
		this.body.setOffset(2, 3);
		this.body.setCircle(14);

		/* START-USER-CTR-CODE */
		this.play("bombBomb");
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
