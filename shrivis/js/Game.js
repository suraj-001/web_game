class Game {
    constructor() {
        this.size = 4;
    }
    start() {
        for (let i = 0; i < 2; i++) {
            const tile = Tile.get();
            Tile.set(tile.x, tile.y);
        }
        this.draw();
    }

    draw() {
        this.board = Board.getBoard();
        let score = 0;

        this.board.map((col, row) => {
            col.map((tile, col) => {
                tile = document.getElementById(row + "-" + col);
                tile.innerText = this.board[row][col];
                tile.value = parseInt(tile.innerText) || null;
                if (!tile.value) {
                    tile.className = "grid";
                } else if (tile.value <= 2048) {
                    tile.className = "grid tile-" + tile.value;
                } else {
                    tile.className = "grid tile-max";
                }
                score += this.board[row][col];
                document.getElementById("score").innerText = score;
            });
        });
    }
}
class Board extends Game {
    constructor(props) {
        super(props);
        this.board = this.grid();
    }

    grid() {
        let x = [];
        for (let i = 0; i < this.size; i++) {
            let row = [];
            for (let j = 0; j < this.size; j++) {
                row.push(null);
            }
            x.push(row);
        }
        return x;
    }

    getBoard() {
        return this.board;
    }
}

class Tile extends Board {
    constructor(props) {
        super(props);
        this.tileValue = 2;
        this.board = Board.getBoard();
    }

    isValid(x, y) {
        return !this.board[x][y];
    }

    random() {
        let tile = {
            x: Math.floor(Math.random() * Game.size),
            y: Math.floor(Math.random() * Game.size),
        };
        return tile;
    }
    get() {
        let tile = this.random();
        if (this.isValid(tile.x, tile.y)) {
            return tile;
        } else {
            return this.get();
        }
    }
    set(x, y) {
        if (!this.board[x][y]) {
            this.board[x][y] = this.tileValue;
        }
    }
    clear(x, y) {
        this.board[x][y] = null;
    }

    is_empty(row, col, tile_row, tile_col) {
        return !this.board[row + tile_row][col + tile_col];
    }
    is_equal(row, col, tile_row, tile_col) {
        return (
            this.board[row][col] ===
            this.board[row + tile_row][col + tile_col]
        );
    }
}
