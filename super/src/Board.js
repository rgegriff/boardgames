import React from "react";
import { LobbyClient } from "boardgame.io/react";
import drawImage from "./draw.png";
import xImage from "./x.png";
import oImage from "./o.png";

const styles = {
  superCellStyle: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gridGap: "0",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "black",
  },
  cellStyle: {
    //width: "50px",
    height: "0",
    paddingBottom: "100%",
    lineHeight: "100%",
    textAlign: "center",
  },
  boardStyle: {
    display: "grid",
    width: "500px",
    gridGap: "20px",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
  },
};

function Cell(props) {
  let isClicked = props.cellMarker !== "";
  let key = props.superCellID + "-" + "props.cellID";
  let elem = null;
  if (isClicked) {
    let image = props.cellMarker === "0" ? oImage : xImage;
    elem = (
      <div
        key={key}
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
      ></div>
    );
  } else {
    elem = (
      <button
        key={key}
        style={styles.cellStyle}
        onClick={() => props.cellClick(props.superCellID, props.cellID)}
      />
    );
  }
  return elem;
}

function SuperCell(props) {
  let thisCellStyle = {
    ...styles.superCellStyle,
  };

  if (props.activeSuperCell) {
    thisCellStyle.borderColor = "green";
    thisCellStyle.borderWidth = "3px";
  }
  let elem = null;
  if (props.superCellWinner === null) {
    let cells = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const id = 3 * i + j;
        let cellMarker = "";

        switch (props.cells[id]) {
          case "0":
            cellMarker = "0";
            break;
          case "1":
            cellMarker = "1";
        }

        cells.push(
          <Cell
            key={id}
            superCellID={props.superCellID}
            cellID={id}
            cellMarker={cellMarker}
            cellClick={props.cellClick}
          />
        );
      }
    }
    elem = (
    <div key={"supercell-" + props.superCellID} style={thisCellStyle}>
      {cells}
    </div>
    )
  } else {
    let image = null;
    if (props.superCellWinner === "0") {
      image = oImage;
    } else {
      image = xImage;
    }
    elem = (
      <div key={"supercell-" + props.superCellID} style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }} ></div>
    )
  }

  return elem;
}

export function SuperTicTacToeBoard({ ctx, G, moves }) {
  const cellClick = (superCellID, id) => moves.clickCell(superCellID, id);
  console.log(ctx);
  console.log(G);

  let winner = "";
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
  }

  let superCells = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const superCellID = 3 * r + c;
      superCells.push(
        <SuperCell
          key={"supercell-" + superCellID}
          superCellID={superCellID}
          cells={G.cells[superCellID]}
          activeSuperCell={G.currentSuperCell === superCellID}
          superCellWinner={G.superCells[superCellID]}
          cellClick={cellClick}
        />
      );
    }
  }
  return (
    <div>
      <h1>Super tic-tac-toe</h1>
      <span>{ctx.currentPlayer === "0" ? "O" : "X"} To play</span>
      <div id="board" style={styles.boardStyle}>
        {superCells}
      </div>
      {winner}
    </div>
  );
}
