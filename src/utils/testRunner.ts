import { TestCase, TestRunnerResult } from '@/types';

// Test runner function
export function runTests(testCases: TestCase[], userCode: string, functionName: string): TestRunnerResult {
  try {
    // Create a function from the user code
    const fn = new Function(`
      ${userCode}
      return ${functionName};
    `)();
    
    // Check if the function is now defined
    if (typeof fn !== 'function') {
      throw new Error(`${functionName} function is not defined in your code`);
    }
    
    // Run each test case
    const results = testCases.map((testCase) => {
      // Create a deep copy of the input to avoid mutations affecting other tests
      const inputCopy = JSON.parse(JSON.stringify(testCase.input));
      
      // Call the function with the correct arguments
      // If input is an array, spread it as arguments to the function
      let result;
      if (Array.isArray(inputCopy)) {
        result = fn(...inputCopy);
      } else {
        result = fn(inputCopy);
      }
      
      const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
      
      return {
        passed,
        result,
        expected: testCase.expected,
        input: testCase.input
      };
    });
    
    return { success: true, results };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: errorMessage };
  }
} 