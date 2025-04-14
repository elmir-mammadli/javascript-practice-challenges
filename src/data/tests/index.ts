import { bookSortingTest } from './bookSorting';
import { spyCodeTest } from './spyCode';
import { pineappleCountTest } from './pineappleCount';
import { lessThan99Test } from './lessThan99';
import { TestData } from '@/types';

export const tests: TestData[] = [
  bookSortingTest,
  pineappleCountTest,
  spyCodeTest,
  lessThan99Test
];

export const getTestById = (id: string): TestData | undefined => {
  return tests.find(test => test.id === id);
};

export const getTests = (): TestData[] => {
  return [...tests];
}; 