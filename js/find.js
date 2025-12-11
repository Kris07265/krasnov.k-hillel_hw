'use strict';
console.log("find");

/**
 * Returns the first element in an array that satisfies the provided testing function.
 *
 * @param {Array} arr - The array to search through.
 * @param {function} callback - Function to test each element of the array. Receives three arguments:
 *                              1. element (any) — The current element being processed.
 *                              2. index (number) — The index of the current element.
 *                              3. array (Array) — The array `find` was called upon.
 *                              Should return true if the element satisfies the condition.
 * @returns {*} The first element in the array that passes the test. Returns `undefined` if no element passes the test.
 */

const find = (arr, callback) => {
    for (let i = 0; i < arr.length; i += 1) {
        if (callback(arr[i], i, arr)){
            return arr[i];
        }
    }
    return undefined;
}
const findNumbers = find(numbers, (item) => item % 2 === 0);
console.log(findNumbers);
const findFruits = find(fruits, (item) => typeof item === 'string');
console.log(findFruits);