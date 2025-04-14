export interface TestCase {
  input: unknown;
  expected: unknown;
}

export interface TestResult {
  passed: boolean;
  input: unknown;
  result: unknown;
  expected: unknown;
}

export interface Solution {
  title: string;
  code: string;
  description?: string;
}

export interface TestData {
  id: string;
  title: string;
  description: {
    en: {
      title: string;
      body: string;
    };
    ru: {
      title: string;
      body: string;
    };
  };
  initialCode: string;
  functionName: string;
  testCases: TestCase[];
  solutions?: Solution[];
  tags?: {
    label: string;
    color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink';
  }[];
}

export interface SuccessResult {
  success: true;
  results: TestResult[];
}

export interface ErrorResult {
  success: false;
  error: string;
}

export type TestRunnerResult = SuccessResult | ErrorResult; 