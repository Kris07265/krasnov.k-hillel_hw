'use strict';
console.log("lastIndexOf");

/**
 * Returns the last index at which a given element can be found in the array, or -1 if it is not present.
 *
 * @param {Array} arr - The array to search through.
 * @param {*} item - The element to locate in the array.
 * @returns {number} The index of the last occurrence of the element in the array, or -1 if not found.
 */

const lastIndexOf = (arr, item) => {
    for (let i = arr.length -1; i >= 0; i = i - 1){
        if (arr[i] === item){
            return i;
        }
    }
    return -1;
}
const lastIndexOfNumbers = lastIndexOf(numbers, 8);
console.log(lastIndexOfNumbers);

const lastIndexOfFruits = lastIndexOf(fruits, "banana");
console.log(lastIndexOfFruits);