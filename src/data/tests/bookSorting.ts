export const bookSortingTest = {
  id: "book-sorting",
  title: "Task 1: Book Sorting",
  description: {
    en: {
      title: "Create a function that sorts books by page count in ascending order.",
      body: `You are given an array of books, where each book is an object 
with two properties: title and pages. Create a function that takes 
an array of books as an argument and returns an array of books 
sorted by page count in ascending order.

Example:
sortBooksByPages([
  { title: "JavaScript Guide", pages: 350 }, 
  { title: "HTML Basics", pages: 120 }
]) 

// Should return:
[
  { title: "HTML Basics", pages: 120 },
  { title: "JavaScript Guide", pages: 350 }
]`
    },
    ru: {
      title: "Создай функцию, которая сортирует книги по количеству страниц в порядке возрастания.",
      body: `Тебе предоставлен массив книг, где каждая книга является 
объектом с двумя свойствами: название (title) и количество страниц (pages). 
Создай функцию, которая принимает массив книг в качестве аргумента 
и возвращает объекты книг, отсортированные по количеству страниц в порядке возрастания.

Пример:
sortBooksByPages([
  { title: "JavaScript Guide", pages: 350 }, 
  { title: "HTML Basics", pages: 120 }
]) 

// Должно вернуть:
[
  { title: "HTML Basics", pages: 120 },
  { title: "JavaScript Guide", pages: 350 }
]`
    }
  },
  initialCode: 'function sortBooksByPages(books) {\n    // Your code here\n}',
  functionName: 'sortBooksByPages',
  testCases: [
    {
      input: [
        [
          { title: "JavaScript Guide", pages: 350 }, 
          { title: "HTML Basics", pages: 120 }
        ]
      ],
      expected: [
        { title: "HTML Basics", pages: 120 },
        { title: "JavaScript Guide", pages: 350 }
      ]
    },
    {
      input: [
        [
          { title: "Game of Thrones", pages: 694 },
          { title: "The Hobbit", pages: 310 },
          { title: "Harry Potter", pages: 450 }
        ]
      ],
      expected: [
        { title: "The Hobbit", pages: 310 },
        { title: "Harry Potter", pages: 450 },
        { title: "Game of Thrones", pages: 694 }
      ]
    },
    {
      input: [
        [
          { title: "Python for Beginners", pages: 280 },
          { title: "Programming Fundamentals", pages: 540 },
          { title: "Data Structures", pages: 350 },
          { title: "Algorithms Handbook", pages: 420 }
        ]
      ],
      expected: [
        { title: "Python for Beginners", pages: 280 },
        { title: "Data Structures", pages: 350 },
        { title: "Algorithms Handbook", pages: 420 },
        { title: "Programming Fundamentals", pages: 540 }
      ]
    }
  ],
  solutions: [
    {
      title: "Using Array sort() method with comparison function",
      code: `function sortBooksByPages(books) {
  return books.sort((a, b) => a.pages - b.pages);
}`,
      description: "This solution uses JavaScript's built-in sort method with a comparison function that subtracts the page count of book a from book b."
    },
    {
      title: "Using spread operator to avoid mutating original array",
      code: `function sortBooksByPages(books) {
  return [...books].sort((a, b) => a.pages - b.pages);
}`,
      description: "This solution creates a copy of the original array using the spread operator before sorting to avoid mutating the input array."
    }
  ]
}; 