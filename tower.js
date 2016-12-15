function Tower(x,y,range,freq,speed) {
	this.cur = new p5.Vector(x,y);
	this.r = 15;
	this.freq = freq;
	this.speed = speed;

	this.range = range;

	this.projectiles = [];

	this.update = function() {
		if (frameCount % freq == 0 && enemy.length > 0) {
			var idx = 0;
			for (idx = 0; idx < enemy.length; idx++) {
				var enemyVector = new p5.Vector(enemy[idx].x,enemy[idx].y);
				if (this.cur.dist(enemyVector) < this.range) {
					break;
				}
			}
			if (idx < enemy.length) this.fire(idx);
		}
		for (var i = this.projectiles.length - 1; i >= 0; i--) {
			if (this.projectiles[i].update()) {
				this.projectiles.splice(i,1);
			}
		}
	}
	this.show = function() {
		fill(255,255,255);
		ellipse(this.cur.x + buffer, this.cur.y + buffer, this.r * 2, this.r * 2);

		for (var i = 0; i < this.projectiles.length; i++) {
			this.projectiles[i].show();
		}
	}

	this.fire = function(i) {
		this.projectiles.push(new Projectile(this.cur.x,this.cur.y, this.speed, enemy[i]));
	}


}