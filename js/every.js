'use strict';
console.log("every");

/**
 * Checks if all elements in an array pass the test implemented by the provided callback function.
 *
 * @param {Array} arr - The array to check.
 * @param {function} callback - Function to test each element of the array. Receives three arguments:
 *                              1. element (any) — The current element being processed.
 *                              2. index (number) — The index of the current element.
 *                              3. array (Array) — The array `every` was called upon.
 *                              Should return true if the element passes the test, otherwise false.
 * @returns {boolean} Returns true if all elements pass the test, otherwise false.
 */

const every = (arr, callback) => {
    for (let i = 0; i < arr.length; i += 1) {
        if (!callback(arr[i], i, arr)) {
            return false;
        }
    }
    return true;
};
const everyNumbers = every(numbers, (item) => item % 2 === 0);
console.log(everyNumbers);
const everyFruits = every(fruits, (item) => typeof item === 'string');
console.log(everyFruits);