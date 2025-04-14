'use client';

import { useState, useEffect } from 'react';
import Editor, { OnMount, loader } from '@monaco-editor/react';

// Pre-configure Monaco with TypeScript definitions that could help with autocomplete
loader.init().then(monaco => {
  // TYPESCRIPT TYPE CHECKING: TO ENABLE TYPE CHECKING, REMOVE OR COMMENT OUT THIS BLOCK
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: false, // Keep basic syntax validation
    noSuggestionDiagnostics: true,
    diagnosticCodesToIgnore: [2304, 2552, 2580, 2551, 2339] // Common type errors
  });

  // Add TypeScript definitions for common JavaScript functions and methods
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    typeRoots: ["node_modules/@types"],
    // TYPESCRIPT TYPE CHECKING: TO ENABLE TYPE CHECKING, REMOVE OR SET THESE OPTIONS TO FALSE
    noSemanticValidation: true,
    noSyntaxValidation: false, // Keep syntax validation
  });
  
  // Add some common DOM types
  const libSource = `
    interface Array<T> {
      map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
      filter(predicate: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[];
      reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
      forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
      find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T | undefined;
      some(predicate: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
      every(predicate: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
      sort(compareFn?: (a: T, b: T) => number): this;
      join(separator?: string): string;
    }
    
    interface String {
      split(separator: string | RegExp, limit?: number): string[];
      match(regexp: RegExp): RegExpMatchArray | null;
      replace(searchValue: string | RegExp, replaceValue: string): string;
      trim(): string;
      toLowerCase(): string;
      toUpperCase(): string;
    }
  `;
  
  monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, 'ts:filename/global.d.ts');
});

interface CodeEditorProps {
  initialCode: string;
  onChange: (code: string) => void;
  onRunTests?: () => void;
}

export default function CodeEditor({ initialCode, onChange, onRunTests }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleEditorWillMount = () => {
    // TYPESCRIPT TYPE CHECKING: TO ENABLE VALIDATION, REMOVE THIS FUNCTION OR RETURN EMPTY OBJECT
    return {
      javascript: {
        validate: {
          enable: false // Disable validation completely
        }
      }
    };
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    setIsLoading(false);
    
    // Add keyboard shortcut for running tests
    editor.addAction({
      id: 'run-tests',
      label: 'Run Tests',
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter
      ],
      run: () => {
        if (onRunTests) {
          onRunTests();
        }
      }
    });
    
    // Focus the editor when it's mounted
    editor.focus();
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      onChange(value);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex justify-between items-center">
        <span className="text-sm text-gray-700">JavaScript Code Editor</span>
        <span className="text-xs text-gray-500">Press Ctrl+Enter or Cmd+Enter to run tests</span>
      </div>
      <div className="h-72 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={code}
          value={code}
          onChange={handleEditorChange}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          loading={<div className="flex items-center justify-center h-full">Loading editor...</div>}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontFamily: "var(--font-space-grotesk), monospace",
            padding: { top: 24, bottom: 10 },
            fontSize: 18,
            tabSize: 2,
            automaticLayout: true,
            wordWrap: "on",
            formatOnPaste: true,
            formatOnType: true,
            snippetSuggestions: 'inline',
            // TYPESCRIPT TYPE CHECKING: TO ENABLE ERROR MARKERS, REMOVE OR COMMENT OUT THESE OPTIONS
            renderValidationDecorations: "off",
            parameterHints: { enabled: false },
            // Keep code suggestions enabled
            suggest: {
              showMethods: true,
              showFunctions: true,
              showConstructors: true,
              showFields: true,
              showVariables: true,
              showClasses: true,
              showStructs: true,
              showInterfaces: true,
              showModules: true,
              showProperties: true,
              showEvents: true,
              showOperators: true,
              showUnits: true,
              showValues: true,
              showConstants: true,
              showEnums: true,
              showEnumMembers: true,
              showKeywords: true,
              showWords: true,
              showColors: true,
              showFiles: true,
              showReferences: true,
              showFolders: true,
              showTypeParameters: true,
              showIssues: true,
              showUsers: true,
              showSnippets: true
            }
          }}
        />
      </div>
    </div>
  );
} 