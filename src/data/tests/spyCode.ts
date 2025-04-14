export const spyCodeTest = {
    id: "spy-code",
    title: "Task 2: Spy Code",
    description: {
      en: {
        title: "Can You Read the Spy Code?",
        body: `A spy has left a message for their contact. But to protect it, the message is scattered among capital letters. Your mission is to decode it by reading only the lowercase letters.
  
  Rules:
  - The real message is hidden using lowercase letters.
  - All other characters are uppercase and should be ignored.
  - The order of the lowercase letters reveals the secret message.
  
  Examples:
  decodeSpy("WaDF!p@#pVGlFGe") ➞ "apple"
  decodeSpy("ZXCbSDaWE!nDF?aVGnSAa") ➞ "banana"
  
  Hint: You only need to extract all the lowercase letters in order.`
      },
      ru: {
        title: "Можешь ли ты прочитать шпионский код?",
        body: `Шпион оставил сообщение для своего контакта. Чтобы защитить его, он разбросал буквы сообщения среди заглавных букв. Твоя задача — расшифровать сообщение, прочитав только строчные буквы.
  
  Правила:
  - Сообщение написано строчными буквами.
  - Остальные символы — заглавные и не несут смысла.
  - Порядок строчных букв сохраняет сообщение.
  
  Примеры:
  decodeSpy("WaDFppVGlFGe") ➞ "apple"
  decodeSpy("ZXCbSDaWEnDFaVGnSAa") ➞ "banana"

  
  Подсказка: Просто извлеки все строчные буквы по порядку.`
      }
    },
    initialCode: 'function decodeSpy(str) {\n    // Extract and return all lowercase letters from the string\n}',
    functionName: 'decodeSpy',
    testCases: [
      { input: ["QWaZYnBHNyCaAPSD"], expected: "anya" },
      { input: ["GHiSDsQ"], expected: "is" },
      { input: ["IOaZR"], expected: "a" },
      { input: ["WEvXeHrQyP"], expected: "very" },
      { input: ["ZhSSaGYrZdBwLoArXFGkQWiQWnDgQE"], expected: "hardworking" },
      { input: ["ZVBEfXRrXoZWnQWtZXeXVnASdOS"], expected: "frontend" },
      { input: ["SFdSeWvAVeZHlQWoERpJHeDFrXXZ"], expected: "developer" }
    ],
    solutions: [
      {
        title: "Using Character Range Check",
        code: `function decodeSpy(str) {
  return str.split("").filter(c => c >= "a" && c <= "z").join("");
}`,
        description: "This solution compares each character with 'a' and 'z' to check if it's a lowercase letter."
      },
      {
        title: "Using Regular Expression",
        code: `function decodeSpy(str) {
  return str.match(/[a-z]/g).join("");
}`,
        description: "This solution uses a regular expression to extract all lowercase letters from the string."
      }
    ]
  };
  