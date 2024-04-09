class Board {
  private readonly tiles: number[][];
  private readonly n: number;

  constructor(tiles: number[][]) {
    this.tiles = tiles;
    this.n = tiles.length;
  }

  toString(): string {
    let str = `${this.n}\n`;
    for (let row = 0; row < this.n; row++) {
      for (let col = 0; col < this.n; col++) {
        str += `${this.tiles[row][col]} `;
      }
      str += "\n";
    }
    return str;
  }

  dimension(): number {
    return this.n;
  }

  hamming(): number {
    let count = 0;
    for (let row = 0; row < this.n; row++) {
      for (let col = 0; col < this.n; col++) {
        if (
          this.tiles[row][col] !== 0 &&
          this.tiles[row][col] !== row * this.n + col + 1
        ) {
          count++;
        }
      }
    }
    return count;
  }

  manhattan(): number {
    let distance = 0;
    for (let row = 0; row < this.n; row++) {
      for (let col = 0; col < this.n; col++) {
        const value = this.tiles[row][col];
        if (value !== 0) {
          const targetRow = Math.floor((value - 1) / this.n);
          const targetCol = (value - 1) % this.n;
          distance += Math.abs(row - targetRow) + Math.abs(col - targetCol);
        }
      }
    }
    return distance;
  }

  isGoal(): boolean {
    return this.hamming() === 0;
  }

  equals(y: Board): boolean {
    if (this.dimension() !== y.dimension()) return false;
    for (let row = 0; row < this.n; row++) {
      for (let col = 0; col < this.n; col++) {
        if (this.tiles[row][col] !== y.tiles[row][col]) {
          return false;
        }
      }
    }
    return true;
  }

  neighbors(): Board[] {
    const blankPosition = this.findBlankPosition();
    const neighbors = [];

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]; // Up, Down, Left, Right

    for (const [dx, dy] of directions) {
      const newRow = blankPosition[0] + dx;
      const newCol = blankPosition[1] + dy;
      if (this.isValidPosition(newRow, newCol)) {
        const neighborTiles = this.cloneTiles();
        neighborTiles[blankPosition[0]][blankPosition[1]] =
          neighborTiles[newRow][newCol];
        neighborTiles[newRow][newCol] = 0;
        neighbors.push(new Board(neighborTiles));
      }
    }

    return neighbors;
  }

  twin(): Board {
    let twinTiles = this.cloneTiles();
    for (let row = 0; row < this.n; row++) {
      for (let col = 0; col < this.n - 1; col++) {
        if (twinTiles[row][col] !== 0 && twinTiles[row][col + 1] !== 0) {
          //LOOP BAYLO TWIN BOARD
          const temp = twinTiles[row][col];
          twinTiles[row][col] = twinTiles[row][col + 1];
          twinTiles[row][col + 1] = temp;
          return new Board(twinTiles);
        }
      }
    }
    return new Board(twinTiles);
  }

  private findBlankPosition(): [number, number] {
    for (let row = 0; row < this.n; row++) {
      for (let col = 0; col < this.n; col++) {
        if (this.tiles[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return [-1, -1]; //KUNG BLANK
  }

  private isValidPosition(row: number, col: number): boolean {
    return row >= 0 && col >= 0 && row < this.n && col < this.n;
  }

  private cloneTiles(): number[][] {
    return this.tiles.map((row) => [...row]);
  }
}

export default Board;
