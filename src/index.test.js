/**
 * @jest-environment jsdom
 */

import {ship, gameBoard, Player} from "./index.js";  

window.onload = 

test('Ship factory creates new ship', () => {
    let newShip = ship(2)
    expect(newShip).not.toBe(undefined);
})

test('isSunk() detect when a ship is sunked', () => {
    let newShip = ship(3)
    newShip.hit(2)
    newShip.hit(1)
    newShip.hit(0)
    expect(newShip.isSunk()).toBe(true);
})

test('isSunk() detect when a ship is not sunked', () => {
    let newShip = ship(3)
    newShip.hit(2)
    newShip.hit(0)
    expect(newShip.isSunk()).toBe(false);
})

test('Gameboard factory correctly create a board', () => {
    let newBoard = gameBoard();
    expect(newBoard).not.toBe(undefined);
})

test.only('Place ship dont place ships outside of board', () => {
    let newBoard = gameBoard();
    let newShip = ship(5);
    expect(() => {newBoard.placeShip(0, 0, newShip, true)}).toBe(1);
})

test('Place ship dont place ship if there is another ship in the path', () => {
    let newBoard = gameBoard();
    let newShip = ship(5);
    let newShip2 = ship(4);
    newBoard.placeShip(9, 4, newShip, true);
    expect(() => {newBoard.placeShip(9, 4, newShip2, true)}).toBe(1);
})

test('ReceiveAttack() marks attack correctly', () => {
    let newBoard = gameBoard();
    let newShip = ship(2)
    newBoard.placeShip(3,1, newShip, true)
    newBoard.receiveAttack(3,1);
    newBoard.receiveAttack(3,2);
    expect(newShip.isSunk()).toBe(true);
})

test('allShipSunked() detects when some ships arent sunk', () => {
    let newBoard = gameBoard();
    let newShip = ship(2)
    let secondShip = ship(3)
    newBoard.placeShip(3,1, newShip, true)
    newBoard.receiveAttack(3,1);
    newBoard.receiveAttack(3,2);
    newBoard.placeShip(0,1, secondShip, false) 
    expect(newBoard.allShipSunked()).toBe(false);
})

test('allShipSunked() detects when all ships are sunk', () => {
    let newBoard = gameBoard();
    let newShip = ship(2)
    let secondShip = ship(3)
    newBoard.placeShip(3,1, newShip, true)
    newBoard.receiveAttack(3,1);
    newBoard.receiveAttack(3,2);
    newBoard.placeShip(5,1, secondShip, false) 
    newBoard.receiveAttack(5,1);
    newBoard.receiveAttack(6,1);
    newBoard.receiveAttack(7,1);
    expect(newBoard.allShipSunked()).toBe(true);
})

test('Player can attack and sunk ships', () => {
    let newBoard = gameBoard();
    let secondShip = ship(3)
    let newPlayer = Player(newBoard)
    newBoard.placeShip(5,1, secondShip, false) 
    newPlayer.makeAttack(5, 1);
    newPlayer.makeAttack(6, 1);
    newPlayer.makeAttack(7, 1);
    expect(newBoard.allShipSunked()).toBe(true);
})

test('takeTurn() effectively marks board as attacked', () => {
    let newBoard = gameBoard();
    let secondShip = ship(3)
    let newPlayer = Player(newBoard)
    newBoard.placeShip(5,1, secondShip, false) 
    for (let i = 0; i < 100; i++) {
        newPlayer.takeTurn();
    }
    expect(newBoard.allShipSunked()).toBe(true);
})

test('takeTurn() with more than 100 plays run infinitly', () => {
    let newBoard = gameBoard();
    let secondShip = ship(3)
    let newPlayer = Player(newBoard)
    newBoard.placeShip(5,1, secondShip, false) 
    expect(() => {    for (let i = 0; i < 101; i++) {
        newPlayer.takeTurn();
    }}).toThrow(RangeError);
})
