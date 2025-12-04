"use strict";
for (let i = 20; i <= 30; i += 0.5){
    console.log(i);
}


for (let i = 10; i <= 100; i += 10){
    console.log(i * 27);
}


const cycle3 = +prompt("Enter a number");
for (let i = 1; i <= 100 && i**2 <= cycle3; i += 1){
    console.log(i)
}


const cycle4 = +prompt("Enter a number");
if (cycle4 <= 1){
    console.log("Число не просте");
}
else {
    let isSimpleNum = "Число просте";
    let i = 2;
    while (i < cycle4){
        if (cycle4 % i === 0) {
            isSimpleNum = "Число не просте";
            break;
        }
        i += 1;
    }
    console.log(isSimpleNum);
}

const cycle5 = +prompt("Enter a number");
let checkCycle5 = "Це число не можна отримати шляхом зведення числа 3 у деякий ступінь";
let i = 1;
while (i <= cycle5){
    if (i === cycle5){
        checkCycle5 = "Це число можна отримати шляхом зведення числа 3 у деякий ступінь";
        break;
    }
    i = i * 3
}
console.log(checkCycle5);