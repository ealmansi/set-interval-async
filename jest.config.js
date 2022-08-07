/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

process.original = process;

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
