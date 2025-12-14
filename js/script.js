'use strict';
const numbers = [16, -37, 54, -4, 72, -56, 47, 4, -16, 25, -37, 46, 4, -51, 27, -63, 4, -54, 76, -4, 12, -35, 4, 47];
console.log("Array:", numbers);


console.log("Sum and count of positive elements")
const positiveElements = numbers.filter(x => x > 0);
const sumPositiveElements = positiveElements.reduce((acc, x) => acc + x, 0);
const countPositiveElements = positiveElements.length;
console.log(sumPositiveElements);
console.log(countPositiveElements);


console.log("Min element and index of min element");
let minElement = numbers[0];
for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < minElement) {
        minElement = numbers[i];
    }
}
console.log(minElement);
const indexMinElement = numbers.indexOf(minElement);
console.log(indexMinElement);


console.log("Max element and index of max element");
let maxElement = numbers[0];
for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > maxElement) {
        maxElement = numbers[i];
    }
}
console.log(maxElement);
const indexMaxElement = numbers.indexOf(maxElement);
console.log(indexMaxElement);


console.log("Count of negative elements");
const negativeElements = numbers.filter(x => x < 0);
const countNegativeElements = negativeElements.length;
console.log(countNegativeElements);


console.log("Count of positive and unpaired elements");
const positiveUnpairedElements = positiveElements.filter(x => x % 2 !== 0);
const countPositiveUnpairedElements = positiveUnpairedElements.length;
console.log(countPositiveUnpairedElements);


console.log("Count of positive and paired elements");
const positivePairedElements = positiveElements.filter(x => x % 2 === 0);
const countPositivePairedElements = positivePairedElements.length;
console.log(countPositivePairedElements);


console.log("Sum of positive and paired elements");
const sumPositivePairedElements = positivePairedElements.reduce((acc, x) => acc + x, 0);
console.log(sumPositivePairedElements);


console.log("Sum of positive and unpaired elements");
const sumPositiveUnpairedElements = positiveUnpairedElements.reduce((acc, x) => acc + x, 0);
console.log(sumPositiveUnpairedElements);


console.log("Product of positive elements");
const productPositiveElements = positiveElements.reduce((acc, x) => acc * x, 1);
console.log(productPositiveElements);


console.log("Zeroing of elements except the maximum element")
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] !== maxElement) {
        numbers[i] = 0;
    }
}
console.log(numbers);
