export const lessThan99Test = {
  id: "less-than-99",
  title: "Task 4: Less Than 99",
  description: {
    en: {
      title: "Given two numbers, return true if the sum of both numbers is less than 99. Otherwise return false.",
      body: `Create a function that checks if the sum of two numbers is less than 99.

Examples:
lessThan99(22, 15) ➞ true
// 22 + 15 = 37

lessThan99(83, 34) ➞ false
// 83 + 34 = 117

lessThan99(3, 77) ➞ true

Notes:
N/A`
    },
    ru: {
      title: "Учитывая два числа, верните true, если сумма обоих чисел меньше 99. В противном случае верните false.",
      body: `Создайте функцию, которая проверяет, является ли сумма двух чисел меньше 99.

Примеры:
lessThan99(22, 15) ➞ true
// 22 + 15 = 37

lessThan99(83, 34) ➞ false
// 83 + 34 = 117

lessThan99(3, 77) ➞ true

Примечания:
Никаких особых примечаний`
    }
  },
  initialCode: 'function lessThan99(a, b) {\n  // Your code here\n}',
  functionName: 'lessThan99',
  testCases: [
    {
      input: [5, 57],
      expected: true
    },
    {
      input: [77, 30],
      expected: false
    },
    {
      input: [0, 59],
      expected: true
    },
    {
      input: [78, 35],
      expected: false
    },
    {
      input: [63, 11],
      expected: true
    },
    {
      input: [37, 99],
      expected: false
    },
    {
      input: [52, 11],
      expected: true
    },
    {
      input: [82, 95],
      expected: false
    },
    {
      input: [17, 44],
      expected: true
    },
    {
      input: [74, 53],
      expected: false
    },
  ],
  solutions: [
    {
      title: "Using Simple Addition and Comparison",
      code: `function lessThan99(a, b) {
  return a + b < 99;
}`,
      description: "This solution adds the two numbers and checks if their sum is less than 99."
    },
    {
      title: "Using Arrow Function",
      code: `function lessThan99(a, b) {
  return (a + b) < 99 ? true : false;
}`,
      description: "This solution uses a ternary operator to explicitly return true or false based on whether the sum is less than 99."
    },
    {
      title: "Using Variable for Better Readability",
      code: `function lessThan99(a, b) {
  const sum = a + b;
  return sum < 99;
}`,
      description: "This solution creates a variable to store the sum, making the code more readable and easier to understand."
    }
  ]
}; 