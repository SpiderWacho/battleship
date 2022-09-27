const domManipulation = (() => {
  // helper function

  const boardPhase = document.querySelector(".board-phase");
  const boardsDiv = document.createElement("div");
  boardsDiv.classList.add("board-container");
  boardPhase.appendChild(boardsDiv);

  function displayBoard(board) {
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("board-frame");
    if (board.boardName === "playerBoard") {
      boardContainer.id = "player-board";
    } else {
      boardContainer.id = "pc-board";
    }
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.x = i;
        cell.dataset.y = j;
        boardContainer.appendChild(cell);
      }
    }

    boardsDiv.appendChild(boardContainer);
  }

  function appendButtons() {
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("button-container");
    const autoComplete = document.createElement("button");
    autoComplete.id = "place-player-ship";
    autoComplete.textContent = "Auto Place Ships";

    const resetShips = document.createElement("button");
    resetShips.id = "reset-ship";
    resetShips.textContent = "Clear Board";

    buttonsDiv.appendChild(autoComplete);
    buttonsDiv.appendChild(resetShips);
    boardsDiv.appendChild(buttonsDiv);
  }

  const getId = (board) => {
    let id = "";
    if (board.boardName === "playerBoard") {
      id = "player-board";
    } else {
      id = "pc-board";
    }
    return id;
  };

  function actualizeBoard(board) {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const cell = document.querySelector(
          `#${getId(board)} > [data-x="${i}"][data-y="${j}"]`
        );

        // Pass a remove atribute first to clean it off it is called again
        const classes = [
          "rotated",
          "water",
          "shipCell",
          "carrier0",
          "carrier1",
          "carrier2",
          "carrier3",
          "carrier4",
          "battleship0",
          "battleship1",
          "battleship2",
          "battleship3",
          "submarine0",
          "submarine1",
          "submarine2",
          "destroyer0",
          "destroyer1",
        ];

        classes.forEach((el) => {
          cell.classList.remove(el);
        });

        if (board.board[i][j].cell !== "Water") {
          if (board.board[i][j].cell.isRotated()) {
            cell.classList.add("rotated");
          }
          if (board.board[i][j].cell.name === "carrier") {
            const { position } = board.board[i][j];
            switch (position) {
              case 0:
                cell.classList.add("carrier0");
                break;
              case 1:
                cell.classList.add("carrier1");
                break;
              case 2:
                cell.classList.add("carrier2");
                break;
              case 3:
                cell.classList.add("carrier3");
                break;
              case 4:
                cell.classList.add("carrier4");
                break;
              default:
                cell.classList.add("carrier0");
            }
          } else if (board.board[i][j].cell.name === "battleship") {
            const { position } = board.board[i][j];
            switch (position) {
              case 0:
                cell.classList.add("battleship0");
                break;
              case 1:
                cell.classList.add("battleship1");
                break;
              case 2:
                cell.classList.add("battleship2");
                break;
              case 3:
                cell.classList.add("battleship3");
                break;
              default:
                cell.classList.add("battleship0");
            }
          } else if (board.board[i][j].cell.name === "submarine") {
            const { position } = board.board[i][j];
            switch (position) {
              case 0:
                cell.classList.add("submarine0");
                break;
              case 1:
                cell.classList.add("submarine1");
                break;
              case 2:
                cell.classList.add("submarine2");
                break;
              case 3:
                break;
              default:
                cell.classList.add("submarine0");
            }
          } else if (board.board[i][j].cell.name === "destroyer") {
            const { position } = board.board[i][j];
            switch (position) {
              case 0:
                cell.classList.add("destroyer0");
                break;
              case 1:
                cell.classList.add("destroyer1");
                break;
              default:
                cell.classList.add("destroyer0");
            }
          }
          cell.classList.add("shipCell");
        } else {
          cell.classList.add("water");
        }
      }
    }
  }

  function sunkShip(Board) {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (
          Board.board[i][j].cell !== "Miss" &&
          Board.board[i][j].cell !== "Water"
        ) {
          const cell = document.querySelector(
            `#${getId(Board)}> [data-x="${i}"][data-y="${j}"]`
          );
          if (Board.board[i][j].cell.isSunk()) {
            cell.classList.add("sunk");
          }
        }
      }
    }
  }

  function actualizeCell(x, y, Board) {
    const cell = document.querySelector(
      `#${getId(Board)} > [data-x="${x}"][data-y="${y}"]`
    );
    if (Board.board[x][y].cell === "Miss") {
      cell.classList.add("water-hit");
    } else if (!Board.board[x][y].cell.isSunk()) {
      cell.classList.add("hit");
    } else {
      sunkShip(Board);
    }
  }

  function markAsSelected(e) {
    const selected = document.querySelectorAll(".selected");
    if (selected !== undefined) {
      selected.forEach((el) => {
        el.classList.remove("selected");
      });
    }
    e.target.classList.add("selected");
  }

  function removeBoardPhase() {
    const controls = document.querySelector(".controls");
    const buttons = document.querySelector(".button-container");
    const startGameBtn = document.querySelector("#start-game");
    const boardContainer = document.querySelector(".board-container");

    controls.remove();
    buttons.remove();
    startGameBtn.remove();
    boardPhase.classList.add("in-game");
    boardContainer.classList.add("in-game");
  }

  return {
    displayBoard,
    actualizeCell,
    actualizeBoard,
    markAsSelected,
    removeBoardPhase,
    appendButtons,
  };
})();

export default domManipulation;
