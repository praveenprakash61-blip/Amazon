export const GRID_SIZE = 14;

export const DIRECTION_VECTORS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE_DIRECTIONS = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

const DEFAULT_SNAKE = [
  { x: 4, y: 7 },
  { x: 3, y: 7 },
  { x: 2, y: 7 },
];

export function createInitialState(options = {}) {
  const gridSize = options.gridSize ?? GRID_SIZE;
  const snake = options.snake ? cloneSnake(options.snake) : cloneSnake(DEFAULT_SNAKE);
  const direction = options.direction ?? 'right';
  const food = options.food ?? placeFood(snake, gridSize, options.randomFn);

  return {
    gridSize,
    snake,
    direction,
    food,
    score: options.score ?? 0,
    isGameOver: false,
    isWin: false,
  };
}

export function queueDirection(currentDirection, nextDirection) {
  if (!DIRECTION_VECTORS[nextDirection]) {
    return currentDirection;
  }

  if (OPPOSITE_DIRECTIONS[currentDirection] === nextDirection) {
    return currentDirection;
  }

  return nextDirection;
}

export function stepGame(state, options = {}) {
  if (state.isGameOver || state.isWin) {
    return { ...state, snake: cloneSnake(state.snake), food: { ...state.food } };
  }

  const vector = DIRECTION_VECTORS[state.direction];
  const nextHead = {
    x: state.snake[0].x + vector.x,
    y: state.snake[0].y + vector.y,
  };

  const hitBoundary =
    nextHead.x < 0 ||
    nextHead.y < 0 ||
    nextHead.x >= state.gridSize ||
    nextHead.y >= state.gridSize;

  if (hitBoundary || isOccupied(nextHead, state.snake)) {
    return {
      ...state,
      snake: cloneSnake(state.snake),
      food: { ...state.food },
      isGameOver: true,
    };
  }

  const ateFood = positionsEqual(nextHead, state.food);
  const nextSnake = [nextHead, ...cloneSnake(state.snake)];

  if (!ateFood) {
    nextSnake.pop();
  }

  const isWin = nextSnake.length === state.gridSize * state.gridSize;

  return {
    ...state,
    snake: nextSnake,
    food: isWin ? state.food : ateFood ? placeFood(nextSnake, state.gridSize, options.randomFn) : { ...state.food },
    score: ateFood ? state.score + 1 : state.score,
    isGameOver: false,
    isWin,
  };
}

export function placeFood(snake, gridSize, randomFn = Math.random) {
  const emptyCells = [];

  for (let y = 0; y < gridSize; y += 1) {
    for (let x = 0; x < gridSize; x += 1) {
      if (!isOccupied({ x, y }, snake)) {
        emptyCells.push({ x, y });
      }
    }
  }

  if (emptyCells.length === 0) {
    return snake[0] ? { ...snake[0] } : { x: 0, y: 0 };
  }

  const index = Math.min(
    emptyCells.length - 1,
    Math.floor((randomFn?.() ?? Math.random()) * emptyCells.length),
  );

  return emptyCells[index];
}

export function positionsEqual(a, b) {
  return a.x === b.x && a.y === b.y;
}

export function isOccupied(cell, snake) {
  return snake.some((segment) => positionsEqual(segment, cell));
}

function cloneSnake(snake) {
  return snake.map((segment) => ({ ...segment }));
}
