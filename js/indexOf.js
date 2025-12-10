'use strict';
console.log("indexOf");
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