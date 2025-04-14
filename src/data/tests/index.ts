import { bookSortingTest } from './bookSorting';
import { spyCodeTest } from './spyCode';
import { carRentalPricingTest } from './carRentalPricing';
import { TestData } from '@/types';

export const tests: TestData[] = [
  bookSortingTest,
  spyCodeTest,
  carRentalPricingTest
];

export const getTestById = (id: string): TestData | undefined => {
  return tests.find(test => test.id === id);
};

export const getTests = (): TestData[] => {
  return [...tests];
}; 