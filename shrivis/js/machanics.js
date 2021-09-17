class machanics extends Game {
    constructor(props) { 
        super(props);
        this.board = Board.getBoard();
    }
    keyInput(input) {
        switch (input) {
            case 37: 
                return this.left();
            case 38: 
                return this.up();
            case 39:
                return this.right();
            case 40:
                return this.down();
            default:
                return;
        }
    }
    left() {
        this.board.map((col, row) => {
            for (let i = 1; i < col.length; i++) {
                if (this.board[row][i]) {
                    while (i > 0 && Tile.is_empty(row, i, 0, -1)) {
                        this.board[row][i - 1] = this.board[row][i];
                        Tile.clear(row, i);
                        i--;
                    }
                    if (Tile.is_equal(row, i, 0, -1)) {
                        this.board[row][i - 1] += this.board[row][i];
                        Tile.clear(row, i);
                    }
                }
            }
        });
    }

    up() {
        this.board.map((row, col) => {
            for (let i = 1; i < row.length; i++) {
                if (this.board[i][col]) {
                    while (i > 0 && Tile.is_empty(i, col, -1, 0)) {
                        this.board[i - 1][col] = this.board[i][col];
                        Tile.clear(i, col);
                        i--;
                    }
                    if (i > 0 && Tile.is_equal(i, col, -1, 0)) {
                        this.board[i - 1][col] += this.board[i][col];
                        Tile.clear(i, col);
                    }
                }
            }
        });
    }
    right() {
        this.board.map((col, row) => {
            for (let i = col.length - 1; i >= 0; i--) {
                if (this.board[row][i]) {
                    while (
                        i < col.length - 1 &&
                        Tile.is_empty(row, i, 0, 1)
                    ) {
                        this.board[row][i + 1] = this.board[row][i];
                        Tile.clear(row, i);
                        i++;
                    }
                    if (Tile.is_equal(row, i, 0, 1)) {
                        this.board[row][i + 1] += this.board[row][i];
                        Tile.clear(row, i);
                    }
                }
            }
        });
    }
    down() {
        for (let x = this.board.length - 1; x >= 0; x--) {
            let col = x;
            for (let i = this.board[0].length - 1; i >= 0; i--) {
                if (this.board[i][col]) {
                    while (
                        i < this.board[0].length - 1 &&
                        Tile.is_empty(i, col, 1, 0)
                    ) {
                        this.board[i + 1][col] = this.board[i][col];
                        Tile.clear(i, col);
                        i++;
                    }
                    if (
                        i < this.board[0].length - 1 &&
                        Tile.is_equal(i, col, 1, 0)
                    ) {
                        this.board[i + 1][col] += this.board[i][col];
                        Tile.clear(i, col);
                    }
                }
            }
        }
    }
}
