import './style.css'

const ship = length => {
    let hits = {
        0: false,
    };

    for (let i = 0, j = length; i < j; i++){
        hits[i] = false;
    }

    const hit = number => { 
        hits[number] = true;
    }

    const isSunk = () => {
        for (let i = 0; i < length; i++) {
            if (hits[i] === false) {
                return false;
            }
        }
        return true;
    }
    return {hit, isSunk, length, hits};
} 

const gameBoard = () => {
    let board = [];
    for (let i = 0; i < 10 ; i++) {
        let row = [];
        for (let j = 0; j < 10; j++) {
            row.push({cell : 'Water'});
        }
        board.push(row);    
    }

    let shipsPlaced = 0;

    const placeShip = (x, y, ship, horizontal) => {
        if (horizontal === true) {
            for (let i = 0; i < ship.length; i++) {
                board[x][y+i].cell = ship
                board[x][y+i].position = i
            }
        }
        else {
            for (let i = 0; i < ship.length; i++) {
                board[x+i][y].cell = ship 
                board[x+i][y].position = i
            }
        }
        shipsPlaced += 1;
    }

    const receiveAttack = (x, y) => {
        if (board[x][y].cell === 'Water') {
            board[x][y].cell = 'Miss';
            return false;
        }
        else if (board[x][y].cell === 'Miss') {
            board[x][y].cell = 'Miss';
            return false;
        }
        else {
            board[x][y].cell.hit(board[x][y].position);
            if (board[x][y].cell.isSunk() === true) {
                shipsPlaced -= 1
            }
            return true;
        }
    } 
    
    const allShipSunked = () => {
        if (shipsPlaced === 0) {
            return true;
        }
        return false;
    }

    return {placeShip, receiveAttack, board, allShipSunked};
}

const Player = (controllable, board) => {
    const makeAttack = (x, y) => {
        board.receiveAttack(x,y);
    }

    const takeTurn = () => {
        let x = Math.floor(Math.random() * 10)
        let y = Math.floor(Math.random() * 10)
        if (attacksMade.length === 0) {
            makeAttack(x, y);
            attacksMade.push({'x': x, 'y' : y})
            return
        }
        else if (validAttack(x,y) === true) {
            makeAttack(x, y);
            attacksMade.push({'x': x, 'y' : y})
            return 
        }
        else {
            takeTurn();
        }
    }

    const validAttack = (x, y) => {
        for (let i = 0; i < attacksMade.length; i++) {
            if (attacksMade[i].x === x && attacksMade[i].y === y) {
                return false;
            }
        }
        return true;
    }

    const attacksMade = []

    return {makeAttack, takeTurn, attacksMade}
} 

const gameLoop = () => {
    const newGame = () => {
        let newBoard = gameBoard()
        let newPlayer = Player(true, newBoard);
    }
}

export {ship, gameBoard, Player};