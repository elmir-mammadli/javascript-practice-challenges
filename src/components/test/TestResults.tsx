'use client';

import { TestResult } from '@/types';

interface TestResultsProps {
  results: TestResult[] | null;
  error: string | null;
}

export default function TestResults({ results, error }: TestResultsProps) {
  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <pre className="whitespace-pre-wrap font-mono bg-red-50 p-3 rounded border border-red-100">{error}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return null;
  }

  const allPassed = results.every(result => result.passed);
  const passedCount = results.filter(result => result.passed).length;

  return (
    <div className="mt-6">
      <div className={`p-4 rounded-lg ${allPassed ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {allPassed ? (
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="ml-3">
            <h3 className={`text-lg font-medium ${allPassed ? 'text-green-800' : 'text-yellow-800'}`}>
              {allPassed 
                ? "All tests passed!" 
                : `${passedCount} of ${results.length} tests passed`}
            </h3>
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-4">
        {results.map((result, index) => (
          <div 
            key={index}
            className="border rounded-lg overflow-hidden"
          >
            <div className={`p-3 ${result.passed ? 'bg-green-50' : 'bg-red-50'} border-b ${result.passed ? 'border-green-200' : 'border-red-200'}`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {result.passed ? (
                    <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <h4 className={`font-medium ${result.passed ? 'text-green-800' : 'text-red-800'}`}>
                    Test {index + 1}: {result.passed ? 'Passed' : 'Failed'}
                  </h4>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Input:</p>
                  <pre className="text-xs bg-gray-50 text-gray-900 p-2 rounded border border-gray-200 overflow-auto max-h-32">
                    {JSON.stringify(result.input, null, 2)}
                  </pre>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Your Result:</p>
                  <pre className="text-xs bg-gray-50 p-2 text-gray-900 rounded border border-gray-200 overflow-auto max-h-32">
                    {JSON.stringify(result.result, null, 2)}
                  </pre>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Expected:</p>
                  <pre className="text-xs bg-gray-50 p-2 text-gray-900 rounded border border-gray-200 overflow-auto max-h-32">
                    {JSON.stringify(result.expected, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 