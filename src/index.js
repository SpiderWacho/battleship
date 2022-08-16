import "./style.css";
import domManipulation from "./domManipulation";

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
      name = "destroyer";
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

  return {
    hit,
    isSunk,
    length,
    name,
  };
};

const gameBoard = () => {
  const board = [];
  for (let i = 0; i < 10; i += 1) {
    const row = [];
    for (let j = 0; j < 10; j += 1) {
      row.push({ cell: "Water" });
    }
    board.push(row);
  }

  let shipsPlaced = 0;

  const placeShip = (x, y, shipToPlace, horizontal) => {
    console.log(`Trying to place ${shipToPlace.name} in [${x}][${y}]`);
    if (horizontal === true) {
      for (let i = 0; i < shipToPlace.length; i += 1) {
        if (y + shipToPlace.length > 9) {
          return 1;
        }
        if (board[x][y + i].cell !== "Water") {
          return 1;
        }
        board[x][y + i].cell = shipToPlace;
        board[x][y + i].position = i;
      }
    } else {
      for (let i = 0; i < shipToPlace.length; i += 1) {
        if (x + shipToPlace.length > 9) {
          return 1;
        }
        if (board[x + i][y].cell !== "Water") {
          return 1;
        }
        board[x + i][y].cell = shipToPlace;
        board[x + i][y].position = i;
      }
    }
    shipsPlaced += 1;
    console.log(shipsPlaced);
    return 0;
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

  const allShipsPlaced = () => {
    if (shipsPlaced === 4) {
      return true;
    }
    return false;
  };

  return {
    placeShip,
    receiveAttack,
    board,
    allShipSunked,
    allShipsPlaced,
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

  const playerBoard = gameBoard();
  const pcBoard = gameBoard();

  const firstPlayer = Player(pcBoard);
  const secondPlayer = Player(playerBoard);

  const getCurrentPlayer = () => {
    if (turn % 2 === 0) {
      return firstPlayer;
    }
    return secondPlayer;
  };

  const getCurrentBoard = () => {
    if (turn % 2 === 0) {
      return pcBoard;
    }
    return playerBoard;
  };

  function gameOver(Board) {
    if (Board.allShipSunked()) {
      const board = document.querySelector(".board-phase");
      const gameOverScreen = document.createElement("div");
      gameOverScreen.classList.add(".gameOver");
      document.body.prepend(gameOverScreen);
      board.remove();
    }
  }

  const nextTurn = () => {
    turn += 1;
    gameOver(getCurrentBoard());
    if (turn % 2 !== 0) {
      const { x, y } = secondPlayer.takeTurn();
      domManipulation.actualizePlayerCell(x, y, playerBoard);
      nextTurn();
    }
  };

  function placeBoat(number) {
    if (number === 0) {
      return;
    }
    const newPcShip = ship(number);
    if (
      pcBoard.placeShip(randomInt(0, 9), randomInt(0, 9), newPcShip, true) === 0
    ) {
      number -= 1;
      placeBoat(number);
    } else {
      placeBoat(number);
    }
  }
  function placePcBoats() {
    const number = 5;
    placeBoat(number);
  }
  placePcBoats();
  domManipulation.displayBoard(pcBoard);

  function displayPlayerMove(e) {
    const { x, y } = e.target.dataset;
    if (firstPlayer.makeAttack(x, y)) {
      domManipulation.actualizePcCell(x, y, pcBoard);
    }
  }

  const pcCells = document.querySelectorAll(".pc-board > .cell");
  pcCells.forEach((cell) => {
    cell.addEventListener("click", displayPlayerMove);
  });

  domManipulation.displayBoard(playerBoard);
  const newPlayerShip5 = ship(5);
  const newPlayerShip4 = ship(4);
  const newPlayerShip3 = ship(3);
  const newPlayerShip2 = ship(2);
  let currentShip = "carrier";

  const shipsImg = document.querySelectorAll(".ship");
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
  };

  shipsImg.forEach((shipImg) => {
    shipImg.addEventListener("click", selectShip);
  });

  let horizontal = true;
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

  const playerCells = document.querySelectorAll(".player-board > .cell");
  function playerPlaceShip(e) {
    const { x, y } = e.target.dataset;
    playerBoard.placeShip(
      parseInt(x, 10),
      parseInt(y, 10),
      currentShip,
      horizontal
    );
    domManipulation.actualizePlayerBoard(playerBoard);
  }
  playerCells.forEach((cell) => {
    cell.addEventListener("click", playerPlaceShip);
  });

  return { getCurrentPlayer, nextTurn };
})();

export { ship, gameBoard, Player };
