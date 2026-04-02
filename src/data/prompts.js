// src/data/prompts.js

export const promptPool =[
  "What is 5 feet and 9 inches in cm?",
  "If I waste 2 hours a day scrolling, how many days a year is that?",
  "What is a 20% growth on 34, then a 34% growth on that?",
  "What is the sum of 50% of 63323 + 29% of 55 + number of planets in our solar system?",
  "How many minutes are in a leap year?",
  "What is the compound interest on $5,000 at 4.5% for 7 years?",
  "If I drive at 65 mph for 3.5 hours, how far do I go in kilometers?",
  "Convert 72 degrees Fahrenheit to Celsius and Kelvin.",
  "What is the square root of 144 multiplied by the cube of 3?",
  "If a recipe calls for 3/4 cup of sugar for 12 cookies, how much for 30 cookies?",
  "Calculate the area of a circle with a diameter of 14 inches.",
  "If I earn $65,000 a year, how much do I make per working hour? (Assuming 40hr weeks)",
  "What is 15% of $89.99 plus a 7% sales tax on the total?",
  "How many seconds have passed since the year 2000 started?",
  "Solve for x: 3x + 15 = 45"
];

// Helper function to get 3 random prompts
export function getRandomPrompts(count = 3) {
  const shuffled = [...promptPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}