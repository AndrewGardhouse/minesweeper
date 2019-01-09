export default {
  selectedDifficulty: 'easy',
  gameOptions: {
    easy: {
      columns: 9,
      rows: 9,
      bombs: 10,
    },
    medium: {
      columns: 16,
      rows: 16,
      bombs: 40,
    },
    hard: {
      columns: 32,
      rows: 32,
      bombs: 200,
    },
    veryHard: {
      columns: 32,
      rows: 32,
      bombs: 400,
    },
  },
  board: [],
};
