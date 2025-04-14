'use client';

import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition, Switch } from '@headlessui/react';
import CodeEditor from './CodeEditor';
import TestResults from './TestResults';
import { runTests } from '@/utils/testRunner';
import { TestData, TestResult } from '@/types';
import Link from 'next/link';

interface TestRunnerProps {
  testData: TestData;
}

export default function TestRunner({ testData }: TestRunnerProps) {
  const [code, setCode] = useState<string>(testData.initialCode);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [isRunning, setIsRunning] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [nextTestId, setNextTestId] = useState<string | null>(null);
  const [prevTestId, setPrevTestId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generate a session ID on component mount to track user sessions
  useEffect(() => {
    setSessionId(Date.now().toString());
    
    // Show loading state for 0.5 second when component mounts
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Load saved code from localStorage when the test changes
  useEffect(() => {
    // Set completed status to false when test changes
    setIsCompleted(false);
    setResults(null);
    setError(null);
    
    // Show loading state for 1 second when task changes
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    // Load saved code for this test if it exists
    const savedCode = localStorage.getItem(`code_${testData.id}`);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(testData.initialCode);
    }
    
    // Check if this test is already completed for the current session
    const completedTests = JSON.parse(localStorage.getItem(`completed_tests_${sessionId}`) || '[]');
    if (completedTests.includes(testData.id)) {
      setIsCompleted(true);
    }
    
    // Find previous and next test IDs
    fetchAdjacentTestIds();
    
    return () => clearTimeout(timer);
  }, [testData.id, sessionId]);

  // Save code to localStorage whenever it changes
  useEffect(() => {
    if (code !== testData.initialCode) {
      localStorage.setItem(`code_${testData.id}`, code);
    }
  }, [code, testData.id, testData.initialCode]);

  const runTest = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setError(null);
    
    // Small delay to show loading state
    setTimeout(() => {
      const testResult = runTests(testData.testCases, code, testData.functionName);
      
      if (testResult.success) {
        setResults(testResult.results);
        setError(null);
        
        // Check if all tests passed to set completed status
        const allPassed = testResult.results.every(result => result.passed);
        setIsCompleted(allPassed);
        
        // Save completed status for the current session
        if (allPassed) {
          const completedTests = JSON.parse(localStorage.getItem(`completed_tests_${sessionId}`) || '[]');
          if (!completedTests.includes(testData.id)) {
            completedTests.push(testData.id);
            localStorage.setItem(`completed_tests_${sessionId}`, JSON.stringify(completedTests));
          }
        }
      } else {
        setResults(null);
        setError(testResult.error);
        setIsCompleted(false);
      }
      setIsRunning(false);
    }, 300);
  };

  const fetchAdjacentTestIds = async () => {
    try {
      const { getTests } = await import('@/data/tests');
      const allTests = getTests();
      
      // Find current test index
      const currentIndex = allTests.findIndex((test: TestData) => test.id === testData.id);
      
      // Set next test ID if it exists
      if (currentIndex >= 0 && currentIndex < allTests.length - 1) {
        setNextTestId(allTests[currentIndex + 1].id);
      } else {
        setNextTestId(null);
      }
      
      // Set previous test ID if it exists
      if (currentIndex > 0) {
        setPrevTestId(allTests[currentIndex - 1].id);
      } else {
        setPrevTestId(null);
      }
    } catch (error) {
      console.error("Error fetching test IDs:", error);
      setNextTestId(null);
      setPrevTestId(null);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  const toggleSolutions = () => {
    if (!showSolutions) {
      // Only show confirmation dialog if the challenge isn't completed yet
      if (!isCompleted) {
        setIsConfirmOpen(true);
      } else {
        // Challenge is already completed, so show solutions directly
        setShowSolutions(true);
      }
    } else {
      // When hiding solutions, no confirmation needed
      setShowSolutions(false);
    }
  };

  const handleConfirmSolutions = () => {
    setIsConfirmOpen(false);
    setShowSolutions(true);
  };

  const applySolution = (solutionCode: string) => {
    setCode(solutionCode);
    setShowSolutions(false);
  };

  const resetCode = () => {
    setCode(testData.initialCode);
    localStorage.removeItem(`code_${testData.id}`);
  };

  const refreshPage = () => {
    // Generate a new session ID to reset the completed status
    setSessionId(Date.now().toString());
    
    // Reset the completed status
    setIsCompleted(false);
    setResults(null);
    
    // Reset any completion data for this test
    localStorage.removeItem(`completed_tests_${sessionId}`);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Challenge</h3>
              <p className="text-gray-500 text-center">Preparing your coding environment</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-800 text-white p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{testData.title}</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-300">EN</span>
              <Switch
                checked={language === 'ru'}
                onChange={toggleLanguage}
                className={`${
                  language === 'ru' ? 'bg-blue-600' : 'bg-gray-500'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
              >
                <span className="sr-only">Toggle language</span>
                <span
                  className={`${
                    language === 'ru' ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
              <span className="text-sm text-gray-300">RU</span>

            </div>
          </div>
          
          <div className="mt-4">
            <h2 className="text-xl font-medium mb-2">
              {testData.description[language].title}
            </h2>
            <p className="text-gray-300 whitespace-pre-line">
              {testData.description[language].body}
            </p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex space-x-2">
                {prevTestId && (
                  <Link 
                    href={`/test/${prevTestId}`}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors flex items-center text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Previous Challenge</span>
                  </Link>
                )}
                {nextTestId && isCompleted && (
                  <Link 
                    href={`/test/${nextTestId}`}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors flex items-center text-sm"
                  >
                    <span>Next Challenge</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={refreshPage}
                  className="px-3 cursor-pointer py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Status
                </button>
                <button
                  onClick={resetCode}
                  className="px-3 py-1 text-xs bg-gray-200 cursor-pointer text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Reset Code
                </button>
              </div>
            </div>
            <CodeEditor 
              initialCode={code} 
              onChange={setCode}
              onRunTests={runTest}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <button
                onClick={runTest}
                disabled={isRunning}
                className={`px-4 py-2 bg-[#00a2ed] text-white rounded hover:bg-[#0090d3] focus:outline-none focus:ring-2 focus:ring-[#00aeff] focus:ring-opacity-50 transition-colors ${
                  isRunning ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isRunning ? (
                  <span className="flex items-center cursor-pointer">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Running Tests...
                  </span>
                ) : (
                  'Run Tests'
                )}
              </button>
              
              {testData.solutions && testData.solutions.length > 0 && (
                <button
                  onClick={toggleSolutions}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
                >
                  {showSolutions ? 'Hide Solutions' : 'Show Solutions'}
                </button>
              )}
              
              {isCompleted && nextTestId && (
                <Link 
                  href={`/test/${nextTestId}`}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors flex items-center"
                >
                  <span>Next Challenge</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
            
            <div className="text-sm text-gray-500">
              Press Ctrl+Enter or Cmd+Enter to run tests
            </div>
          </div>

          {isCompleted && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-lg font-medium text-green-800">Challenge Completed!</h3>
              </div>
              {nextTestId ? (
                <p className="mt-1 text-green-700">You&apos;ve solved this challenge successfully. Ready for the next one?</p>
              ) : (
                <p className="mt-1 text-green-700">Congratulations! You&apos;ve completed all available challenges.</p>
              )}
            </div>
          )}

          {showSolutions && testData.solutions && (
            <div className="mt-4 border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-medium mb-3 text-gray-900">Solutions</h3>
              <div className="space-y-4">
                {testData.solutions.map((solution, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-white">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{solution.title}</h4>
                      <button
                        onClick={() => applySolution(solution.code)}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                      >
                        Apply Solution
                      </button>
                    </div>
                    {solution.description && (
                      <p className="text-sm text-gray-600 mb-2">{solution.description}</p>
                    )}
                    <pre className="bg-gray-900 p-2 text-blue-200 rounded text-md overflow-x-auto">{solution.code}</pre>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <TestResults results={results} error={error} />
        </div>
      </div>

      {/* Confirmation Dialog for showing solutions */}
      <Transition appear show={isConfirmOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsConfirmOpen(false)}>
          <Transition
            show={isConfirmOpen}
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-80" />
          </Transition>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition
                show={isConfirmOpen}
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Show Solutions?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You haven&apos;t completed this challenge yet. Are you sure you want to see the solutions? Try solving it on your own first!
                    </p>
                  </div>

                  <div className="mt-4 flex space-x-3 justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border cursor-pointer border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={() => setIsConfirmOpen(false)}
                    >
                      No, I&apos;ll keep trying
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border cursor-pointer border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleConfirmSolutions}
                    >
                      Yes, show solutions
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
} 