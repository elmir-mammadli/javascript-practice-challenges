export const pineappleCountTest = {
  id: "pineapple-count",
  title: "Task 2: Find the Amount of Pineapples",
  description: {
    en: {
      title: "Create a function to return the amount of pineapples there are in a string.",
      body: `Create a function that counts and returns the number of times "pineapple" appears in a string.

Examples:
pineapples("pineapple") ➞ 1

pineapples("pineapplepineapple") ➞ 2

pineapples("pineappleapple") ➞ 1

Notes:
The function should count overlapping occurrences as separate instances.`
    },
    ru: {
      title: "Создай функцию, возвращающую количество ананасов в строке.",
      body: `Создай функцию, которая подсчитывает и возвращает количество раз, когда "pineapple" встречается в строке.

Примеры:
pineapples("pineapple") ➞ 1

pineapples("pineapplepineapple") ➞ 2

pineapples("pineappleapple") ➞ 1

Примечания:
Функция должна считать перекрывающиеся вхождения как отдельные экземпляры.`
    }
  },
  initialCode: 'function pineapples(str) {\n  // Your code here\n}',
  functionName: 'pineapples',
  testCases: [
    {
      input: ["pineapple"],
      expected: 1
    },
    {
      input: ["pineapplepineapplecherry"],
      expected: 2
    },
    {
      input: ["pineapplepineapplepineappleorange"],
      expected: 3
    },
    {
      input: ["pineapplepineapplebananapineapplepineapple"],
      expected: 4
    },
    {
      input: ["pineapplepineapplemangopineapplepineapplepineapple"],
      expected: 5
    },
    {
      input: ["pineapplecucumberpineapplepineapplepineapplepineapplepineapple"],
      expected: 6
    }
    
  ],
  solutions: [
    {
      title: "Using String Split Method",
      code: `function pineapples(str) {
  return str.split("pineapple").length - 1;
}`,
      description: "This solution uses the split method to count the number of occurrences. The split method divides the string into an array of substrings at each occurrence of 'pineapple', resulting in an array with a length that is one more than the count of occurrences."
    },
    {
      title: "Using Regular Expression",
      code: `function pineapples(str) {
  const matches = str.match(/pineapple/g);
  return matches ? matches.length : 0;
}`,
      description: "This solution uses a regular expression with the global flag to find all occurrences of 'pineapple' in the string. The match method returns an array of matches, and we return the length of this array (or 0 if no matches are found)."
    }
//     {
//       title: "Using Loop and IndexOf",
//       code: `function pineapples(str) {
//   let count = 0;
//   let position = 0;
  
//   while (true) {
//     position = str.indexOf("pineapple", position);
//     if (position === -1) break;
    
//     count++;
//     position += 1; // Move past the current match to find the next one
//   }
  
//   return count;
// }`,
//       description: "This solution uses a loop with the indexOf method to find each occurrence. After finding an occurrence, it updates the position to search from the next character to find overlapping matches."
//     }
  ]
}; 