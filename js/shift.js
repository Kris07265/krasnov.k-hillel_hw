'use strict';
console.log("shift");
const shift = (arr) => {
    const deleteElement = arr[0];
    if (arr.length <= 0) {
        return undefined;
    }
    for (let i = 1; i < arr.length; i += 1) {
        arr[i - 1] = arr[i];
    }
    arr.length = arr.length - 1;
    return deleteElement;
}
const shiftNumbers = shift(numbers);
console.log(shiftNumbers);
const shiftFruits = shift(fruits);
console.log(shiftFruits);