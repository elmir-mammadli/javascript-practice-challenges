import { TestData } from '@/types';

export const countConsonantsTest: TestData = {
  id: "how-many-consonants",
  title: "Task 6: How Many Consonants?",
  tags: [
    {
      label: "NEW",
      color: "green"
    }
  ],
  description: {
    en: {
      title: "Create a function that takes a string and returns the number (count) of consonants contained within it.",
      body: `Create a function that takes a string and returns the number (count) of consonants contained within it.

Examples:
countConsonants("Celebration") ➞ 6

countConsonants("Palm") ➞ 3

countConsonants("Prediction") ➞ 6

Notes:
Consonants are all letters except the vowels: a, e, i, o, u.
All test cases are one word and only contain letters.`
    },
    ru: {
      title: "Создайте функцию, которая принимает строку и возвращает количество согласных в ней.",
      body: `Создайте функцию, которая принимает строку и возвращает количество согласных в ней.

Примеры:
countConsonants("Celebration") ➞ 6

countConsonants("Palm") ➞ 3

countConsonants("Prediction") ➞ 6

Примечания:
Согласные - это все буквы, кроме гласных: a, e, i, o, u.
Все тестовые примеры представляют собой одно слово и содержат только буквы.`
    }
  },
  initialCode: 'function countConsonants(str) {\n\t// Your code here\n}',
  functionName: 'countConsonants',
  testCases: [
    {
      input: ["Celebration"],
      expected: 6
    },
    {
      input: ["Palm"],
      expected: 3
    },
    {
      input: ["Prediction"],
      expected: 6
    },
    {
      input: ["Suite"],
      expected: 2
    },
    {
      input: ["Quote"],
      expected: 2
    },
    {
      input: ["Portrait"],
      expected: 5
    },
    {
      input: ["Steam"],
      expected: 3
    },
    {
      input: ["Tape"],
      expected: 2
    },
    {
      input: ["Nightmare"],
      expected: 5
    },
    {
      input: ["Convention"],
      expected: 6
    }
  ],
  solutions: [
    {
      title: "Using Regular Expression",
      code: `function countConsonants(str) {
\tconst matches = str.match(/[bcdfghjklmnpqrstvwxyz]/gi);
\treturn matches ? matches.length : 0;
}`,
      description: "This solution uses a regular expression to find all consonants in the string and returns the count."
    },
    {
      title: "Using Loop and Includes Method",
      code: `function countConsonants(str) {
\tconst vowels = ['a', 'e', 'i', 'o', 'u'];
\tlet count = 0;
\t
\tfor (let char of str.toLowerCase()) {
\t\tif (char >= 'a' && char <= 'z' && !vowels.includes(char)) {
\t\t\tcount++;
\t\t}
\t}
\t
\treturn count;
}`,
      description: "This solution loops through each character in the string, checks if it's a letter and not a vowel, and increments a counter."
    },
    {
      title: "Using Split and Filter",
      code: `function countConsonants(str) {
\treturn str.toLowerCase().split('').filter(char => 
\t\tchar >= 'a' && char <= 'z' && !'aeiou'.includes(char)
\t).length;
}`,
      description: "This solution splits the string into an array of characters, filters to keep only consonants, and returns the length of the resulting array."
    }
  ]
}; 