'use strict';
let ul = document.body.firstElementChild;
for (const el of ul.children) {
    console.log(el)
}
console.log(ul.childElementCount)
const ulElementText = [];
for (const li of ul.children) {
    ulElementText.push(li.textContent)
}
console.log(ulElementText);


