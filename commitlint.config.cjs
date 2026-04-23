/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    allowBreakingChanges: ['feat', 'fix'],
    skipQuestions: ['footer', 'breaking', 'confirmCommit'],
  },
};
