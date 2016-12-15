// i is col
// j is row
function Cell(i,j,path) {
	this.i = i;
	this.j = j;
	this.path = path;

	this.show = function() {
		var x = this.i * w + buffer;
		var y = this.j * w + buffer;

		noStroke();

		if (this.path) {
			fill('rgba(0,255,0, 0.25)');	
		} else {
			fill('rgba(0,255,0, 0.75)');	
		}

		// if (this.j == 2)
		// 	fill(0);

		rect(x, y, w, w)
	}

	// this.getDirection = function() {
	// 	var ret = {
	// 		xspeed: 0,
	// 		yspeed: 0
	// 	};


	// }
}