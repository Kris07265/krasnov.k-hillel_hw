"use strict";
for (let i = 20; i < 30.5; i += 0.5){
    console.log(i);
}
for (let i = 10; i <= 100; i += 10){
    console.log(i * 27);
}
const b = +prompt("Enter a number");
for (let i = 1; i <= 100 && i**2 <= b; i += 1){
    console.log(i)
}