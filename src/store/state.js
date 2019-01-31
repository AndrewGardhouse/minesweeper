export default {
  selectedDifficulty: 'easy',
  gameOptions: {
    easy: {
      columns: 9,
      rows: 9,
      bombs: 10,
      optionText: 'Easy (9x9, 10 Bombs)',
    },
    medium: {
      columns: 16,
      rows: 16,
      bombs: 40,
      optionText: 'Medium (16x16, 40 Bombs)',
    },
    hard: {
      columns: 30,
      rows: 16,
      bombs: 99,
      optionText: 'Hard (30x16, 99 Bombs)',
    },
    veryHard: {
      columns: 32,
      rows: 32,
      bombs: 200,
      optionText: 'Very Hard (32x32, 200 Bombs)',
    },
  },
  board: [],
  timerInterval: null,
  runningTime: 0,
  fastestTimes: {
    easy: null,
    medium: null,
    hard: null,
    veryHard: null,
  },
};
