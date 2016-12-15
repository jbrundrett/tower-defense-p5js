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
		return this.cells[col * rows + row];
	}

	this.getPathDir = function(row,col) {
		var east = this.get(row, col + 1);
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