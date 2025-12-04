'use strict';
const arr = [1, 2, 3, 4, 5];
let sumArr = null;
let i = 0;
while (i <= arr.length -1) {
    sumArr = sumArr + arr[i];
    i += 1
}
console.log(sumArr);

let sumArr2 = 0;
let a = 0;
while (a <= arr.length -1) {
    sumArr2 = sumArr2 + (arr[a]**2);
    a += 1
}
console.log(sumArr2);