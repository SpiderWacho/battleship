const domManipulation = (() => {
  let boards = 0;

  function displayBoard(board) {
    const boardsDiv = document.querySelector(".board-phase");
    const playerBoard = document.createElement("div");
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.x = i;
        cell.dataset.y = j;
        if (boards === 1) {
          if (board.board[i][j].cell !== "Water") {
            console.log(`Ship ${board.board[i][j].cell.name} at [${i}][${j}] `);
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
            }
            cell.classList.add("shipCell");
          } else {
            cell.classList.add("water");
          }
        }
        playerBoard.appendChild(cell);
        boardsDiv.appendChild(playerBoard);
      }
    }

    const title = document.createElement("p");
    if (boards === 0) {
      title.textContent = "Pc board";
      playerBoard.classList.add("pc-board");
    } else {
      title.textContent = "Your Board";
      playerBoard.classList.add("player-board");
    }
    boardsDiv.appendChild(title);
    boards += 1;
  }

  function actualizePlayerBoard(board) {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const cell = document.querySelector(
          `.player-board > [data-x="${i}"][data-y="${j}"]`
        );
        if (board.board[i][j].cell !== "Water") {
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
          }
          cell.classList.add("shipCell");
        } else {
          cell.classList.add("water");
        }
      }
    }
  }

  function actualizePcCell(x, y, Board) {
    const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);

    if (Board.board[x][y].cell === "Miss") {
      cell.style.backgroundColor = "blue";
    } else if (!Board.board[x][y].cell.isSunk()) {
      cell.style.backgroundColor = "grey";
    } else {
      cell.style.backgroundColor = "red";
      sunkPcShip(Board);
    }
  }

  function sunkPcShip(Board) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (
          Board.board[i][j].cell !== "Miss" &&
          Board.board[i][j].cell !== "Water"
        ) {
          if (Board.board[i][j].cell.isSunk()) {
            const cell = document.querySelector(
              `.pc-board > [data-x="${i}"][data-y="${j}"]`
            );
            cell.style.backgroundColor = "red";
          }
        }
      }
    }
  }

  function sunkPlayerShip(Board) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (
          Board.board[i][j].cell !== "Miss" &&
          Board.board[i][j].cell !== "Water"
        ) {
          if (Board.board[i][j].cell.isSunk()) {
            const cell = document.querySelector(
              `.player-board > [data-x="${i}"][data-y="${j}"]`
            );
            cell.style.backgroundColor = "red";
          }
        }
      }
    }
  }

  function actualizePlayerCell(x, y, Board) {
    const cell = document.querySelector(
      `.player-board > [data-x="${x}"][data-y="${y}"]`
    );

    if (Board.board[x][y].cell === "Miss") {
      cell.style.backgroundColor = "blue";
    } else if (!Board.board[x][y].cell.isSunk()) {
      cell.style.backgroundColor = "grey";
    } else {
      cell.style.backgroundColor = "red";
      sunkPlayerShip(Board);
    }
  }

  function startGame() {
    const playBtn = document.querySelector("#play-button");
    const preGame = document.querySelector(".pregame");
    playBtn.addEventListener("click", () => {
      preGame.classList.add("remove");
    });
  }

  startGame();

  return {
    displayBoard,
    actualizePcCell,
    actualizePlayerCell,
    actualizePlayerBoard,
  };
})();

export default domManipulation;
