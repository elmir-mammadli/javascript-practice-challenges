import { TestData } from '@/types';

export const smallestAndBiggestTest: TestData = {
  id: "create-the-smallest-and-biggest",
  title: "Task 5: Find the Smallest and Biggest Numbers",
  tags: [
    {
      label: "NEW",
      color: "green"
    }
  ],
  description: {
    en: {
      title: "Create a function that takes an array of numbers and return both the minimum and maximum numbers, in that order.",
      body: `Create a function that takes an array of numbers and return both the minimum and maximum numbers, in that order.

Examples:
minMax([1, 2, 3, 4, 5]) ➞ [1, 5]

minMax([2334454, 5]) ➞ [5, 2334454]

minMax([1]) ➞ [1, 1]

Notes:
All test arrays will have at least one element and are valid.`
    },
    ru: {
      title: "Создайте функцию, которая принимает массив чисел и возвращает как минимальное, так и максимальное число, в этом порядке.",
      body: `Создайте функцию, которая принимает массив чисел и возвращает как минимальное, так и максимальное число, в этом порядке.

Примеры:
minMax([1, 2, 3, 4, 5]) ➞ [1, 5]

minMax([2334454, 5]) ➞ [5, 2334454]

minMax([1]) ➞ [1, 1]

Примечания:
Все тестовые массивы будут иметь хотя бы один элемент и являются допустимыми.`
    }
  },
  initialCode: 'function minMax(arr) {\n\ // Your code here\n}',
  functionName: 'minMax',
  testCases: [
    {
      input: [[14, 35, 6, 1, 34, 54]],
      expected: [1, 54]
    },
    {
      input: [[1.346, 1.6532, 1.8734, 1.8723]],
      expected: [1.346, 1.8734]
    },
    {
      input: [[0.432, 0.874, 0.523, 0.984, 0.327, 0.2345]],
      expected: [0.2345, 0.984]
    },
    {
      input: [[13, 72, 98, 43, 24, 65, 31]],
      expected: [13, 98]
    },
    {
      input: [[-54, -23, -54, -21]],
      expected: [-54, -21]
    },
    {
      input: [[-0.473, -0.6834, -0.1287, 0.5632]],
      expected: [-0.6834, 0.5632]
    },
    {
      input: [[0, 0, 0, 0]],
      expected: [0, 0]
    }
  ],
  resources: [
    {
      title: "JavaScript Math.min()",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min",
      description: "Documentation on the Math.min() method which returns the lowest-valued number in a list of arguments."
    },
    {
      title: "JavaScript Math.max()",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max",
      description: "Documentation on the Math.max() method which returns the largest of the numbers given as input parameters."
    },
    {
      title: "JavaScript Spread Syntax (...)",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax",
      description: "Learn about the spread syntax which allows an iterable to be expanded in places where zero or more arguments are expected."
    },
    {
      title: "JavaScript Arrays",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
      description: "Comprehensive documentation on JavaScript arrays and their methods."
    },
    {
      title: "JavaScript Array.sort() Method",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
      description: "Alternative approach: Learn how to sort an array which can be used to find minimum and maximum values."
    }
  ],
  solutions: [
    {
      title: "Using Math.min and Math.max with spread operator",
      code: `function minMax(arr) {
\treturn [Math.min(...arr), Math.max(...arr)]
}`,
      description: "This solution uses the spread operator to pass all array elements as individual arguments to Math.min and Math.max functions, which then return the minimum and maximum values."
    },
    {
      title: "Using Array sort method",
      code: `function minMax(arr) {
\tconst sortedArr = [...arr].sort((a, b) => a - b);
\treturn [sortedArr[0], sortedArr[sortedArr.length - 1]];
}`,
      description: "This solution creates a copy of the array using the spread operator, sorts it in ascending order, and then returns the first and last elements, which are the minimum and maximum values."
    },
    {
      title: "Using a loop to find min and max values",
      code: `function minMax(arr) {
\tlet min = arr[0];
\tlet max = arr[0];
\t
\tfor(let i = 1; i < arr.length; i++) {
\t\tif(arr[i] < min) min = arr[i];
\t\tif(arr[i] > max) max = arr[i];
\t}
\t
\treturn [min, max];
}`,
      description: "This solution loops through the array once, keeping track of the minimum and maximum values encountered so far, and returns them as an array."
    }
  ]
}; 