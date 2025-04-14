import { bookSortingTest } from './bookSorting';
import { spyCodeTest } from './spyCode';
import { pineappleCountTest } from './pineappleCount';
import { TestData } from '@/types';

export const tests: TestData[] = [
  bookSortingTest,
  pineappleCountTest,
  spyCodeTest,
];

export const getTestById = (id: string): TestData | undefined => {
  return tests.find(test => test.id === id);
};

export const getTests = (): TestData[] => {
  return [...tests];
}; 