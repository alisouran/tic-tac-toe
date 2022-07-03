const el = (query) => document.querySelector(query);

const cells = Array.from(document.querySelectorAll('.cell'));
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let player = 'X';

const getWinner = () => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a][0] && board[a][0] === board[b][0] && board[a][0] === board[c][0]) {
      return board[a][0];
    }
  }
  return null;
};

const getAvailableCells = () => {
  const availableCells = [];
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === '') {
      availableCells.push(i);
    }
  }
  return availableCells;
};

const clickedCell = (e) => {
  const cellIndex = e.target.dataset.index;
  if (board[cellIndex] == 0) {
    board[cellIndex] = player;
    e.target.innerHTML = player;
    const winner = getWinner();
    if (winner) {
      const winnerEl = el('#status-winner-text');
      winnerEl.innerHTML = `Player ${winner} won!`;
      cells.forEach((cell) => {
        cell.removeEventListener('click', clickedCell);
      });
    } else if (getAvailableCells().length === 0) {
      const winnerEl = el('#status-winner-text');
      winnerEl.innerHTML = 'Draw!';
    }
    player === 'X' ? (player = 'O') : (player = 'X');
  }
};

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', clickedCell);
}

const reset = el('#reset-button');
reset.addEventListener('click', () => {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
  }
  const winnerEl = el('#status-winner-text');
  winnerEl.innerHTML = '';
  cells.forEach((cell) => {
    cell.addEventListener('click', clickedCell);
  });
});
