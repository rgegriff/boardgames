import { INVALID_MOVE } from "boardgame.io/core";

export const SuperTicTacToe = {
  name: "super-tictactoe",
  minPlayers: 2,
  maxPlayers: 2,

  setup: () => ({
    cells: Array(9).fill(Array(9).fill(null)),
    superCells: Array(9).fill(null),
    currentSuperCell: null,
  }),

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {
    clickCell: (G, ctx, superCellID, id) => {
      // check invalid moves
      if (G.cells[superCellID][id] !== null) {
        return INVALID_MOVE;
      }
      if (G.currentSuperCell !== null && G.currentSuperCell !== superCellID) {
        return INVALID_MOVE;
      }

      // mark cell for player
      G.cells[superCellID][id] = ctx.currentPlayer;

      // check if any states changed
      if (IsVictory(G.cells[superCellID])) {
        G.superCells[superCellID] = ctx.currentPlayer;
      }
      if (IsDraw(G.cells[superCellID])) {
        G.superCells[superCellID] = "draw";
      }

      // decide the next supercell to play in
      G.currentSuperCell = G.superCells[id] === null ? id : null;
    },
  },

  endIf: (G, ctx) => {
    if (IsVictory(G.superCells)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsDraw(G.superCells)) {
      return { draw: true };
    }
  },
};

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isRowComplete = (row) => {
    const symbols = row.map((i) => cells[i]);
    return symbols.every((i) => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some((i) => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return cells.filter((c) => c === null).length === 0;
}
