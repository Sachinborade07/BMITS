// Callback Functions with map(), filter(), and **reduce()
// Task: Create a processData function that accepts an array of numbers and a callback.
// If the callback is filterOdd, filter out even numbers.
// If the callback is doubleNumbers, double each number.
// If the callback is calculateSum, return the sum of all numbers. Bonus Task: Implement a callback to find the maximum number in the array.


const filterOdd = numbers => numbers.filter(num => num % 2 !== 0);

const doubleNumbers = numbers => numbers.map(num => num * 2);

const calculateSum = numbers => numbers.reduce((sum, num) => sum + num, 0);

const findMax = numbers => Math.max(...numbers);

function doOperation(numbers, callback) {
    return callback(numbers);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log("Odd Numbers:-", doOperation(numbers, filterOdd));
console.log("Double Of Numbers:-", doOperation(numbers, doubleNumbers));
console.log("Calculating the Sum:-", calculateSum(numbers, calculateSum));
console.log("Maximum Element:-", doOperation(numbers, findMax));

/*
Odd Numbers:- [ 1, 3, 5, 7, 9 ]
Double Of Numbers:- [
   2,  4,  6,  8, 10,
  12, 14, 16, 18
]
Calculating the Sum:- 45
Maximum Element:- 9

*/