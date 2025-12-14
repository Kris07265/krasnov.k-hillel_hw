'use strict';
console.log("reverse");
const reverse = (arr) => {
    for (let a = 0, b = arr.length - 1; a < b; a += 1, b -= 1) {
        let c = arr[a];
        arr[a] = arr[b];
        arr[b] = c;
    }
    return arr;
}
const reverseNumbers = reverse(numbers);
console.log(reverseNumbers);
const reverseFruits = reverse(fruits);
console.log(reverseFruits);