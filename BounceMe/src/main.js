import Level from "./scenes/Level.js";
import Preload from "./scenes/Preload.js";
import Home from "./scenes/Home.js";
import Howtoplay from "./scenes/Howtoplay.js";
import About from "./scenes/About.js";
window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 1280,
		height: 720,
		type: Phaser.AUTO,
        backgroundColor: "#242424",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
		physics: {
			default: 'arcade',
			arcade : {
				debug:true,
				gravity: {
					x: 0,
					y: 0
				}
			},

			matter: {
				gravity: { x: 0, y: 0 },
				debug: true
       	 	}

		}
	});

	game.scene.add("Preload", Preload);
	//ADD
	game.scene.add('Home',Home);
	game.scene.add("Howtoplay", Howtoplay);
	game.scene.add("About", About);
	game.scene.add("Level", Level);

	game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {

		this.load.pack("pack", "assets/preload-asset-pack.json");

	}

	create() {

		this.scene.start("Preload");
	}
}