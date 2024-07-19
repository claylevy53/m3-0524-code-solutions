import { evenNumbers, toDollars, divideBy, multiplyBy } from './numbers';

describe('evenNumbers', () => {
  test('should return only odd numbers', () => {
    expect(evenNumbers([2, 4, 3, 8])).toStrictEqual([2, 4, 8]);
    expect(evenNumbers([1, 11, 31, 4])).toStrictEqual([4]);
    expect(evenNumbers([88, 44, 22])).toStrictEqual([88, 44, 22]);
  });
});

describe('toDollars', () => {
  test('Returns a number formatted in dollars and cents.', () => {
    expect(toDollars(120)).toStrictEqual('$120.00');
  });
});

describe('divideBy', () => {
  test('Returns a new array of numbers where every entry has been divided by the given divisor. Does not modify the original array', () => {
    expect(divideBy([2, 4, 6, 8], 2)).toStrictEqual([1, 2, 3, 4]);
  });
});

describe('multiplyBy', () => {
  test('Modifies an object by multiplying the value of each key, but only if that value is a number. Key names are arbitrary.', () => {
    expect(multiplyBy({ num1: 2, num2: 4, num3: 6, num4: 8 }, 2)).toStrictEqual(
      { num1: 4, num2: 8, num3: 12, num4: 16 }
    );
  });
});
