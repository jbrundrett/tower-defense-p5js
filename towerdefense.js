// constants
var cols, rows;
var w = 40;
var buffer = 50;

// will get moved to grid
var grid;
var enemy = [];
var tower = [];

var frameCount = 2000;

var enemyCount = 8;

var enemySpeed = 2;
var limit = 2000;
var framerate = 40;

var setupPhase = true;;

function setup() {
	createCanvas(500,500);
	frameRate(framerate);

	cols = floor((width - 2*buffer)/w);
	rows = floor((height - 2*buffer)/w);

	grid = new Grid();

	// Tower(x,y,range,freq,speed)
	// tower.push(new Tower(80, 300, 200, 30, 8))
	// tower.push(new Tower(320, 160, 200, 30, 10));

}

function draw() {

	if (frameCount > limit) {
		noLoop();
	}

	background(0);
	grid.show();

	// spawn enemies
	if (!setupPhase && frameCount % 30 === 0 && enemyCount > 0) {
		enemy.push(new Enemy(3));
		enemyCount--;
	}
	
	// update towers
	for (var i = 0; i < tower.length; i++) {
		tower[i].update();
		tower[i].show();
	}

	// during setup phase, show phantom tower
	if (setupPhase) {
		var towerPlacement = grid.validTowerPlacement(15);
		if (towerPlacement == 1) {
			// display phantom tower
			fill('rgba(255,255,255, 0.3)');	
			ellipse(mouseX, mouseY, 400, 400);
			fill('rgba(255,255,255, 1.00)');	
			ellipse(mouseX, mouseY, 30, 30);
		} else if (towerPlacement == 0) {
			// display phantom tower
			fill('rgba(255,0,0, 0.3)');	
			ellipse(mouseX, mouseY, 400, 400);
			fill('rgba(255,0,0, 1.00)');	
			ellipse(mouseX, mouseY, 30, 30);
		}
	}
	
	// update enemies
	for (var i = enemy.length - 1; i >= 0; i--) {
		enemy[i].update();
		if (enemy[i].dead) {
			enemy.splice(i,1);
		} else {
			enemy[i].show();
		}
	}

	frameCount++;

}

function keyTyped() {
	if (key === ' ' && setupPhase) 
		setupPhase = false;
	else {
		noLoop();
	}
}

function mouseClicked() {
	if (setupPhase && (grid.validTowerPlacement(15) == 1)) {
		// Tower(x,y,range,freq,speed)
		tower.push(new Tower(mouseX - buffer, mouseY - buffer, 200, 30, 10));
	}
}