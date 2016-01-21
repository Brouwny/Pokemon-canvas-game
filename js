// JavaScript Document

// Create the canvas
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	// stel de afmetingen in
	canvas.width = 512;
	canvas.height = 480;
	canvas.tabindex = 0;
canvas.setAttribute('style', "position: absolute;  left: 50%;margin-left:-265px; top: 50%;margin-top:-220px; border:3px solid black");
	// toevoegen aan index.html
	document.body.appendChild(canvas)
// einde create canvas

var monster_list = new Array();
var delta = 0;
var lives = 3;
//var directionMonster = 0;
//var directionDuration = 20;
//var goThisWay = 1;

//afbeeldingen inladen
	// Background image
	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function () {
		bgReady = true;
	};
	bgImage.src = "images/background.png";
	
// Hero image
	var heroReady = false;
	var heroImage = new Image();
	heroImage.onload = function () {
		heroReady = true;
	};
	heroImage.src = "images/ash.png";

// Monster image
	var monsterReady = false;
	var monsterImage = new Image();
	monsterImage.onload = function () {
		monsterReady = true;
	};
	monsterImage.src = "images/meowth.png";
	
	// Treasure image
	var treasureReady = false;
	var treasureImage = new Image();
	treasureImage.onload = function () {
		treasureReady = true;
	};
	treasureImage.src = "images/pokeball-sprite.png";
//einde afbeeldingen inladen

// the test	
function init_everything() // Call this when your game starts, or when a new level starts etc.
{
  add_Monster(1);
}

function add_Monster(Amount) {
	for (i = 0; i < Amount; i++) {
  var MonsterVar = Object();
  MonsterVar.x =  32 + (Math.random() * (canvas.width - 64));
  MonsterVar.y =  32 + (Math.random() * (canvas.height - 64));
  MonsterVar.speed = 256;
  MonsterVar.directionDuration=Math.floor(Math.random() * 5) + 15;
  MonsterVar.goThisWay=Math.floor((Math.random() * 4) + 1);
  MonsterVar.directionMonster=1;
  MonsterVar.j=1;
  
  monster_list.push(MonsterVar);

  }
}
//end test
// Game objects
	var hero = {
		speed: 256, // movement in pixels per second
		lives: 3,
		x: 0,
		y: 0
	};
	var monster = {
		speed: 256, 
		x: 0,
		y: 0
	};
	var treasure = {
		x: 0,
		y: 0,
		width: 32,
		height: 32,
		indexFrame: 7,//amount of frames minus the last
		currentFrame:0,//which frame location should load 
		delayFrame:12,//time between frames
		countFrame:0,//counter for frames past
		tickLoc:0// outcome from currentframe *width
	};
	var monstersCaught = 0; //highscore
	var goThisway = 1; //de richting van ons monster
	var directionTime = 50; //de maximale tijd dat je monster loopt
	var directionMonster = 0; //de tijd bijhouden
// einde game objects

// Handle keyboard controls
	var keysDown = {};
	
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);
	
	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);
// einde keyboard controls

// Reset the game when the player catches a monster
	var reset = function () {
		hero.x = canvas.width / 2;
		hero.y = canvas.height / 2;
	
		// Throw the monster somewhere on the screen randomly
		monster.x = 32 + (Math.random() * (canvas.width - 64));
		monster.y = 32 + (Math.random() * (canvas.height - 64));
		// Throw the treasure somewhere on the screen randomly
		treasure.x = 32 + (Math.random() * (canvas.width - 64));
		treasure.y = 32 + (Math.random() * (canvas.height - 64));
	};
// einde reset

// Update game objects
	var update = function (modifier) {
		if (38 in keysDown) { // Player holding up
		
		//check if hero walks from screen top
                if (hero.y <= 32){
                        //if hero walks from screen top, stay at exact y axle
                        hero.y = hero.y;
                }
                else{
                        //move hero up
                hero.y -= hero.speed * modifier;
                }
                // end of upmovement
		
		}
		if (40 in keysDown) { // Player holding down
		
			//check if hero walks from screen down
			        if (40 in keysDown) { // Player holding down
                //check if hero walks from screen
                if (hero.y >= canvas.height -64){
                        //if hero walks from screen bottom, stay at exact y axle
                        hero.y = hero.y;
                }
                else{
                        //move hero down
                hero.y += hero.speed * modifier;
                }// end of downmovement
        }
			
		}
		if (37 in keysDown) { // Player holding left
		
			//check if hero walks from screen left
                if (hero.x <= 32){
                        //if hero walks from screen top, stay at exact y axle
                        hero.x = hero.x;
                }
                else{
                        //move hero left
                hero.x -= hero.speed * modifier;
                }
                // end of upmovement
		
		}
		if (39 in keysDown) { // Player holding right
	
                //check if hero walks from screen right
                if (hero.x >= canvas.width -64){
                        //if hero walks from screen bottom, stay at exact y axle
                        hero.x = hero.x;
                }
                else{
                        //move hero right
                hero.x += hero.speed * modifier;
                }// end of downmovement
		}
		
	//reset hele game
                if (hero.lives <=0){
               
                        //spacebar pressed     
                        if (32 in keysDown){
                        //reset assets
                        hero.lives = 3;
                        monstersCaught = 0;
						monster.speed = 256;
                        }              
                }
                // einde hele game reset
	
		// Are they touching? (Monster)
		for (i = 0; i < monster_list.length; i++) { 
		if (
			hero.x <= (monster_list[i].x + 32)
			&& monster_list[i].x <= (hero.x + 32)
			&& hero.y <= (monster_list[i].y + 32)
			&& monster_list[i].y <= (hero.y + 32)
		) {
			//++monstersCaught;
			//monster.speed = monster.speed +5;
			hero.lives = hero.lives -1;
			reset();
		}
		}
		// Are they touching? (Treasure)
		if (
			hero.x <= (treasure.x + 32)
			&& treasure.x <= (hero.x + 32)
			&& hero.y <= (treasure.y + 32)
			&& treasure.y <= (hero.y + 32)
		) {
			++monstersCaught;
			//monster.speed = monster.speed +5;
			add_Monster(1);
			//hero.lives = hero.lives -1;
			reset();
		}
	};
// einde update

//monster movement
var monsterMove = function (modifier){
	
for (i = 0; i < monster_list.length; i++) { 	
	
	++monster_list[i].directionMonster;
	
	if (monster_list[i].directionMonster <= monster_list[i].directionDuration){
		//bewegingen
		//rechts => links
	if (monster_list[i].goThisWay == 1)	{
		monster_list[i].x = monster_list[i].x - (monster_list[i].speed * modifier);
	if (monster_list[i].x < 32){
		monster_list[i].goThisWay = 2;
	}
	}
	//links => rechts
	if (monster_list[i].goThisWay == 2)	{
		monster_list[i].x = monster_list[i].x + (monster_list[i].speed * modifier);
	if (monster_list[i].x > canvas.width-64){
		monster_list[i].goThisWay=1;
	}
	}
	//boven => onderen
	if (monster_list[i].goThisWay == 3)	{
		monster_list[i].y = monster_list[i].y + (monster_list[i].speed * modifier);
	if (monster_list[i].y > canvas.height-64){
		monster_list[i].goThisWay=4;

	}
	}
	//onderen => boven
	if (monster_list[i].goThisWay == 4)	{
		monster_list[i].y = monster_list[i].y - (monster_list[i].speed * modifier);
	if (monster_list[i].y < 32){
		monster_list[i].goThisWay=3;

	}
	}		
	//bepalen welke richting
	if (monster_list[i].directionMonster ==monster_list[i].directionDuration){
		monster_list[i].directionMonster = 0;
		monster_list[i].goThisWay = Math.floor((Math.random() * 4) + 1);
		//console.log (goThisWay);
	}	
	}
	}
	};

//end monster movement

// Draw everything
	var render = function () {
		if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}
	
		if (heroReady) {
			ctx.drawImage(heroImage, hero.x, hero.y);
		}
	
		if(monsterReady){
		console.log(monster_list.length);
		for (i = 0; i < monster_list.length; i++) { 

					
					ctx.drawImage(monsterImage, monster_list[i].x, monster_list[i].y);
					
					}
		}
	
if (treasureReady) {
			++treasure.countFrame;
			
			if (treasure.delayFrame==treasure.countFrame){
				

				treasure.countFrame=0;
				++treasure.currentFrame;
				treasure.clipLoc = treasure.currentFrame * treasure.width;
				//console.log(treasure.clipLoc);
				
				if (treasure.currentFrame==treasure.indexFrame){
					
					treasure.currentFrame=1;
						
				}
	}
ctx.drawImage(
			treasureImage, // the image
			treasure.clipLoc, //the location on the x axle of the sprite image and not the game!
			0,  //the location on the y axle of the sprite image and not the game!
			treasure.width, //viewable part of the sprite
			treasure.height, //viewable part of the sprite
			treasure.x, //location on the screen
			treasure.y, //location on the screen
			treasure.width, //rendered size on the screen
			treasure.height);//rendered size on the screen
		}
	
		// Score
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Pokeball caught: " + monstersCaught, 32, 32);
		ctx.fillText("Lives: " + hero.lives, 32, canvas.height-64);
		
		if (hero.lives<=0){
                ctx.fillStyle="#000000";//color
                ctx.fillRect(32,32,canvas.width-64,canvas.height-64);//draw rectangle with the bushes still in place   
                //show that you're dead
                ctx.fillStyle = "rgb(250, 250, 250)";
                ctx.textAlign = "center";
                ctx.fillText("You're DEAD! press spacebar to restart", canvas.width/2, canvas.height/2);
                       
                }
	};
// einde draw render

// The main game loop
	var main = function () {
		var now = Date.now();
		var delta = now - then;
	
		update(delta / 1000);
		monsterMove(delta / 1000);
		render();
	
		then = now;
	
		// Request to do this again ASAP
		requestAnimationFrame(main);
	};
// einde main loop

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
	var then = Date.now();
	reset();
	init_everything();
	main();
