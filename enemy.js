function Enemy(health) {
	this.x = w + w/2;
	this.y = w/2;
	this.health = health;
	this.radius = 10;

	this.row = 0;
	this.col = 0;

	this.xvel = 0;
	this.yvel = 2;

	this.dead = false;

	this.update = function() {
		

		this.x += this.xvel;
		this.y += this.yvel;

		this.row = Math.floor((this.x - w/2) / w);
		this.col = Math.floor((this.y - w/2) / w);

		var newSpeed = grid.getPathDir(this.row,this.col);

		this.xvel = enemySpeed * newSpeed.xvel;
		this.yvel = enemySpeed * newSpeed.yvel;
	}

	this.hit = function() {
		this.radius -= 10/this.health;
		if (this.radius <= 0) {
			this.dead = true;
		}
	}

	this.show = function() {
		noStroke();
		fill(100,200,0);
		ellipse(this.x + buffer,this.y + buffer,this.radius*2,this.radius*2);
	}

}