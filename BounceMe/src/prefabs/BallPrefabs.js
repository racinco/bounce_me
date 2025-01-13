export default class BallPrefabs extends Phaser.Physics.Arcade.Image {


    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 0, y ?? 0, texture || "ball", frame);


        this.scaleX = 0.06;
        this.scaleY = 0.06;
        scene.physics.add.existing(this, false);
        this.body.collideWorldBounds = true;
        this.body.setOffset(-1, -1);
        this.body.setCircle(298);
        this.body.allowGravity = false;


        /* START-USER-CTR-CODE */


        this.body.setVelocity(0, 0);
        this.body.setBounce(1);


        this.arrow = new Phaser.GameObjects.Image(scene, this.x, this.y, 'arrow');
        this.arrow.setOrigin(0.5, 0.5);
        this.arrow.setVisible(false);
        scene.add.existing(this.arrow);
        this.arrowRadius = 50;
        this.arrow.setPosition(this.x + this.arrowRadius, this.y);
       
        this.isActivated = false; // Flag to check if the ball is activated


        // Add click detection for the ball
        this.setInteractive(); // Make the ball interactive
        scene.input.setDraggable(this); // Enable dragging events (optional)


        this.on('pointerdown', () => {
            this.isActivated = true; // Set the ball to active
            this.arrow.setVisible(true); // Show the arrow
        });


        scene.input.on('pointermove', (pointer) => {
            if (this.arrow.visible && this.isActivated) {
                const directionX = pointer.worldX - this.x;
                const directionY = pointer.worldY - this.y;


                const angle = Math.atan2(directionY, directionX);


                this.arrow.setPosition(
                    this.x + Math.cos(angle) * this.arrowRadius,
                    this.y + Math.sin(angle) * this.arrowRadius
                );


                this.arrow.setRotation(angle);
            }
        });


        scene.input.on('pointerup', (pointer) => {
            if (this.isActivated) {
                const clickX = pointer.worldX;
                const clickY = pointer.worldY;


                const directionX = clickX - this.x;
                const directionY = clickY - this.y;


                const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
                const normalizedX = directionX / magnitude;
                const normalizedY = directionY / magnitude;


                const speed = 500;
                this.body.setVelocity(normalizedX * speed, normalizedY * speed);


                this.arrow.setVisible(false);
                this.isActivated = false; // Deactivate after movement
            }
        });


        /* END-USER-CTR-CODE */
    }


    /* START-USER-CODE */


    // Write your code here.


    /* END-USER-CODE */
}
