export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows*numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    return;
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if (!(rowIndex >= 0 && rowIndex < this.playerBoard.length && columnIndex >=0 && columnIndex < this._playerBoard[0].length)) {
      console.log('Your guess is out of range.  Try again');
      return;
    } else if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped! Guess again.\n');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this.playerBoard[rowIndex][columnIndex] = 'B';
      return;
    } else {
      this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      this._numberOfTiles--;
      return this._numberOfTiles; //This is the only condition for which _numberOfTiles should decrease.
    }
    //_numberOfTiles--; Instructions in step 13 of Day 18 say to put this here, but I disagree.
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex){
    const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    let numberOfRows = this._bombBoard.length;
    let numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach((offset) => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >=0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex]==='B') {
          numberOfBombs++;
        }
      }
    })
    return numberOfBombs;
  }

  hasSafeTiles() {
    return (this._numberOfTiles !== this._numberOfBombs);
  }

  // print() {
  //   console.log(this.playerBoard.map(row => row.join(' | ')).join('\n'));
  //   return;
  // }

  print() {
    let print = this.playerBoard.map(row => row.join(' | ')).join('\n');
    console.log(print);
    return;
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let bombBoard = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      bombBoard.push(row)};
      let numberOfBombsPlaced = 0;

      while (numberOfBombsPlaced < numberOfBombs) {
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        if (bombBoard[randomRowIndex][randomColumnIndex] !== 'B') {
        bombBoard[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;}
      };
      return bombBoard;
  }
}
