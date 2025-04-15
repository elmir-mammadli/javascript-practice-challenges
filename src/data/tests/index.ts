import { bookSortingTest } from './bookSorting';
import { spyCodeTest } from './spyCode';
import { pineappleCountTest } from './pineappleCount';
import { lessThan99Test } from './lessThan99';
import { smallestAndBiggestTest } from './smallestAndBiggest';
import { countConsonantsTest } from './countConsonants';
import { TestData } from '@/types';

export const tests: TestData[] = [
  bookSortingTest,
  pineappleCountTest,
  spyCodeTest,
  lessThan99Test,
  smallestAndBiggestTest,
  countConsonantsTest
];

export const getTestById = (id: string): TestData | undefined => {
  return tests.find(test => test.id === id);
};

export const getTests = (): TestData[] => {
  return [...tests];
}; 