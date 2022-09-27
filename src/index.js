import "./style.css";
import domManipulation from "./domManipulation";

// Helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const ship = (length) => {
  // Initialize hits array with 0 to not initialize empty
  const hits = {
    0: false,
  };
  for (let i = 0, j = length; i < j; i += 1) {
    hits[i] = false;
  }

  let name = "";

  switch (length) {
    case 2:
      name = "destroyer";
      break;
    case 3:
      name = "submarine";
      break;
    case 4:
      name = "battleship";
      break;
    case 5:
      name = "carrier";
      break;
    default:
      name = "carrier";
      break;
  }

  const hit = (number) => {
    hits[number] = true;
  };

  const isSunk = () => {
    for (let i = 0; i < length; i += 1) {
      if (hits[i] === false) {
        return false;
      }
    }
    return true;
  };

  let rotation = false;

  const rotate = () => {
    rotation = true;
  };

  const isRotated = () => rotation;

  return {
    hit,
    isSunk,
    length,
    name,
    rotate,
    isRotated,
  };
};

const gameBoard = (name) => {
  const boardName = name;
  const board = [];
  for (let i = 0; i < 10; i += 1) {
    const row = [];
    for (let j = 0; j < 10; j += 1) {
      row.push({ cell: "Water", position: 0 });
    }
    board.push(row);
  }

  let shipsPlaced = 0;
  const nameOfShipsPlaced = [];

  const getShipsPlaced = () => shipsPlaced;
  const setShipPlaced = (number) => {
    shipsPlaced = number;
  };

  const resetShipsPlaced = () => {
    nameOfShipsPlaced.length = 0;
  };

  const confirmShip = (x, y, shipToPlace, horizontal) => {
    if (horizontal === true) {
      for (let i = 0; i < shipToPlace.length; i += 1) {
        board[x][y + i].cell = shipToPlace;
        board[x][y + i].position = i;
      }
    } else {
      // Mark the ship object internally as rotated to later give a class to it
      shipToPlace.rotate();
      for (let i = 0; i < shipToPlace.length; i += 1) {
        board[x + i][y].cell = shipToPlace;
        board[x + i][y].position = i;
      }
    }
  };

  const placeShip = (x, y, shipToPlace, horizontal) => {
    if (horizontal === true) {
      for (let i = 0; i < shipToPlace.length; i += 1) {
        if (y + shipToPlace.length > 9) {
          return 1;
        }
        if (board[x][y + i].cell !== "Water") {
          return 1;
        }
      }
    } else {
      // Mark the ship object internally as rotated to later give a class to it
      for (let i = 0; i < shipToPlace.length; i += 1) {
        if (x + shipToPlace.length > 9) {
          return 1;
        }
        if (board[x + i][y].cell !== "Water") {
          return 1;
        }
      }
    }
    confirmShip(x, y, shipToPlace, horizontal);
    nameOfShipsPlaced.push(shipToPlace.name);
    shipsPlaced += 1;
    return 0;
  };

  const resetShips = () => {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        board[i][j].cell = "Water";
      }
    }

    setShipPlaced(0);
    resetShipsPlaced();
  };

  const receiveAttack = (x, y) => {
    // Compare to water or miss because js can't compare directly equality between objects
    if (board[x][y].cell === "Water" || board[x][y].cell === "Miss") {
      board[x][y].cell = "Miss";
    } else {
      board[x][y].cell.hit(board[x][y].position);
      if (board[x][y].cell.isSunk() === true) {
        shipsPlaced -= 1;
      }
    }
  };

  const allShipSunked = () => {
    if (shipsPlaced === 0) {
      return true;
    }
    return false;
  };

  return {
    placeShip,
    receiveAttack,
    board,
    allShipSunked,
    getShipsPlaced,
    nameOfShipsPlaced,
    resetShips,
    boardName,
  };
};

// Pass board object to call board.receiveAttack
const Player = (board) => {
  const attacksMade = [];

  const validAttack = (x, y) => {
    for (let i = 0; i < attacksMade.length; i += 1) {
      if (attacksMade[i].x === x && attacksMade[i].y === y) {
        return false;
      }
    }
    return true;
  };

  const makeAttack = (x, y) => {
    if (validAttack(x, y) === true) {
      board.receiveAttack(x, y);
      attacksMade.push({ x, y });
      return true;
    }
    return false;
  };

  const takeTurn = () => {
    const x = randomInt(0, 9);
    const y = randomInt(0, 9);
    if (validAttack(x, y) !== true) {
      return takeTurn();
    }
    makeAttack(x, y);
    return { x, y };
  };

  const getBoard = () => board;

  return { makeAttack, takeTurn, attacksMade, getBoard };
};

const gameLoop = (() => {
  let turn = 0;

  const playerBoard = gameBoard("playerBoard");
  const pcBoard = gameBoard("pcBoard");

  const firstPlayer = Player(pcBoard);
  const secondPlayer = Player(playerBoard);

  const getCurrentPlayer = () => {
    if (turn % 2 === 0) {
      return firstPlayer;
    }
    return secondPlayer;
  };

  function gameOver() {
    const boardFrame = document.querySelector(".board-phase");
    boardFrame.classList.toggle("in-game");
    boardFrame.style.display = "none";

    const gameOverDiv = document.querySelector(".gameOver");
    gameOverDiv.style.display = "block";

    const replay = document.querySelector(".replay");
    replay.addEventListener("click", () => {
      moveToBoardPhase();
      gameOverDiv.style.display = "none";
      boardFrame.classList.toggle("in-game");
      boardFrame.style.display = "block";
    });
  }

  const nextTurn = () => {
    // TODO GAME OVER
    turn += 1;
    if (turn % 2 !== 0) {
      const { x, y } = secondPlayer.takeTurn();
      domManipulation.actualizeCell(x, y, playerBoard);
      nextTurn();
    }
  };

  function placeBoats(board) {
    let currentShipLength = 5;
    while (board.getShipsPlaced() < 4) {
      const newPcShip = ship(currentShipLength);
      const number = randomInt(0, 1);
      let horizontal = true;
      if (number === 0) {
        horizontal = true;
      } else {
        horizontal = false;
      }

      if (
        board.placeShip(
          randomInt(0, 9),
          randomInt(0, 9),
          newPcShip,
          horizontal
        ) === 0
      ) {
        currentShipLength -= 1;
      }
    }
  }

  function displayPlayerMove(e) {
    const { x, y } = e.target.dataset;
    if (firstPlayer.makeAttack(x, y)) {
      domManipulation.actualizeCell(x, y, pcBoard);
      nextTurn();
    }
  }

  // call manually for the ship placement phase

  const newPlayerShip5 = ship(5);
  const newPlayerShip4 = ship(4);
  const newPlayerShip3 = ship(3);
  const newPlayerShip2 = ship(2);

  const shipsImg = document.querySelectorAll(".ship");
  let currentShip = newPlayerShip5;
  const selectShip = (e) => {
    const shipToPlace = e.target.id;
    switch (shipToPlace) {
      case "carrier":
        currentShip = newPlayerShip5;
        break;
      case "battleship":
        currentShip = newPlayerShip4;
        break;
      case "submarine":
        currentShip = newPlayerShip3;
        break;
      case "destroyer":
        currentShip = newPlayerShip2;
        break;
      default:
        currentShip = newPlayerShip5;
    }
    domManipulation.markAsSelected(e);
  };

  shipsImg.forEach((shipImg) => {
    shipImg.addEventListener("click", selectShip);
  });

  let horizontal = true;
  window.onload = () => {
    const orientation = document.querySelector("#btn-orientation");
    orientation.addEventListener("click", () => {
      if (orientation.textContent === "Horizontal") {
        orientation.textContent = "Vertical";
        horizontal = false;
      } else {
        orientation.textContent = "Horizontal";
        horizontal = true;
      }
    });
  };

  const playerCells = document.querySelectorAll(".board-frame > .cell");

  function playerPlaceShip(e) {
    const { x, y } = e.target.dataset;
    if (
      playerBoard.getShipsPlaced() < 4 &&
      !playerBoard.nameOfShipsPlaced.includes(currentShip.name)
    ) {
      playerBoard.placeShip(
        parseInt(x, 10),
        parseInt(y, 10),
        currentShip,
        horizontal
      );
      domManipulation.actualizeBoard(playerBoard);
    }
  }

  playerCells.forEach((cell) => {
    cell.addEventListener("click", playerPlaceShip);
  });

  function moveToBoardPhase() {
    const playBtn = document.querySelector("#play-button");
    const preGame = document.querySelector(".pregame");
    playBtn.addEventListener("click", () => {
      preGame.classList.add("remove");
    });
    domManipulation.displayBoard(playerBoard);
    domManipulation.appendButtons();

    const autoPlace = document.querySelector("#place-player-ship");
    autoPlace.addEventListener("click", () => {
      playerBoard.resetShips();
      placeBoats(playerBoard);
      domManipulation.actualizeBoard(playerBoard);
    });

    const resetShips = document.querySelector("#reset-ship");
    resetShips.addEventListener("click", () => {
      playerBoard.resetShips();
      domManipulation.actualizeBoard(playerBoard);
      playerCells.forEach((cell) => {
        cell.addEventListener("click", playerPlaceShip);
      });
    });
  }

  moveToBoardPhase();

  const startGameBtn = document.querySelector("#start-game");

  startGameBtn.addEventListener("click", () => {
    if (playerBoard.getShipsPlaced() < 4) {
      return;
    }
    const controls = document.querySelector(".controls");

    controls.classList.add("hidden");
    placeBoats(pcBoard);
    domManipulation.displayBoard(pcBoard);
    domManipulation.removeBoardPhase();

    const pcCells = document.querySelectorAll("#pc-board > .cell");
    pcCells.forEach((cell) => {
      cell.addEventListener("click", displayPlayerMove);
    });
  });

  return { getCurrentPlayer, nextTurn };
})();

export { ship, gameBoard, Player };
