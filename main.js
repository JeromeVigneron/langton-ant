/* Load grid on 2D canvas */
window.onload = function() {
    canvas = document.getElementById("grid");
    ctx = canvas.getContext("2d");
    const grid = new Grid(canvas.width, canvas.height);
    grid.init();
    setInterval(moveAnt, 1000/1, grid);
}

/* Cardinal values */ 
const north = 0;
const east = 1;
const south = 2;
const west = 3;

/* Set ant moves, (anti)-clockwise rotation */
class Ant {
    x = 0;
    y = 0;

    direction = north;

    moveForward(width, height) {
      switch (this.direction) {
        case north:
          this.x = ((this.x - 1) + width) % width;
          break;
        case east:
          this.y = ((this.y + 1) + height) % height;
          break;
        case south:
          this.x = ((this.x + 1) + width) % width;
          break;
        case west:
          this.y = ((this.y - 1) + height) % height;
          break;
     }
   }

    rotateRight() {
	this.direction = ((this.direction + 1) + (west + 1))
	    % (west + 1);
    }

    rotateLeft() {
	this.direction = ((this.direction - 1) + (west + 1))
	    % (west + 1);
    }

    rotateNone() {
	this.direction = ((this.direction) + (west + 1))
	    % (west + 1);
    }
}

/* Initialize non-stepped state */ 
class Cell {
    stepped = false;

    setStepped(stepped) {
	this.stepped = stepped;
    }

    get isStepped() {
	return this.stepped;
    }
}

/* Generate cells for grid */
class Grid {
    cells = [];
    ant = null;
    width = 0;
    height = 0;
    moves = 0;
    
    constructor(width, height) {
	this.width = width;
	this.height = height;
    }

    init() {
	for (let x = 0; x < this.width; x++) {
	    this.cells[x] = [];
	    for (let y = 0; y < this.height; y++) {
		const cell = new Cell();
		this.cells[x][y] = cell;
	    }
        }
	this.ant = new Ant();
	this.ant.x = this.width / 2;
	this.ant.y = this.height / 2;
    }
    
    /* Fill cells black or white */   
    move () {
	for (let i = 0; i < 100; i++) {
	    let cell = this.cells[this.ant.x][this.ant.y];
	    if (cell.isStepped) {
		cell.stepped = false;
		ctx.fillStyle = "#000000";
		ctx.fillRect(this.ant.x, this.ant.y, 1, 1);
		this.ant.rotateRight();
		this.ant.moveForward(this.width, this.height);
	    } else {
		cell.stepped = true;
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(this.ant.x, this.ant.y, 1, 1);
		this.ant.rotateLeft();
		this.ant.moveForward(this.width, this.height);
	    }

	    if (ctx.fillStyle = "#FF0000") {
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(this.ant.x, this.ant.y, 1, 1);
		this.ant.rotateNone();
		this.ant.moveForward(this.width, this.height);
	    }

	    /* Blue ant */
	    ctx.fillStyle = "blue";
	    ctx.fillRect(this.ant.x, this.ant.y, 1, 1);
	}
    }
}

/* Path taked by ant */
function moveAnt(grid) {
  grid.move();
    ctx.stroke();
}
