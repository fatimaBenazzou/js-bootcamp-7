// * CircleMetrics
// const PI = 3.14159;

// const r = Number(prompt("Enter the radius of the circle: "));

// const area = PI * r * r;
// const perimeter = 2 * PI * r;

// console.log("Area = " + area + " and Perimeter = " + perimeter);

// * CelsiusToFahrenheit

/* const c = Number(prompt("Enter the temprature in celsius: "));

const fahrenheit = (c * 9) / 5 + 32;

console.log("Fehrenheit = " + fahrenheit);
*/

// * PriceWithTax
/* const TAX_RATE = 0.19;

const basePrice = Number(prompt("Enter the price of the product: "));
const tax = basePrice * TAX_RATE;
const total = basePrice + tax;

console.log("Tax amount: " + tax);
console.log("Total price: " + total);
*/

//  * CheckEvenOrOdd
/* const num = Number(prompt("Enter a number: "));
if (num % 2 == 0) {
  console.log(num + " is even");
} else {
  console.log(num + " is odd");
}
 */

// * FindMaximum

/* 
const num1 = Number(prompt("Enter number 1: "));
const num2 = Number(prompt("Enter number 2: "));

if (num1 > num2) {
    console.log(num1 + " is the max");
    } else {
        console.log(num2 + " is the max");
}
*/

// * TicketPrice
/* const age = Number(prompt("Enter your age: "));

if (age > 12 && age <= 25) {
  var hasStudentCard = prompt("Do you have a student card? yes or no");
  if (hasStudentCard == "yes") {
    hasStudentCard = true;
  } else {
    hasStudentCard = false;
  }
}

console.log(hasStudentCard);

var price;
if (age < 12) {
  price = 5;
} else if (age <= 25 && hasStudentCard) {
  price = 7;
} else if (age <= 60) {
  price = 10;
} else {
  price = 6;
}

console.log("Ticket price : " + price);
 */

//  * PrintOddNumbers
/* const start = Number(prompt("Enter the starting number: "));
const end = Number(prompt("Enter the ending number: "));

for (var index = start; index <= end; index++) {
  if (index % 2 != 0) console.log(index);
}
 */

//   * MysteryNumberGame

/* const mysteryNumber = Math.floor(Math.random() * 100) + 1;
var attempts = 5;
var userGuess;
console.log("Welcome to the Mystery Number Game!");
console.log("You have 5 chances to guess the number between 1 and 100.");

while (attempts > 0) {
  userGuess = Number(prompt("Enter your guess: "));

  if (userGuess == mysteryNumber) {
    console.log("Congratulations ! you guessed the mystery number.");
    break;
  } else if (userGuess < mysteryNumber) {
    console.log("Too low! Try again.");
  } else {
    console.log("Too high! Try again.");
  }

  attempts--;
}

if (userGuess != mysteryNumber) {
  console.log("Game over ! the mystery number is " + mysteryNumber);
}
 */

// const numbers = [15, 2, 6, 89, 25];

// const product = numbers.reduce((prod, val) => prod * val, 1);
// console.log(product);
// console.log(numbers);

// numbers.splice(1, 0, 10);
// console.log(numbers);

// numbers.splice(2, 1, 3);
// console.log(numbers);

// numbers.splice(2, 2);
// console.log(numbers);

/* const tab = [1, 2, [4, 5, ["q", ["r"]], true]];
console.log(tab);
console.log(tab.flat(3));
 */

/* function square(number) {
  return number * number;
}

const userInput = Number(prompt("Enter a number"));
console.log("The square of " + userInput + " is " + square(userInput));
 */

/* function toTitleCase(str) {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

console.log(toTitleCase("hello"));
console.log(toTitleCase("HELLO"));
console.log(toTitleCase(""));
 */

function findLongestWord(sentence) {
  const words = sentence.split(" ");
  var longest = "";

  for (const word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }

  return longest;
}

console.log(findLongestWord("Theqwertyui quick brown fox"));
