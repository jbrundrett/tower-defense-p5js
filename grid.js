function Grid() {
	this.cells = [];

	// SETUP LEVEL
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			// path = (i === j);
			var path = false;
			// shitty game 1
			if (i == 1 && j < 5) path = true;
			if (j == 5 && i >= 1 && i < 8) path = true;
			if (i == 8 && j >= 5) path = true;

			this.cells.push(new Cell(i,j,path));
		}
	}

	this.show = function() {
		for (var i = 0; i < this.cells.length; i++) {
			this.cells[i].show();
		}
	}

	this.get = function(row,col) {
		return this.cells[row * cols + col];
	}

	// RETURN 1 --> indicates valid tower
	// RETURN 0 --> indicates invalid in bounds
	// RETURN -1 --> indicates invalid out of bounds
	this.validTowerPlacement = function(towersize) {
		var mx = mouseX - buffer;
		var my = mouseY - buffer;

		var mouseVector = new p5.Vector(mx,my);

		var i = Math.floor (mx / w);
		var j = Math.floor (my / w);

		var ret = 1;

		// check tower distances
		for (var k = tower.length - 1; k >= 0; k--) {
			if (mouseVector.dist(tower[k].cur) < tower[k].r * 2) {
				ret = 0;
			}
		}
		// for (var k = 0; k < tower.length; i++) {
		// 	if (mouseVector.dist(tower[k].cur) < tower[k].r * 2) {
		// 		ret = 0;
		// 	}
		// }

		// check for corners out of bounds or path
		i = Math.floor ((mx - towersize) / w);
		j = Math.floor ((my - towersize) / w);
		if (i >= 0 && i < cols && j >= 0 && j < rows) {
			if (this.get(i,j).path) ret = 0;
		} else {
			return -1;
		}
		i = Math.floor ((mx + towersize) / w);
		j = Math.floor ((my - towersize) / w);
		if (i >= 0 && i < cols && j >= 0 && j < rows) {
			if (this.get(i,j).path) ret = 0;
		} else {
			return -1;
		}
		i = Math.floor ((mx - towersize) / w);
		j = Math.floor ((my + towersize) / w);
		if (i >= 0 && i < cols && j >= 0 && j < rows) {
			if (this.get(i,j).path) ret = 0;
		} else {
			return -1;
		}
		i = Math.floor ((mx + towersize) / w);
		j = Math.floor ((my + towersize) / w);
		if (i >= 0 && i < cols && j >= 0 && j < rows) {
			if (this.get(i,j).path) ret = 0;
		} else {
			return -1;
		}

		return ret;
	}

	this.getPathDir = function(i,j) {
		var east = this.get(i + 1, j);
		// var south = this.get(row + 1, col);

		var ret = {
			xvel: 0,
			yvel: 0
		};
		if (east) {
			if (east.path) {
				ret.xvel = 1;
			} else {
				ret.yvel = 1;
			}
		}

		return ret;
	}
}