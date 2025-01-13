
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Home extends Phaser.Scene {

	constructor() {
		super("Home");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// homebg
		const homebg = this.add.image(640, 359, "homebg");
		homebg.scaleX = 0.6736782424885557;
		homebg.scaleY = 0.6736782424885557;


		this.animateHome();
		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */
	images = [];
	imageSpeeds = [];

	//Buttons
	about;
	how;
	start;

	preload() {
			this.load.image('stars','assets/stars.png');
	}

	animateHome(){
		const stars = this.add.image(622, 318, "stars");
		stars.scaleX = 0.6120365399661768;
		stars.scaleY = 0.6120365399661768;

		const stars2 = this.add.image(300, 318, "stars");
		stars.scaleX = 0.6120365399661768;
		stars.scaleY = 0.6120365399661768;

		const stars3 = this.add.image(-98, 318, "stars");
		stars.scaleX = 0.6120365399661768;
		stars.scaleY = 0.6120365399661768;

		this.images.push(stars);
		this.images.push(stars2);
		this.images.push(stars3);

		this.imageSpeeds = [1, 2,1];

	}
	createButtons(){
		// start
		const start = this.add.image(638, 420, "start");
		start.scaleX = 0.6120365399661768;
		start.scaleY = 0.6120365399661768;

		start.setInteractive();
		start.on('pointerup', () => {
			this.removeImages();
    		this.scene.start('Level');
		});

		// how
		const how = this.add.image(888, 420, "how");
		how.scaleX = 0.6120365399661768;
		how.scaleY = 0.6120365399661768;

		how.setInteractive();
		how.on('pointerup', () => {
			this.removeImages();
    		this.scene.start('Howtoplay');
		});

		// about
		const about = this.add.image(416, 420, "about");
		about.scaleX = 0.6120365399661768;
		about.scaleY = 0.6120365399661768;

		about.setInteractive();
		about.on('pointerup', () => {
			this.removeImages();
    		this.scene.start('About');

		});
		
	}
	removeImages(){
		this.imageSpeeds = [];
		this.images = [];
	}

	update() {

		this.images.forEach((image, index) => {
    image.x += this.imageSpeeds[index];
    if (image.x >= this.scale.width + image.width / 2) {
        const minLeftX = Math.min(...this.images.map(img => img?.x || 0));
        image.x = minLeftX - image.width;
    }
	});
	}


	create() {

		this.editorCreate();
		this.createButtons();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
