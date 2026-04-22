import { createInitialState, positionsEqual, queueDirection, stepGame } from '../src/snake-game.mjs';

const TICK_MS = 180;

const boardElement = document.getElementById('board');
const overlayElement = document.getElementById('overlay');
const scoreElement = document.getElementById('score');
const pauseButton = document.getElementById('pause-button');
const restartButton = document.getElementById('restart-button');
const controlButtons = document.querySelectorAll('[data-direction]');

let state = createInitialState();
let queuedDirection = state.direction;
let isPaused = false;
let tickHandle = null;

createBoard();
render();
startLoop();

window.addEventListener('keydown', (event) => {
  const nextDirection = mapKeyToDirection(event.key);

  if (nextDirection) {
    event.preventDefault();
    queuedDirection = queueDirection(state.direction, nextDirection);
    return;
  }

  if (event.key === ' ' || event.key === 'Spacebar') {
    event.preventDefault();
    togglePause();
  }

  if ((event.key === 'r' || event.key === 'R') && state.isGameOver) {
    restartGame();
  }
});

pauseButton.addEventListener('click', () => {
  togglePause();
});

restartButton.addEventListener('click', () => {
  restartGame();
});

controlButtons.forEach((button) => {
  button.addEventListener('click', () => {
    queuedDirection = queueDirection(state.direction, button.dataset.direction);
  });
});

function createBoard() {
  const cells = Array.from({ length: state.gridSize * state.gridSize }, (_, index) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = String(index);
    boardElement.appendChild(cell);
    return cell;
  });

  boardElement._cells = cells;
}

function startLoop() {
  clearInterval(tickHandle);
  tickHandle = setInterval(() => {
    if (isPaused || state.isGameOver || state.isWin) {
      return;
    }

    state = stepGame({ ...state, direction: queuedDirection });
    render();
  }, TICK_MS);
}

function togglePause() {
  if (state.isGameOver || state.isWin) {
    return;
  }

  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
  renderOverlay();
}

function restartGame() {
  state = createInitialState();
  queuedDirection = state.direction;
  isPaused = false;
  pauseButton.textContent = 'Pause';
  render();
}

function render() {
  const cells = boardElement._cells;

  cells.forEach((cell, index) => {
    const x = index % state.gridSize;
    const y = Math.floor(index / state.gridSize);
    const isHead = positionsEqual({ x, y }, state.snake[0]);
    const isSnake = state.snake.some((segment) => positionsEqual(segment, { x, y }));
    const isFood = positionsEqual({ x, y }, state.food);

    cell.className = 'cell';

    if (isSnake) {
      cell.classList.add('snake');
    }

    if (isHead) {
      cell.classList.add('head');
    }

    if (isFood) {
      cell.classList.add('food');
    }
  });

  scoreElement.textContent = String(state.score);
  renderOverlay();
}

function renderOverlay() {
  if (state.isGameOver) {
    overlayElement.textContent = 'Game over. Press restart to try again.';
    overlayElement.classList.add('visible');
    return;
  }

  if (state.isWin) {
    overlayElement.textContent = 'You filled the board. Press restart to play again.';
    overlayElement.classList.add('visible');
    return;
  }

  if (isPaused) {
    overlayElement.textContent = 'Paused';
    overlayElement.classList.add('visible');
    return;
  }

  overlayElement.textContent = '';
  overlayElement.classList.remove('visible');
}

function mapKeyToDirection(key) {
  switch (key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      return 'up';
    case 'ArrowDown':
    case 's':
    case 'S':
      return 'down';
    case 'ArrowLeft':
    case 'a':
    case 'A':
      return 'left';
    case 'ArrowRight':
    case 'd':
    case 'D':
      return 'right';
    default:
      return null;
  }
}
