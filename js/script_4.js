'use strict';
const cart = [
    { title: "Book", price: 200, qty: 2 },
    { title: "Laptop", price: 30000, qty: 1 }
];
const totalPrice = cart[0].price * cart[0].qty + cart[1].price * cart[1].qty;
console.log(totalPrice);
const updatedCart = [
    cart[0],
    cart[1],
    { title: "Pen", price: 20, qty: 5 }
];
const itemNames = cart[0].title + ", " + cart[1].title + "," + updatedCart[2].title;
console.log(itemNames);