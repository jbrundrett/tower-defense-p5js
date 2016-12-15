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
var framerate = 60;

function setup() {
	createCanvas(500,500);
	frameRate(framerate);
	cols = floor((width - 2*buffer)/w);
	rows = floor((height - 2*buffer)/w);

	grid = new Grid();

	tower.push(new Tower(80, 300, 200, 30, 8))
	tower.push(new Tower(320, 160, 200, 30, 10));

}

function draw() {
	if (frameCount > limit) {
		noLoop();
	}

	background(0);

	if (frameCount % 30 === 0 && enemyCount > 0) {
		enemy.push(new Enemy(2));
		enemyCount--;
	}
	
	grid.show();

	for (var i = 0; i < tower.length; i++) {
		tower[i].update();
		tower[i].show();
	}

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
	if (key === ' ') noLoop();
}