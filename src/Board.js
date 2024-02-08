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

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());
  // const [isGameWon, setIsGameWon] = useState(false);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // TODO: create array-of-arrays of true/false values

    let initialBoard = Array(nrows)
      .fill()
      .map(() => {
        return Array(ncols)
          .fill()
          .map(() => Math.random() >= chanceLightStartsOn);
      });

    return initialBoard;
  }

  function hasWon() {
    // Check if board is defined before accessing its properties
    if (!board) {
      return false;
    }
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(value => value === false));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      // if (typeof coord !== "string") {
      //   console.error("Error: coord is not a string:", coord);
      //   return; // Exit the function early
      // }
      const [y, x] = coord.split("-").map(Number);
      //

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const copyOldBoard = oldBoard.map(a => [...a]);

      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y, x, copyOldBoard);
      flipCell(y + 1, x, copyOldBoard);
      flipCell(y - 1, x, copyOldBoard);
      flipCell(y, x + 1, copyOldBoard);
      flipCell(y, x - 1, copyOldBoard);

      // TODO: return the copy
      return copyOldBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return (
      <>
        <h1>Congratulations! You won!</h1>
      </>
    );
  }
  // TODO

  // make table board

  return (
    <table>
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                flipCellsAroundMe={flipCellsAround}
                isLit={cell}
                coord={`${rowIndex}-${colIndex}`}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  // TODO
}

export default Board;
