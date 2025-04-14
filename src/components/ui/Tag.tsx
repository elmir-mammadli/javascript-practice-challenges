'use client';

import { ReactNode } from 'react';

type TagColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink';

interface TagProps {
  children: ReactNode;
  color?: TagColor;
  className?: string;
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  green: 'bg-green-100 text-green-800 border-green-200',
  red: 'bg-red-100 text-red-800 border-red-200',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  purple: 'bg-purple-100 text-purple-800 border-purple-200',
  pink: 'bg-pink-100 text-pink-800 border-pink-200'
};

export default function Tag({ children, color = 'blue', className = '' }: TagProps) {
  return (
    <span 
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  );
} 