import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  console.log("old board", board);
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 1; i <= nrows; i++) {
      let row = [];
      for (let j = 1; j <= ncols; j++) {
        if (chanceLightStartsOn()) {
          row.push(true);
        } else {
          row.push(false);
        }
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return (
      board.filter((row) => !row.every((cell) => cell === false)).length === 0
    );
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const coordinates = coord.split("-").map((num) => parseInt(num));
      const [y, x] = coordinates;

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          console.log("cell before", boardCopy[y][x]);
          boardCopy[y][x] = !boardCopy[y][x];
          console.log("cell after", boardCopy[y][x]);
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const copy = [];
      for (let cell of oldBoard) {
        copy.push([...cell]);
      }

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, copy);
      //flip right and left
      flipCell(y, x + 1, copy);
      flipCell(y, x - 1, copy);
      //flip above and below
      flipCell(y + 1, x, copy);
      flipCell(y - 1, x, copy);
      // TODO: return the copy
      return copy;
    });
  }
  return (
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
    <div>
      <h1>Lights Out</h1>
      {hasWon() ? (
        <div>
          <h2>game over</h2>
          <button onClick={()=>setBoard(createBoard())}>New Game</button>
        </div>
      ) : (
        <table className="Board">
          {board.map((row, y) => (
            <tr>
              {row.map((cell, x) => (
                <Cell
                  flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
                  isLit={cell}
                  key={`${y}-${x}`}
                />
              ))}
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}

export default Board;
