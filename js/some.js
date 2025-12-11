'use strict';
console.log("some");

/**
 * Checks if at least one element in an array passes the test implemented by the provided callback function.
 *
 * @param {Array} arr - The array to check.
 * @param {function} callback - Function to test each element of the array. Receives three arguments:
 *                              1. element (any) — The current element being processed.
 *                              2. index (number) — The index of the current element.
 *                              3. array (Array) — The array `some` was called upon.
 *                              Should return true if the element passes the test.
 * @returns {boolean} Returns true if at least one element passes the test, otherwise false.
 */

const some = (arr, callback) => {
    for (let i = 0; i < arr.length; i += 1) {
        if (callback(arr[i], i, arr)) {
            return true;
        }
    }
    return false;
}
const someNumbers = some(numbers, (item) => item % 2 === 0);
console.log(someNumbers);
const someFruits = some(fruits, (item) => typeof item === 'string');
console.log(someFruits);