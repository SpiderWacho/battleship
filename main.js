/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player),
/* harmony export */   "gameBoard": () => (/* binding */ gameBoard),
/* harmony export */   "ship": () => (/* binding */ ship)
/* harmony export */ });
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


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQWdDLE9BQU87QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsWUFBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEMsc0JBQXNCLGVBQWU7QUFDckM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsaUJBQWlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsaUJBQWlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsZ0JBQWdCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGdCQUFnQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0Isd0JBQXdCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAtMi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC0yLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3Qgc2hpcCA9IGxlbmd0aCA9PiB7XG4gICAgbGV0IGhpdHMgPSB7XG4gICAgICAgIDA6IGZhbHNlLFxuICAgIH07XG5cbiAgICBmb3IgKGxldCBpID0gMCwgaiA9IGxlbmd0aDsgaSA8IGo7IGkrKyl7XG4gICAgICAgIGhpdHNbaV0gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBoaXQgPSBudW1iZXIgPT4geyBcbiAgICAgICAgaGl0c1tudW1iZXJdID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChoaXRzW2ldID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHtoaXQsIGlzU3VuaywgbGVuZ3RoLCBoaXRzfTtcbn0gXG5cbmNvbnN0IGdhbWVCb2FyZCA9ICgpID0+IHtcbiAgICBsZXQgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwIDsgaSsrKSB7XG4gICAgICAgIGxldCByb3cgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgICAgICByb3cucHVzaCh7Y2VsbCA6ICdXYXRlcid9KTtcbiAgICAgICAgfVxuICAgICAgICBib2FyZC5wdXNoKHJvdyk7ICAgIFxuICAgIH1cblxuICAgIGxldCBzaGlwc1BsYWNlZCA9IDA7XG5cbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoeCwgeSwgc2hpcCwgaG9yaXpvbnRhbCkgPT4ge1xuICAgICAgICBpZiAoaG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYm9hcmRbeF1beStpXS5jZWxsID0gc2hpcFxuICAgICAgICAgICAgICAgIGJvYXJkW3hdW3kraV0ucG9zaXRpb24gPSBpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBib2FyZFt4K2ldW3ldLmNlbGwgPSBzaGlwIFxuICAgICAgICAgICAgICAgIGJvYXJkW3graV1beV0ucG9zaXRpb24gPSBpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2hpcHNQbGFjZWQgKz0gMTtcbiAgICB9XG5cbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICAgICAgaWYgKGJvYXJkW3hdW3ldLmNlbGwgPT09ICdXYXRlcicpIHtcbiAgICAgICAgICAgIGJvYXJkW3hdW3ldLmNlbGwgPSAnTWlzcyc7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYm9hcmRbeF1beV0uY2VsbCA9PT0gJ01pc3MnKSB7XG4gICAgICAgICAgICBib2FyZFt4XVt5XS5jZWxsID0gJ01pc3MnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYm9hcmRbeF1beV0uY2VsbC5oaXQoYm9hcmRbeF1beV0ucG9zaXRpb24pO1xuICAgICAgICAgICAgaWYgKGJvYXJkW3hdW3ldLmNlbGwuaXNTdW5rKCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzaGlwc1BsYWNlZCAtPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0gXG4gICAgXG4gICAgY29uc3QgYWxsU2hpcFN1bmtlZCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHNoaXBzUGxhY2VkID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIGJvYXJkLCBhbGxTaGlwU3Vua2VkfTtcbn1cblxuY29uc3QgUGxheWVyID0gKGNvbnRyb2xsYWJsZSwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBtYWtlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayh4LHkpO1xuICAgIH1cblxuICAgIGNvbnN0IHRha2VUdXJuID0gKCkgPT4ge1xuICAgICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxuICAgICAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKVxuICAgICAgICBpZiAoYXR0YWNrc01hZGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBtYWtlQXR0YWNrKHgsIHkpO1xuICAgICAgICAgICAgYXR0YWNrc01hZGUucHVzaCh7J3gnOiB4LCAneScgOiB5fSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbGlkQXR0YWNrKHgseSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIG1ha2VBdHRhY2soeCwgeSk7XG4gICAgICAgICAgICBhdHRhY2tzTWFkZS5wdXNoKHsneCc6IHgsICd5JyA6IHl9KVxuICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFrZVR1cm4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHZhbGlkQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRhY2tzTWFkZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGF0dGFja3NNYWRlW2ldLnggPT09IHggJiYgYXR0YWNrc01hZGVbaV0ueSA9PT0geSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBhdHRhY2tzTWFkZSA9IFtdXG5cbiAgICByZXR1cm4ge21ha2VBdHRhY2ssIHRha2VUdXJuLCBhdHRhY2tzTWFkZX1cbn0gXG5cbmNvbnN0IGdhbWVMb29wID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld0dhbWUgPSAoKSA9PiB7XG4gICAgICAgIGxldCBuZXdCb2FyZCA9IGdhbWVCb2FyZCgpXG4gICAgICAgIGxldCBuZXdQbGF5ZXIgPSBQbGF5ZXIodHJ1ZSwgbmV3Qm9hcmQpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtzaGlwLCBnYW1lQm9hcmQsIFBsYXllcn07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9