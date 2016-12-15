function Tower(x,y,range,freq,speed) {
	this.cur = new p5.Vector(x,y);
	this.r = 15;
	this.freq = freq;
	this.speed = speed;

	this.range = range;

	this.projectiles = [];

	this.update = function() {
		for (var i = this.projectiles.length - 1; i >= 0; i--) {
			if (this.projectiles[i].update()) {
				this.projectiles.splice(i,1);
			}
		}

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


function Projectile(x,y,speed,target) {
	this.speed = speed;
	this.target = target;
	this.cur = new p5.Vector(x,y);
	this.endpoint = new p5.Vector(x,y);

	this.update = function() {
		if (!this.target || this.target.dead) {
			var newTarget = null;
			for (var i = 0; i < enemy.length; i++) {
				if (!enemy[i].dead) {
					newTarget = enemy[i];
					break;
				}
			}
			if (newTarget) {
				this.target = newTarget;
			} else {
				return true;				
			}
		}

		var targetVector = new p5.Vector(this.target.x, this.target.y);
		var selfToTarget = targetVector.copy().sub(this.cur).normalize().mult(this.speed);


		this.cur.add(selfToTarget);
		this.endpoint = p5.Vector.add(this.cur, selfToTarget);
		var midPoint = p5.Vector.add(this.cur, selfToTarget.mult(0.5));


		if (midPoint.dist(targetVector) < target.radius + 2) {
			target.hit();
			return true;
		} else {
			return false;
		}

	}

	this.show = function() {
		stroke(255);
		strokeWeight(2);
		line(this.cur.x + buffer, this.cur.y + buffer, this.endpoint.x + buffer, this.endpoint.y + buffer);
	}
}