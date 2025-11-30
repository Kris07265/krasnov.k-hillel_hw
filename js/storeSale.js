'use strict';
let hasPromoCode = prompt("Чи є промокод?");
hasPromoCode = Boolean(hasPromoCode.toLowerCase() === "так");
let cartTotal = prompt("Сума в кошику");
cartTotal = Number(cartTotal);
let isBlackFriday = prompt("Чи сьогодні Black Friday?");
isBlackFriday = Boolean(isBlackFriday.toLowerCase() === "так");
let isDiscountApplied = Boolean (isBlackFriday || (cartTotal >= 100 && hasPromoCode));
if (isDiscountApplied) {
    console.log("Знижка застосована.");
}
else {
    console.log("Знижка не застосована");
}
const noDiscount = !isDiscountApplied;