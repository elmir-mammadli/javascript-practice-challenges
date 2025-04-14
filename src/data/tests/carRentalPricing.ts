export const carRentalPricingTest = {
  id: "car-rental-pricing",
  title: "Task 3: Car Rental Pricing",
  description: {
    en: {
      title: "Create a function that calculates the best rental option",
      body: `You're developing a car rental price calculator. For each car, you have different rental options 
with different prices and rental periods. Your task is to create a function that finds the best 
option (lowest price) for a given rental duration.

Each option has:
- 'plan': name of the rental plan
- 'dailyPrice': cost per day
- 'minDays': minimum days required for this plan
- 'discount': percentage discount applied after minDays (e.g., 10 means 10%)

Write a function that takes:
1. An array of pricing options
2. The number of days the customer wants to rent

Return the option with the lowest total price for the required days. If multiple plans have the
same lowest price, return the one that appears first in the array.

Example:
const options = [
  { plan: 'Basic', dailyPrice: 50, minDays: 1, discount: 0 },
  { plan: 'Weekly', dailyPrice: 45, minDays: 7, discount: 10 }
];

// For 3 days, Basic is cheaper
findBestRentalOption(options, 3)
=> { plan: 'Basic', totalPrice: 150, daysRented: 3 }

// For 10 days, Weekly is cheaper due to the discount
findBestRentalOption(options, 10)
=> { plan: 'Weekly', totalPrice: 405, daysRented: 10 }
`
    },
    ru: {
      title: "Создайте функцию для расчета лучшего варианта аренды автомобиля",
      body: `Вы разрабатываете калькулятор цен на аренду автомобилей. Для каждого автомобиля у вас есть 
различные варианты аренды с разными ценами и периодами аренды. Ваша задача - создать функцию, 
которая находит лучший вариант (с самой низкой ценой) для заданной продолжительности аренды.

Каждый вариант имеет:
- 'plan': название плана аренды
- 'dailyPrice': стоимость за день
- 'minDays': минимальное количество дней для этого плана
- 'discount': процентная скидка, применяемая после minDays (например, 10 означает 10%)

Напишите функцию, которая принимает:
1. Массив вариантов цен
2. Количество дней, на которые клиент хочет арендовать автомобиль

Верните вариант с самой низкой общей ценой за требуемые дни. Если несколько планов имеют 
одинаковую самую низкую цену, верните тот, который появляется первым в массиве.

Пример:
const options = [
  { plan: 'Basic', dailyPrice: 50, minDays: 1, discount: 0 },
  { plan: 'Weekly', dailyPrice: 45, minDays: 7, discount: 10 }
];

// Для 3 дней, Basic дешевле
findBestRentalOption(options, 3)
=> { plan: 'Basic', totalPrice: 150, daysRented: 3 }

// Для 10 дней, Weekly дешевле из-за скидки
findBestRentalOption(options, 10)
=> { plan: 'Weekly', totalPrice: 405, daysRented: 10 }
`
    }
  },
  initialCode: `function findBestRentalOption(options, days) {
  // Your code here
  // For each option, calculate the total price for the requested days
  // Return the option with the lowest total price
}`,
  functionName: 'findBestRentalOption',
  testCases: [
    {
      input: [
        [
          { plan: 'Basic', dailyPrice: 50, minDays: 1, discount: 0 },
          { plan: 'Weekly', dailyPrice: 45, minDays: 7, discount: 10 }
        ],
        3
      ],
      expected: { plan: 'Basic', totalPrice: 150, daysRented: 3 }
    },
    {
      input: [
        [
          { plan: 'Basic', dailyPrice: 50, minDays: 1, discount: 0 },
          { plan: 'Weekly', dailyPrice: 45, minDays: 7, discount: 10 }
        ],
        10
      ],
      expected: { plan: 'Weekly', totalPrice: 405, daysRented: 10 }
    },
    {
      input: [
        [
          { plan: 'Economy', dailyPrice: 40, minDays: 1, discount: 0 },
          { plan: 'Standard', dailyPrice: 60, minDays: 3, discount: 15 },
          { plan: 'Premium', dailyPrice: 80, minDays: 5, discount: 20 }
        ],
        2
      ],
      expected: { plan: 'Economy', totalPrice: 80, daysRented: 2 }
    },
    {
      input: [
        [
          { plan: 'Economy', dailyPrice: 40, minDays: 1, discount: 0 },
          { plan: 'Standard', dailyPrice: 60, minDays: 3, discount: 15 },
          { plan: 'Premium', dailyPrice: 80, minDays: 5, discount: 20 }
        ],
        5
      ],
      expected: { plan: 'Standard', totalPrice: 255, daysRented: 5 }
    },
    {
      input: [
        [
          { plan: 'Economy', dailyPrice: 40, minDays: 1, discount: 0 },
          { plan: 'Standard', dailyPrice: 60, minDays: 3, discount: 15 },
          { plan: 'Premium', dailyPrice: 80, minDays: 5, discount: 20 }
        ],
        8
      ],
      expected: { plan: 'Premium', totalPrice: 512, daysRented: 8 }
    }
  ],
  solutions: [
    {
      title: "Using map and reduce",
      code: `function findBestRentalOption(options, days) {
  // Calculate total price for each option
  const pricesWithPlans = options.map(option => {
    const { plan, dailyPrice, minDays, discount } = option;
    let totalPrice = 0;
    
    if (days >= minDays) {
      // Apply discount after minimum days
      totalPrice = dailyPrice * days * (1 - discount / 100);
    } else {
      // No discount if renting for less than minimum days
      totalPrice = dailyPrice * days;
    }
    
    return {
      plan,
      totalPrice: Math.round(totalPrice),
      daysRented: days
    };
  });
  
  // Find the option with the lowest price
  return pricesWithPlans.reduce((best, current) => {
    return current.totalPrice < best.totalPrice ? current : best;
  }, pricesWithPlans[0]);
}`,
      description: "This solution uses map to calculate the total price for each option and then reduce to find the option with the lowest price."
    },
    {
      title: "Using forEach with tracking variable",
      code: `function findBestRentalOption(options, days) {
  let bestOption = null;
  let lowestPrice = Infinity;
  
  options.forEach(option => {
    const { plan, dailyPrice, minDays, discount } = option;
    let totalPrice = 0;
    
    if (days >= minDays) {
      totalPrice = dailyPrice * days * (1 - discount / 100);
    } else {
      totalPrice = dailyPrice * days;
    }
    
    totalPrice = Math.round(totalPrice);
    
    if (totalPrice < lowestPrice) {
      lowestPrice = totalPrice;
      bestOption = {
        plan, 
        totalPrice,
        daysRented: days
      };
    }
  });
  
  return bestOption;
}`,
      description: "This solution uses a forEach loop with tracking variables to keep track of the best option while iterating through the options."
    }
  ]
}; 