import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 5, b: 2, action: Action.Add, expected: 7 },
    { a: 7, b: 5, action: Action.Subtract, expected: 2 },
    { a: 4, b: 3, action: Action.Multiply, expected: 12 },
    { a: 25, b: 5, action: Action.Divide, expected: 5 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 1, b: 3, action: '**', expected: null },
    { a: '3', b: 2, action: Action.Add, expected: null },   
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should return ${expected} for ${a} ${action} ${b}`, () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
  });
  });
  
});
