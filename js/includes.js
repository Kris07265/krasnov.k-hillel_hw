'use strict';
console.log("includes");

/**
 * Checks if an array contains a specific element.
 *
 * @param {Array} arr - The array to search through.
 * @param {*} item - The element to search for in the array.
 * @returns {boolean} Returns true if the array contains the element, otherwise false.
 */

const includes = (arr, item) => {
    for (let i = 0; i < arr.length; i += 1) {
        if (arr[i] === item) {
            return true;
        }
    }
    return false;
}
const includesNumbers = includes(numbers, 3);
console.log(includesNumbers);
const includesFruits = includes(fruits, "apple");
console.log(includesFruits);