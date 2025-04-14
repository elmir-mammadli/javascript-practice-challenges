'use client';

import { useState, useEffect, useRef } from 'react';

interface CodeEditorProps {
  initialCode: string;
  onChange: (code: string) => void;
  onRunTests?: () => void;
}

export default function CodeEditor({ initialCode, onChange, onRunTests }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+Enter or Cmd+Enter
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && onRunTests) {
        e.preventDefault();
        onRunTests();
      }
    };

    // Add event listener to textarea
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('keydown', handleKeyDown);
    }

    // Clean up
    return () => {
      if (textarea) {
        textarea.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [onRunTests]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange(newCode);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex justify-between items-center">
        <span className="font-mono text-sm text-gray-700">JavaScript Code Editor</span>
        <span className="text-xs text-gray-500">Press Ctrl+Enter to run tests</span>
      </div>
      <textarea
        ref={textareaRef}
        className="w-full h-64 p-4 font-mono text-lg bg-gray-900 text-gray-100 focus:outline-none"
        value={code}
        onChange={handleChange}
        spellCheck="false"
      />
    </div>
  );
} 