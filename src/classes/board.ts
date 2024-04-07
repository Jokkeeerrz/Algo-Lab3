class Board {
    private tiles: number[][]; // Private member to store the tiles
    private n: number; // Size of the board

    constructor(tiles: number[][]) {
        this.tiles = tiles;
        this.n = tiles.length;
    }

    toString(): string {
        let str = `${this.n}\n`; // First line contains the board size
        for (let row of this.tiles) {
            str += row.join(" ") + "\n";
        }
        return str;
    }

    dimension(): number {
        return this.n;
    }

    hamming(): number {
        let count = 0;
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.tiles[i][j] !== 0 && this.tiles[i][j] !== i * this.n + j + 1) {
                    count++;
                }
            }
        }
        return count;
    }

    manhattan(): number {
        let distance = 0;
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                const value = this.tiles[i][j];
                if (value !== 0) {
                    const goalX = Math.floor((value - 1) / this.n);
                    const goalY = (value - 1) % this.n;
                    distance += Math.abs(i - goalX) + Math.abs(j - goalY);
                }
            }
        }
        return distance;
    }

    isGoal(): boolean {
        return this.hamming() === 0;
    }

    equals(y: Board): boolean {
        return this.toString() === y.toString();
    }

    neighbors(): Board[] {
        const neighbors: Board[] = [];
        const zeroPosition = this.findZeroPosition();
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (let dir of directions) {
            const newX = zeroPosition[0] + dir[0];
            const newY = zeroPosition[1] + dir[1];
            if (newX >= 0 && newX < this.n && newY >= 0 && newY < this.n) {
                const neighborTiles = this.cloneTiles();
                [neighborTiles[zeroPosition[0]][zeroPosition[1]], neighborTiles[newX][newY]] = [neighborTiles[newX][newY], neighborTiles[zeroPosition[0]][zeroPosition[1]]];
                neighbors.push(new Board(neighborTiles));
            }
        }
        return neighbors;
    }

    private findZeroPosition(): number[] {
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.tiles[i][j] === 0) {
                    return [i, j];
                }
            }
        }
        return [-1, -1];
    }

    private cloneTiles(): number[][] {
        return this.tiles.map(row => [...row]);
    }
}

export default Board;
