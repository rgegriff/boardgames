import React from "react";

const styles = {
  superCellStyle: {
    width: "31%",
    paddingBottom: "31%",
    marginBottom: "1%",
    position: "relative",
  },
  cellStyle: {
    border: "1px solid #555",
    width: "50px",
    height: "50px",
    lineHeight: "50px",
    textAlign: "center",
  },
  boardStyle: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "600px",
  }
};

export function SuperTicTacToeBoard({ ctx, G, moves }) {
  const onClick = (superCellID, id) => moves.clickCell(superCellID, id);



  function createSuperCell(superCellID, G) {
    let thisCellStyle = {
      ...styles.superCellStyle,
    };

    if (G.currentSuperCell === superCellID) {
      thisCellStyle.backgroundColor = "Green";
    }
    let tbody = [];
    for (let i = 0; i < 3; i++) {
      let cells = [];
      for (let j = 0; j < 3; j++) {
        const id = 3 * i + j;
        if (G.superCells[superCellID] === null) {
          cells.push(
            <td key={superCellID + "-" + id}>
              {G.cells[superCellID][id] ? (
                <div style={styles.cellStyle}>
                  {G.cells[superCellID][id] === "0" ? "O" : "X"}
                </div>
              ) : (
                <button
                  style={styles.cellStyle}
                  onClick={() => onClick(superCellID, id)}
                />
              )}
            </td>
          );
        } else {
          // Board where someone Wins
          cells.push(
            <td key={superCellID + "-" + id}>
              <div style={styles.cellStyle}>
                {G.superCells[superCellID] === "draw"
                  ? "~"
                  : G.superCells[superCellID] === "0"
                  ? "O"
                  : "X"}
              </div>
            </td>
          );
        }
      }
      tbody.push(<tr key={superCellID + "-row-" + i}>{cells}</tr>);
    }
    return (
      <table key={"supercell-" + superCellID} style={thisCellStyle}>
        <tbody>{tbody}</tbody>
      </table>
    );
  }

  let winner = "";
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
  }

  
  let supertablebody = [];
  for (let r = 0; r < 3; r++) {
    let superCells = [];
    for (let c = 0; c < 3; c++) {
      const superCellID = 3 * c + r;
      superCells.push(<div>{createSuperCell(superCellID, G)}</div>);
    }
    supertablebody.push(<div>{superCells}</div>);
  }
  return (
    <div>
      <h1>Super tic-tac-toe</h1>
      <span>{ctx.currentPlayer === "0" ? "O" : "X"} To play</span>
      <div id="board" style={styles.boardStyle}>
        {supertablebody}
      </div>
      {winner}
    </div>
  );
}
