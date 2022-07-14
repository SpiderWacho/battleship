const board = document.querySelector('.board');



for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell')
    cell.textContent = i+1;
    board.appendChild(cell);
}