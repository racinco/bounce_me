// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import asteroidPrefab from '../prefabs/asteroidPrefab.js';
import planet1 from '../prefabs/planets/planet1.js';
import planet2 from '../prefabs/planets/planet2.js';
import planet3 from '../prefabs/planets/planet3.js';
import planet4 from '../prefabs/planets/planet4.js';
import planet5 from '../prefabs/planets/planet5.js';
import planet6 from '../prefabs/planets/planet6.js';
import planet7 from '../prefabs/planets/planet7.js';
import planet8 from '../prefabs/planets/planet8.js';
import planet9 from '../prefabs/planets/planet9.js';
import planet10 from '../prefabs/planets/planet10.js';
import planet11 from '../prefabs/planets/planet11.js';
import planet12 from '../prefabs/planets/planet12.js';
import planet13 from '../prefabs/planets/planet13.js';
import planet14 from '../prefabs/planets/planet14.js';
import PortalPrefab from '../prefabs/PortalPrefab.js';
import satellitePrefab from '../prefabs/satellitePrefab.js';
import BombPrefab from '../prefabs/BombPrefab.js';
import missilePrefab from '../prefabs/missilePrefab.js';
import rocketPrefab from '../prefabs/rocketPrefab.js';
import polePrefab from '../prefabs/polePrefab.js';
import astronautPrefab from '../prefabs/astronautPrefab.js';
import pole2Prefab from '../prefabs/pole2Prefab.js';
import BallPrefabs from '../prefabs/BallPrefabs.js';
import starPrefab from '../prefabs/starPrefab.js';
import purpleportalPrefab from '../prefabs/purpleportalPrefab.js';
import bluebombPrefab from '../prefabs/bluebombPrefab.js';
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {
  constructor() {
    super('Level');

    /* START-USER-CTR-CODE */
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    this.restart();
    this.events.emit('scene-awake');
  }

  /* START-USER-CODE */
  // Write your code here
  buildings;
  background;
  bounce_left = 5;
  level = 1;
  obstacle = [];
  astronauts = [];
  bounceAdded = 5;
  portals = [];
  bombs = [];
  balls = [];
  buildings = [];
  stars = [];
  tpPortals = [];

  //PRELOAD IMAGE ASSETS
  preload() {
    this.load.image('satellite', 'assets/satellite.png');
    this.load.image('asteroid', 'assets/asteroid.png');
    this.load.image('rocket', 'assets/rocket.png');
    this.load.image('pole', 'assets/pole.png');
    this.load.image('astronaut', 'assets/astro.png');
    this.load.image('pole2', 'assets/pole2.png');
    this.load.image('gameover', 'assets/GameOver.png');
    this.load.image('retry', 'assets/Retry.png');
    this.load.image('home', 'assets/Home.png');
    this.load.image('space1', 'assets/space1.jpg');
    this.load.image('space2', 'assets/space2.jpg');
    this.load.image('space3', 'assets/space3.jpg');
    this.load.image('space4', 'assets/space4.jpg');
    this.load.image('space5', 'assets/space5.jpg');
    this.load.image('helpbomb', 'assets/bluebombFrame1.png');
    this.load.image('tpportal', 'assets/purplePortalFrame1.png');
  }

  //RESTART
  restart() {
    this.level = 1;
    this.bounce_left = 5;
    this.createLevel();
    this.bounce_text.setText(`Bounce Left: ${this.bounce_left}`);
    this.level_text.setText(`Level ${this.level}`);
  }
  //CREATE LEVEL
  createLevel() {
    const levelData = this.generateLevelData(this.level);
    this.clearLevel();
    this.paintBackground(levelData.background);
    this.createRandomPlanets(levelData.planet);
    this.createRandomSatellite(levelData.satellite);
    this.createRandomAsteroids(levelData.asteroids);
    this.createRandomPole(levelData.pole);
    this.createRandomBombs(levelData.bomb);
    this.createRandomStars(levelData.star);
    this.createRandomPortal(levelData.portal);
    this.createTeleportPortal(levelData.tpPortal);
    this.createRandomAstronaut(levelData.astronaut);
    this.createRandomBall();
    this.bounceAdded = levelData.bounceAdded;

    //STILL NOT FINISH
    const buildingData = this.createRandomBuildingData(5);
    this.buildObstacles(this, buildingData);
    this.explode();
    this.astronautCollision();

    //COLLISION TP PORTAL
    this.tpCollision();
    this.physics.add.collider(
      this.balls,
      this.obstacle,
      this.obstacleBounce,
      undefined,
      this
    );
    this.physics.add.collider(
      this.balls,
      this.portals,
      this.enterPortal,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.balls,
      this.stars,
      this.eatStar,
      undefined,
      this
    );
    this.worldBounce();
  }
  //Paint Background
  paintBackground(image) {
    const background = this.add.image(637, 359, image);
    background.setScale(0.6685257196300888, 0.6685257196300888);
    this.add.existing(image);
    this.paintText();
  }

  //PAINT TEXT
  paintText() {
    //BOUNCE TEXT
    const bounce_text = this.add.text(19, 41, '', {});
    bounce_text.scaleX = 1.961994280753941;
    bounce_text.scaleY = 1.961994280753941;
    bounce_text.text = `Bounce Left: ${this.bounce_left}`;
    bounce_text.setStyle({ fontSize: '11px' });

    //BUILDINGS
    const buildings = this.add.image(54, 317, 'buildings');
    buildings.scaleX = -0.6064074896366499;
    buildings.scaleY = 0.4699562546795557;

    // LEVEL TEXT
    const level_text = this.add.text(19, 10, '', {});
    level_text.scaleX = 1.961994280753941;
    level_text.scaleY = 1.961994280753941;
    level_text.text = `Level ${this.level}`;
    level_text.setStyle({ fontSize: '11px' });

    this.bounce_text = bounce_text;
    this.level_text = level_text;
  }

  //ENTER PORTAL
  enterPortal(ball) {
    ball.destroy();
    this.level += 1;
    this.level_text.setText(`Level ${this.level}`);
    this.bounce_left += this.bounceAdded;
    this.updateBounce();
    this.createLevel();
  }

  //CLEAR LEVEL
  clearLevel() {
  const elements = [
    "obstacle",
    "bombs",
    "portals",
    "astronauts",
    "buildings",
    "stars",
    "tpPortals",
  ];

  elements.forEach((element) => {
    this[element].forEach((item) => item.destroy());
    this[element] = [];
  });

  this.destroyBall();
}


  eatStar(ball, star) {
    star.destroy();
    this.bounce_left += this.bounceAdded;
    this.updateBounce();
  }

  destroyBall() {
    this.balls.forEach((ball) => {
      ball.destroy();
    });
  }

  obstacleBounce() {
    this.bounce_left -= 1;
    this.updateBounce();
  }

  bombBounce() {
    this.bounce_left -= 3;
    this.updateBounce();
  }

  worldBounce() {
    this.balls.forEach((ball) => {
      //Checking ball body
      if (ball.body) {
        ball.body.onWorldBounds = true;
        this.physics.world.on(
          'worldbounds',
          (body) => {
            if (body.gameObject === ball) {
              this.obstacleBounce();
            }
          },
          undefined,
          this
        );
      }
    });
  }

  //UPDATE BOUNCE
  updateBounce() {
    if (this.bounce_left > 0) {
      this.bounce_text.setText(`Bounce Left: ${this.bounce_left}`);
    } else {
      this.gameover();
      this.destroyBall();
      this.bounce_text.setText(`Bounce Left: 0`);
    }
  }

  //GAMEOVER
  gameover() {
    const gameover = this.add.image(642, 365, 'gameover');
    gameover.setScale(0.6851076865976174, 0.6851076865976174);
    this.add.existing(gameover);

    const reachlevel_text = this.add.text(419, 426, '', {});
    reachlevel_text.scaleX = 2;
    reachlevel_text.scaleY = 2;
    reachlevel_text.text = `Reach Level ${this.level} of 50`;
    reachlevel_text.setStyle({ fontSize: '20px' });

    //retry button
    const retry = this.add.image(964, 513, 'retry');
    retry.setScale(0.55, 0.55);
    retry.setInteractive();
    retry.on('pointerup', () => {
      this.restart();
      retry.destroy();
      home.destroy();
      gameover.destroy();
      reachlevel_text.destroy();
    });
    this.add.existing(retry);

    //home button * not fix
    const home = this.add.image(322, 513, 'home');
    home.setScale(0.55, 0.55);
    home.setInteractive();
    home.on('pointerup', () => {
      this.scene.start('Home');
    });
    this.add.existing(home);
  }

  //TP PORTAL COLLISION AND TP SKILL
  tpCollision() {
    this.physics.add.collider(
      this.balls,
      this.tpPortals,
      this.tpSkill,
      undefined,
      this
    );
  }

  tpSkill(ball, tpPortal) {
    tpPortal.play('deleteportalPurplePortal');
    ball.destroy();

    tpPortal.once('animationcomplete', (animation, frame) => {
      if (animation.key === 'deleteportalPurplePortal') {
        tpPortal.destroy();

        const newtpPortal = this.returnTeleportPortal();
        newtpPortal.teleport();

        newtpPortal.once('animationcomplete', (animation, frame) => {
          if (animation.key === 'teleportPurplePortal') {
            const ball = new BallPrefabs(this, newtpPortal.x, newtpPortal.y);
            this.add.existing(ball);
            this.balls.push(ball);

            //RESET WORLD BOUNCE
            this.worldBounce();
            newtpPortal.destroy();
          }
        });
      }
    });
  }

  //BOMB SKILL
  bombSkill(x, y) {
    const radiusOfEffect = 60;

    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xff0000, 1);
    graphics.strokeCircle(x, y, radiusOfEffect);

    this.tweens.add({
      targets: graphics,
      alpha: 0,
      duration: 500, // 0.5 seconds
      onComplete: () => {
        graphics.destroy();
      },
    });

    let nearbyObstacles = [];

    for (let obs of this.obstacle) {
      let bombArea = new Phaser.Geom.Circle(x, y, radiusOfEffect);

      if (this.detectObstacle(bombArea, obs)) {
        nearbyObstacles.push(obs);
        console.log(obs);
      }
    }

    for (let obstacle of nearbyObstacles) {
      obstacle.destroy();
    }
  }



  //CHECKING AUSTRONAUT COLLISION
  astronautCollision() {
    this.physics.add.collider(
      this.balls,
      this.astronauts,
      (ball, astronaut) => {
        let astronautX = astronaut.x;
        let astronautY = astronaut.y;
        ball.destroy();
        astronaut.destroy();
        this.astronautSkill(astronautX, astronautY);
      }
    );
  }

  //ASTRONAUT SKILL
  astronautSkill(x, y) {
    const ball = new BallPrefabs(this, x, y);
    this.physics.add.existing(ball);
    this.add.existing(ball);
    this.balls.push(ball);

    //reset ball world collision
    this.worldBounce();
  }

  //EXPLODE ANIMATION
  explode() {
    this.bombs.forEach((b) => {
      this.physics.add.collider(
        this.balls,
        b,
        () => {
          if (!b.hasCollided) {
            b.explode();
            this.bombBounce();
          }
        },
        undefined,
        this
      );
    });
  }

  //BUILDING OBJECT MAPPING
  buildingMap = {
    satellite: {
      name: 'satellite',
      initx: 0.14800123756869416,
      inity: 0.14800123756869416,
      class: satellitePrefab,
      properties: {
        scaleX: 0.4459495504324814,
        scaleY: 0.36781093632130446,
      },
    },

    asteroid: {
      name: 'asteroid',
      initx: 0.75,
      inity: 0.75,
      class: asteroidPrefab,
      properties: {
        scaleX: 1.1884172047010664,
        scaleY: 1.1884172047010664,
      },
    },

    rocket: {
      name: 'rocket',
      initx: 0.1533459106478453,
      inity: 0.1533459106478453,
      class: rocketPrefab,
      properties: {
        scaleX: 0.3,
        scaleY: 0.3,
      },
    },
    pole: {
      name: 'pole',
      initx: 0.08031128756578516,
      inity: 0.05149615873265034,
      class: polePrefab,
      properties: {
        scaleX: 0.2,
        scaleY: 0.15,
      },
    },

    astronaut: {
      name: 'astronaut',
      initx: 0.15390384890014308,
      inity: 0.15390384890014308,
      class: astronautPrefab,
      properties: {
        scaleX: 0.20544202738500486,
        scaleY: 0.20544202738500486,
      },
    },
    pole2: {
      name: 'pole2',
      initx: 0.05149615873265034,
      inity: 0.08031128756578516,
      class: pole2Prefab,
      properties: {
        scaleX: 0.15,
        scaleY: 0.2,
      },
    },

    bluebomb: {
      name: 'helpbomb',
      initx: 1.1,
      inity: 1.1,
      class: bluebombPrefab,
      properties: {
        scaleX: 1.3192932373032797,
        scaleY: 1.3192932373032797,
      },
    },

    tpportal: {
      name: 'tpportal',
      initx: 1.25,
      inity: 1.25,
      class: purpleportalPrefab,
      properties: {
        scaleX: 1.5,
        scaleY: 1.5,
      },
    },
  };

  //BUILD THE INTERACTABLE OBSTACLES IN SCENE
  buildObstacles(scene, buildingData) {
    let index = 0;

    buildingData.forEach((data) => {
      const mappedData = this.buildingMap[data];
      const x = 55;
      const yOffset = 60;
      const y = 180 + index++ * yOffset;

      const building = scene.add.image(x, y, mappedData.name);
      building.setScale(mappedData.initx, mappedData.inity);
      this.buildings.push(building);
      scene.add.existing(building);

      building.setInteractive();

      // Initialize the "following" state
      building.setData('following', false);

      const onPointerMove = (pointer) => {
        if (building.getData('following')) {
          building.setPosition(pointer.x, pointer.y);

          // Tint logic for obstacles
          if (
            this.detectObstacle(building, this.obstacle) &&
            mappedData.name !== 'helpbomb'
          ) {
            building.setTint(0xff0000);
          } else {
            building.clearTint();
          }
        }
      };

      building.on('pointerdown', (pointer) => {
        if (!building.getData('following')) {
          // Start following the pointer
          building.setData('following', true);
          building.setAlpha(0.5);
          building.scaleX = mappedData.properties.scaleX;
          building.scaleY = mappedData.properties.scaleY;

          scene.input.on('pointermove', onPointerMove);
        } else {
          // Place the building and stop following
          building.setData('following', false);
          building.setAlpha(1);
          building.clearTint();

          scene.input.off('pointermove', onPointerMove);

          if (mappedData.name === 'helpbomb') {
            const summonObject = new mappedData.class(
              scene,
              pointer.x,
              pointer.y
            );
            scene.add.existing(summonObject);
            building.destroy();
            summonObject.once('animationcomplete', () => {
              this.bombSkill(summonObject.x, summonObject.y);
            });
          } else {
            if (this.detectObstacle(building, this.obstacle)) {
              // Reset the building to its original position
              building.setScale(mappedData.initx, mappedData.inity);
              building.setPosition(x, y);
            } else {
              building.destroy();

              if (mappedData.class) {
                const summonObject = new mappedData.class(
                  scene,
                  pointer.x,
                  pointer.y
                );
                scene.add.existing(summonObject);

                if (mappedData.name === 'astronaut') {
                  this.astronauts.push(summonObject);
                } else if (mappedData.name === 'tpportal')
                  this.tpPortals.push(summonObject);
                else {
                  this.obstacle.push(summonObject);
                }

                console.log(this.obstacle);
              }
            }
          }
        }
      });

      // Cleanup `pointermove` and other listeners when the scene stops
      scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
        scene.input.off('pointermove', onPointerMove);
      });
    });
  }

  //OBSTACLE VICINITY DETECTOR CHECKER
  detectObstacle(newObject, existingObstacles) {
    //CHECK IF PASSES IS ARRAY
    if (!Array.isArray(existingObstacles)) {
      existingObstacles = [existingObstacles];
    }

    let newObjectBounds;
    if (newObject.displayWidth && newObject.displayHeight) {
      newObjectBounds = newObject.getBounds();
      newObjectBounds.width -= 4;
      newObjectBounds.height -= 4;
      newObjectBounds.x += 2;
      newObjectBounds.y += 2;
    } else if (newObject.radius) {
      newObjectBounds = new Phaser.Geom.Circle(
        newObject.x,
        newObject.y,
        newObject.radius - 5
      );
    } else {
      return false;
    }

    for (let obstacle of existingObstacles) {
      let obstacleBounds;

      if (obstacle.displayWidth && obstacle.displayHeight) {
        obstacleBounds = obstacle.getBounds();
        obstacleBounds.width -= 4;
        obstacleBounds.height -= 4;
        obstacleBounds.x += 2;
        obstacleBounds.y += 2;

        if (
          Phaser.Geom.Intersects.RectangleToRectangle(
            newObjectBounds,
            obstacleBounds
          )
        ) {
          return true;
        }
      } else if (obstacle.radius) {
        obstacleBounds = new Phaser.Geom.Circle(
          obstacle.x,
          obstacle.y,
          obstacle.radius - 5
        );

        if (
          Phaser.Geom.Intersects.CircleToCircle(newObjectBounds, obstacleBounds)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  //RANDOM ASTEROIDS MAKER
  createRandomAsteroids(count) {
    for (let i = 0; i < count; i++) {
      let placed = false;

      while (!placed) {
        const randomX = Phaser.Math.Between(250, 1050);
        const randomY = Phaser.Math.Between(20, 720);
        const randomAngle = Phaser.Math.Between(0, 360);

        const asteroid = new asteroidPrefab(this, randomX, randomY);

        if (!this.detectObstacle(asteroid, this.obstacle)) {
          this.add.existing(asteroid);
          asteroid.angle = randomAngle;
          this.obstacle.push(asteroid);
          placed = true;
        } else asteroid.destroy();
      }
    }
  }

  //RANDOM PLANET MAKER
  createRandomPlanets(count) {
    //Planet Mapping
    const planetMap = new Map();
    for (let i = 1; i <= 14; i++) {
      planetMap.set(i, eval(`planet${i}`));
    }

    for (let i = 0; i < count; i++) {
      let placed = false;

      while (!placed) {
        const randomX = Phaser.Math.Between(300, 1000);
        const randomY = Phaser.Math.Between(100, 630);
        const randomAngle = Phaser.Math.Between(0, 360);

        const pickPlanet = Phaser.Math.Between(1, 14);
        const Planet = planetMap.get(pickPlanet);
        const planet = new Planet(this, randomX, randomY);

        if (!this.detectObstacle(planet, this.obstacle)) {
          this.add.existing(planet);
          planet.angle = randomAngle;
          this.obstacle.push(planet);
          placed = true;
        } else planet.destroy();
      }
    }
  }

  //RANDOM BOMBS MAKER
  createRandomBombs(count) {
    const bombMap = new Map();
    bombMap.set(1, eval(`BombPrefab`));
    bombMap.set(2, eval('missilePrefab'));

    for (let i = 0; i < count; i++) {
      let placed = false;

      while (!placed) {
        const randomX = Phaser.Math.Between(340, 1100);
        const randomY = Phaser.Math.Between(20, 600);
        const randomAngle = Phaser.Math.Between(0, 360);
        const pickBomb = Phaser.Math.Between(1, 2);
        const Bomb = bombMap.get(pickBomb);
        const bomb = new Bomb(this, randomX, randomY);

        if (
          !this.detectObstacle(bomb, this.obstacle) &&
          !this.detectObstacle(bomb, this.bombs)
        ) {
          this.add.existing(bomb);
          bomb.angle = randomAngle;
          this.bombs.push(bomb);

          placed = true;
        } else bomb.destroy();
      }
    }
  }

  //RANDOM SATELLITE MAKER
  createRandomSatellite(count) {
    for (let i = 0; i < count; i++) {
      let placed = false;

      while (!placed) {
        const randomX = Phaser.Math.Between(300, 1000);
        const randomY = Phaser.Math.Between(100, 470);

        const satellite = new satellitePrefab(this, randomX, randomY);

        if (!this.detectObstacle(satellite, this.obstacle)) {
          this.add.existing(satellite);
          this.obstacle.push(satellite);
          placed = true;
        } else {
          satellite.destroy();
        }
      }
    }
  }

  //RANDOM ASTRONAUT MAKER
  createRandomAstronaut(count) {
    for (let i = 0; i < count; i++) {
      let placed = false;

      while (!placed) {
        const randomX = Phaser.Math.Between(230, 800);
        const randomY = Phaser.Math.Between(80, 470);

        const astronaut = new astronautPrefab(this, randomX, randomY);

        if (!this.detectObstacle(astronaut, this.obstacle)) {
          this.add.existing(astronaut);
          this.astronauts.push(astronaut);
          placed = true;
        } else {
          astronaut.destroy();
        }
      }
    }
  }

  //RANDOM PORTAL MAKER
  createRandomPortal(count) {
    for (let i = 0; i < count; i++) {
      let placed = false;

      while (!placed) {
        const randomX = Phaser.Math.Between(1120, 1230);
        const randomY = Phaser.Math.Between(70, 620);
        const randomAngle = Phaser.Math.Between(0, 360);

        const portal = new PortalPrefab(this, randomX, randomY);

        if (
          !this.detectObstacle(portal, this.obstacle) &&
          !this.detectObstacle(portal, this.portals)
        ) {
          this.add.existing(portal);
          portal.angle = randomAngle;
          this.portals.push(portal);
          placed = true;
        } else portal.destroy();
      }
    }
  }

  //RANDOM STAR MAKER
  createRandomStars(count) {
    for (let i = 0; i < count; i++) {
      let placed = false;

      while (!placed) {
        const randomX = Phaser.Math.Between(400, 1000);
        const randomY = Phaser.Math.Between(70, 620);

        const star = new starPrefab(this, randomX, randomY);

        if (
          !this.detectObstacle(star, this.obstacle) &&
          !this.detectObstacle(star, this.stars) &&
          !this.detectObstacle(star, this.bombs)
        ) {
          this.add.existing(star);
          this.stars.push(star);
          placed = true;
        } else star.destroy();
      }
    }
  }

  //RANDOM BUILDING DATA MAKER
  createRandomBuildingData(count) {
    const building_map = new Map();
    building_map.set(1, 'pole');
    building_map.set(2, 'pole2');
    building_map.set(3, 'asteroid');
    building_map.set(4, 'satellite');
    building_map.set(5, 'rocket');
    building_map.set(6, 'astronaut');
    building_map.set(7, 'bluebomb');
    building_map.set(8, 'tpportal');

    const buildingData = [];

    for (let i = 0; i < count; i++) {
      const pickBuilding = this.pickBuildingWithProbability();
      const building = building_map.get(pickBuilding);
      buildingData.push(building);
    }
    return buildingData;
  }

  //RANDOM BALL MAKER
  createRandomBall() {
    let placed = false;
    let ball;

    while (!placed) {
      const randomX = Phaser.Math.Between(120, 200);
      const randomY = Phaser.Math.Between(70, 500);

      ball = new BallPrefabs(this, randomX, randomY);
      this.physics.add.existing(ball);
      this.add.existing(ball);

      if (!this.detectObstacle(ball, this.obstacle)) {
        this.balls.push(ball);
        placed = true;
      } else {
        ball.destroy();
      }
    }
  }

  //RANDOM POLE MAKER
  createRandomPole(count) {
    const poleMap = new Map();
    poleMap.set(1, eval(`polePrefab`));
    poleMap.set(2, eval('pole2Prefab'));

    for (let i = 0; i < count; i++) {
      let placed = false;

      while (!placed) {
        const randomX = Phaser.Math.Between(350, 1050);
        const randomY = Phaser.Math.Between(70, 650);
        const pickPole = Phaser.Math.Between(1, 2);
        const Pole = poleMap.get(pickPole);
        const pole = new Pole(this, randomX, randomY);

        if (!this.detectObstacle(pole, this.obstacle)) {
          this.add.existing(pole);
          this.obstacle.push(pole);

          placed = true;
        } else pole.destroy();
      }
    }
  }

//RANDOM TELEPORT PORTAL
  createSingleTeleportPortal() {
    let placed = false;
    let tpPortal;

    while (!placed) {
      const randomX = Phaser.Math.Between(400, 1200);
      const randomY = Phaser.Math.Between(70, 620);

      tpPortal = new purpleportalPrefab(this, randomX, randomY);

      if (
        !this.detectObstacle(tpPortal, this.obstacle) &&
        !this.detectObstacle(tpPortal, this.stars) &&
        !this.detectObstacle(tpPortal, this.bombs)
      ) {
        placed = true;
      } else {
        tpPortal.destroy();
      }
    }
    return tpPortal;
  }
  createTeleportPortal(count) {
    for (let i = 0; i < count; i++) {
      const tpPortal = this.createSingleTeleportPortal();
      this.add.existing(tpPortal);
      this.tpPortals.push(tpPortal);
    }
  }

  returnTeleportPortal() {
    const tpPortal = this.createSingleTeleportPortal();
    this.add.existing(tpPortal);
    this.tpPortals.push(tpPortal);
    return tpPortal;
  }


  //BUILDING PROBABILITY MAKER
  pickBuildingWithProbability() {
    const probabilities = [
      { value: 1, probability: 20 },
      { value: 2, probability: 20 },
      { value: 3, probability: 15 },
      { value: 4, probability: 10 },
      { value: 5, probability: 10 },
      { value: 6, probability: 5 },
      { value: 7, probability: 5 },
      { value: 8, probability: 10 },
    ];

    const totalProbability = probabilities.reduce(
      (sum, item) => sum + item.probability,
      0
    );
    const randomValue = Phaser.Math.FloatBetween(0, totalProbability);

    let cumulativeProbability = 0;

    for (const item of probabilities) {
      cumulativeProbability += item.probability;
      if (randomValue <= cumulativeProbability) {
        return item.value;
      }
    }
  }



  //DATA LEVEL GENERATOR
  generateLevelData(level) {
    while (level > 50) {
      level -= 50;
    }
    let levelData = {};

    if (level >= 1 && level <= 5) {
      levelData = {
        asteroids: Phaser.Math.Between(13, 15),
        satellite: 0,
        pole: 0,
        portal: 1,
        planet: 0,
        rocket: 0,
        astronaut: 0,
        bomb: 0,
        star: 0,
        tpPortal: 0,
        background: 'space1',
        bounceAdded: 5,
      };
    } else if (level >= 6 && level <= 10) {
      levelData = {
        asteroids: Phaser.Math.Between(10, 12),
        satellite: 0,
        pole: Phaser.Math.Between(3, 5),
        portal: 1,
        planet: 0,
        rocket: 0,
        astronaut: 0,
        bomb: 0,
        star: 0,
        tpPortal: 0,
        background: 'space1',
        bounceAdded: 5,
      };
    } else if (level >= 11 && level <= 15) {
      levelData = {
        asteroids: Phaser.Math.Between(9, 13),
        satellite: Phaser.Math.Between(0, 2),
        pole: Phaser.Math.Between(3, 5),
        portal: 1,
        planet: 0,
        rocket: 0,
        astronaut: 0,
        bomb: 0,
        star: 0,
        tpPortal: 0,
        background: 'space2',
        bounceAdded: 10,
      };
    } else if (level >= 16 && level <= 20) {
      levelData = {
        asteroids: Phaser.Math.Between(9, 11),
        satellite: Phaser.Math.Between(1, 2),
        pole: Phaser.Math.Between(4, 6),
        portal: 1,
        planet: 0,
        rocket: 0,
        astronaut: 0,
        bomb: 0,
        star: Phaser.Math.Between(1, 2),
        tpPortal: 0,
        background: 'space2',
        bounceAdded: 10,
      };
    } else if (level >= 21 && level <= 25) {
      levelData = {
        asteroids: Phaser.Math.Between(13, 15),
        satellite: Phaser.Math.Between(1, 2),
        pole: Phaser.Math.Between(3, 4),
        portal: 1,
        planet: 1,
        rocket: 0,
        astronaut: 0,
        bomb: 0,
        star: Phaser.Math.Between(2, 3),
        tpPortal: Phaser.Math.Between(0, 1),
        background: 'space3',
        bounceAdded: 10,
      };
    } else if (level >= 26 && level <= 30) {
      levelData = {
        asteroids: Phaser.Math.Between(5, 9),
        satellite: Phaser.Math.Between(1, 2),
        pole: Phaser.Math.Between(3, 4),
        portal: Phaser.Math.Between(1, 2),
        planet: Phaser.Math.Between(1, 2),
        rocket: 0,
        astronaut: 0,
        bomb: 0,
        star: Phaser.Math.Between(2, 3),
        tpPortal: Phaser.Math.Between(0, 1),
        background: 'space3',
        bounceAdded: 10,
      };
    } else if (level >= 31 && level <= 35) {
      levelData = {
        asteroids: Phaser.Math.Between(11, 15),
        satellite: 0,
        pole: 0,
        portal: 1,
        planet: 0,
        rocket: 0,
        astronaut: 0,
        bomb: Phaser.Math.Between(7, 9),
        star: Phaser.Math.Between(2, 4),
        tpPortal: 0,
        background: 'space4',
        bounceAdded: 15,
      };
    } else if (level >= 36 && level <= 40) {
      levelData = {
        asteroids: Phaser.Math.Between(7, 10),
        satellite: Phaser.Math.Between(0, 2),
        pole: Phaser.Math.Between(3, 4),
        portal: 2,
        planet: Phaser.Math.Between(1, 2),
        rocket: Phaser.Math.Between(0, 1),
        astronaut: Phaser.Math.Between(0, 1),
        bomb: Phaser.Math.Between(3, 4),
        star: 2,
        tpPortal: Phaser.Math.Between(0, 1),
        background: 'space4',
        bounceAdded: 15,
      };
    } else if (level >= 41 && level <= 45) {
      levelData = {
        asteroids: Phaser.Math.Between(9, 12),
        satellite: 0,
        pole: Phaser.Math.Between(5, 7),
        portal: 1,
        planet: 2,
        rocket: 0,
        astronaut: 1,
        bomb: Phaser.Math.Between(4, 5),
        star: Phaser.Math.Between(2, 3),
        tpPortal: 1,
        background: 'space5',
        bounceAdded: 15,
      };
    } else if (level >= 46 && level <= 50) {
      levelData = {
        asteroids: Phaser.Math.Between(7, 10),
        satellite: Phaser.Math.Between(1, 2),
        pole: Phaser.Math.Between(5, 6),
        portal: 2,
        planet: Phaser.Math.Between(2, 3),
        rocket: 1,
        astronaut: Phaser.Math.Between(1, 2),
        bomb: Phaser.Math.Between(6, 7),
        star: Phaser.Math.Between(2, 3),
        tpPortal: Phaser.Math.Between(1, 2),
        background: 'space5',
        bounceAdded: 15,
      };
    }
    return levelData;
  }

  create() {
    this.editorCreate();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
