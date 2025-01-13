
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class bluebombPrefab extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "bluebomb", frame ?? 13);

		this.scaleX = 1.3192932373032797;
		this.scaleY = 1.3192932373032797;
		scene.physics.add.existing(this, false);
		this.body.setOffset(34, 35);
		this.body.setCircle(14);

		/* START-USER-CTR-CODE */
		this.play("bombbluebomb");
		this.on('animationcomplete', (animation) => {
    if (animation.key === "bombbluebomb") {
        this.play("explosionbigexplosion");
    } else if (animation.key === "explosionbigexplosion") {
        this.destroy();
    }
});

/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
