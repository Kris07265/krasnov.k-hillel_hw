'use strict';
let a = prompt("Enter the number");
const condition1 = +a === 0 ? "Правильно" : "Неправильно";
console.log(condition1);
const condition2 = +a > 0 ? "Правильно" : "Неправильно";
console.log(condition2);
const condition3 = +a < 0 ? "Правильно" : "Неправильно";
console.log(condition3);
const condition4 = +a >= 0 ? "Правильно" : "Неправильно";
console.log(condition4);
const condition5 = +a <= 0 ? "Правильно" : "Неправильно";
console.log(condition5);
const condition6 = +a !== 0 ? "Правильно" : "Неправильно";
console.log(condition6);
const condition7 = a === "test" ? "Правильно" : "Неправильно";
console.log(condition7);
if (a === "1" && +a === 1){
    console.log("Правильно")
}
else {
    console.log("Неправильно")
}
if (+a > 0 && +a < 5){
    console.log("Правильно")
}
else {
    console.log("Неправильно")
}
if (+a === 0 || +a === 2){
    a = (+a) + 7
}
else {
    a = (+a) / 10
}
console.log(a);
let b = +prompt("Enter the number");
if (+a <= 1 && b >= 3){
    console.log((+a) + b)
}
else {
    console.log((+a) - b)
}
if ((+a > 2 && +a < 11) || (b >=6 && b < 14)){
    console.log("Правильно")
}
else {
    console.log("Неправильно")
}
let num = +prompt("Enter the number");
let result = null;
switch (num) {
    case 1:
        result = "Зима";
        break;
    case 2:
        result = "Весна";
        break;
    case 3:
        result = "Літо";
        break;
    case 4:
        result = "Осінь";
        break;
}
console.log(result);
