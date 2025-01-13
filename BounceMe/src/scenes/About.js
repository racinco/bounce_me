
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class About extends Phaser.Scene {

	constructor() {
		super("About");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// aboutpage
		const aboutpage = this.add.image(639, 360, "aboutpage");
		aboutpage.scaleX = 0.6736782424885557;
		aboutpage.scaleY = 0.6736782424885557;

	
		this.back();
		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */
	back(){
		const back = this.add.image(1123, 601, "back");
		back.scaleX = 0.6736782424885557;
		back.scaleY = 0.6736782424885557;
		back.setInteractive();
		back.on('pointerup', () => {
    	this.scene.start('Home');
		});
	}

	create() {
		
		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
