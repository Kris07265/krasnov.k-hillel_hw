'use strict';
const array = [1, 2, 3, [4, 5, [6, 7]]];
const array2 = [1, 2, 3, 4];
function flat(arr){
    if (arguments.length > 1) {
        throw new Error('Function accepts only 1 argument, too much arguments provided');
    }
    if (arr.some(item => Array.isArray(item))) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (Array.isArray(item)) {
                const flatItem = flat(item);
                for (let a = 0; a < flatItem.length; a++) {
                    result.push(flatItem[a]);
                }
            } else {
                result.push(item);
            }
        }
        return result;
    }
    else {
        return arr.slice();
    }
}
console.log(flat(array));
console.log(flat(array2));