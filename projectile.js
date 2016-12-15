function Projectile(x,y,speed,target) {
	this.speed = speed;
	this.target = target;
	this.prev = null;
	this.cur = new p5.Vector(x,y);
	// this.endpoint = new p5.Vector(x,y);

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


		this.prev = this.cur.copy();
		this.cur.add(selfToTarget);

		// this.endpoint = p5.Vector.add(this.cur, selfToTarget);
		var midPoint = p5.Vector.add(this.prev, selfToTarget.mult(0.5));



		if (midPoint.dist(targetVector) < target.radius + 4) {
			target.hit();
			return true;
		} else {
			return false;
		}

	}

	this.show = function() {
		stroke(255);
		strokeWeight(2);
		line(this.prev.x + buffer, this.prev.y + buffer, this.cur.x + buffer, this.cur.y + buffer);
	}
}