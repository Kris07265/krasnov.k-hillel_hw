'use strict';
console.log("lastIndexOf");
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