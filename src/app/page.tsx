import Link from 'next/link';
import { tests } from '@/data/tests';
import Tag from '@/components/ui/Tag';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            JavaScript Practice Tests
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Improve your JavaScript skills with interactive coding challenges
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white overflow-hidden shadow-md border border-gray-200 rounded-lg divide-y divide-gray-200">
            <div className="px-6 py-5 bg-gray-100 opacity-80">
              <h3 className="text-lg font-medium text-gray-900">Available Challenges</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {tests.map((test) => (
                <Link
                  key={test.id}
                  href={`/test/${test.id}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-6 py-4 flex items-center">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-gray-900 truncate">{test.title}</h4>
                        {test.tags && test.tags.map((tag, index) => (
                          <Tag key={index} color={tag.color || 'blue'}>
                            {tag.label}
                          </Tag>
                        ))}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{test.description.en.title}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
