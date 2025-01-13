// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
    /* END-USER-IMPORTS */

export default class satellitePrefab extends Phaser.Physics.Arcade.Image {

    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 0, y ?? 3, texture || "satellite_1", frame);

        this.scaleX = 0.4459495504324814;
        this.scaleY = 0.36781093632130446;
        this.angle = 1;
        scene.physics.add.existing(this, false);
        this.body.pushable = false;
        this.body.immovable = true;
        this.body.setOffset(12, 97);
        this.body.setSize(320, 117, false);

        /* START-USER-CTR-CODE */
        if (this.body) {  // Ensure the body is initialized before proceeding
            this.movementSpeed = 150;
            this.movingDown = true;
            this.startMovement();
        }
        /* END-USER-CTR-CODE */
    }

    /* START-USER-CODE */

    startMovement() {
        this.scene.time.addEvent({
            delay: 1500,
            loop: true,
            callback: () => {
                this.toggleMovementDirection();
            }
        });

        // Ensure the body is available before setting the velocity
        if (this.body) {
            this.body.setVelocityY(this.movementSpeed);
        }
    }

    toggleMovementDirection() {
        this.movingDown = !this.movingDown;
        // Ensure the body exists before changing the velocity
        if (this.body) {
            this.body.setVelocityY(this.movingDown ? this.movementSpeed : -this.movementSpeed);
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

/* You can write more code here */
