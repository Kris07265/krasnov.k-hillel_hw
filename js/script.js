'use strict';
let age = prompt("Вкажіть ваш вік.");
if (isNaN(age) || age === null || age.trim().length === 0) {
    alert("Некоректний вік")
}
age = Number(age);
if (age){
    alert(`Через 5 років вам буде: ${age + 5}`);
}


const price1 = "120.50$";
parseInt(price1);
parseFloat(price1);
const price1ParseInt = parseInt(price1);
const price1ParseFloat = parseFloat(price1);

const price2 = "UAH 999";
parseInt(price2);
parseFloat(price2);
const price2ParseInt = parseInt(price2);
const price2ParseFloat = parseFloat(price2);

const height = "180cm";
parseInt(height);
parseFloat(height);
const heightParseInt = parseInt(height);
const heightParseFloat = parseFloat(height);

const broken = "abc123";
parseInt(broken);
parseFloat(broken);
const brokenParseInt = parseInt(broken);
const brokenParseFloat = parseFloat(broken);

console.log(`"120.50$" -> parseInt: ${price1ParseInt}, parseFloat: ${price1ParseFloat}`);
// Вернулось число, потому что значение начинается с числа

console.log(`"UAH 999" -> parseInt: ${price2ParseInt}, parseFloat: ${price2ParseFloat}`);
// Вернулось NaN, потому что значение начинается не с числа

console.log(`"180cm" -> parseInt: ${heightParseInt}, parseFloat: ${heightParseFloat}`);
// Вернулось число, потому что значение начинается с числа

console.log(`"abc123" -> parseInt: ${brokenParseInt}, parseFloat: ${brokenParseFloat}`);
// Вернулось NaN, потому что значение начинается не с числа


