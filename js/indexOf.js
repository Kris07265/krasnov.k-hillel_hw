'use strict';
console.log("indexOf");

/**
 * Returns the first index at which a given element can be found in the array, or -1 if it is not present.
 *
 * @param {Array} arr - The array to search through.
 * @param {*} item - The element to locate in the array.
 * @returns {number} The index of the first occurrence of the element in the array, or -1 if not found.
 */

const indexOf = (arr, item) => {
    for (let i = 0; i < arr.length; i += 1){
        if (arr[i] === item){
            return i;
        }
    }
    return -1;
}
const indexOfNumbers = indexOf(numbers, 6);
console.log(indexOfNumbers);

const indexOfFruits = indexOf(fruits, "kiwi");
console.log(indexOfFruits);