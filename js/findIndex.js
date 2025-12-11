'use strict';
console.log("findIndex");

/**
 * Returns the index of the first element in an array that satisfies the provided testing function.
 *
 * @param {Array} arr - The array to search through.
 * @param {function} callback - Function to test each element of the array. Receives three arguments:
 *                              1. element (any) — The current element being processed.
 *                              2. index (number) — The index of the current element.
 *                              3. array (Array) — The array `findIndex` was called upon.
 *                              Should return true if the element satisfies the condition.
 * @returns {number} The index of the first element that passes the test. Returns -1 if no element passes the test.
 */

const findIndex = (arr, callback) => {
    for (let i = 0; i < arr.length; i += 1) {
        if (callback(arr[i], i, arr)){
            return i;
        }
    }
    return -1;
}
const findIndexNumbers = findIndex(numbers, (item) => item % 2 === 0);
console.log(findIndexNumbers);
const findIndexFruits = findIndex(fruits, (item) => typeof item === 'string');
console.log(findIndexFruits);