'use strict';
console.log("1) map + умовна трансформація");
const products = [
    { id: 1, name: "Mouse", price: 25, inStock: true },
    { id: 2, name: "Keyboard", price: 70, inStock: false },
    { id: 3, name: "Monitor", price: 210, inStock: true },
];
const productsNames = products.map(product => {
    let productName = product.name + ":" + " $" + product.price;
    if (product.inStock === false){
        productName = productName + "(out of stock)";
    }
    return productName;
});
console.log(productsNames);


console.log("2) filter + декілька умов");
const users = [
    { id: 1, age: 17, active: true, email: "a@mail.com" },
    { id: 2, age: 22, active: true, email: "b@spam.com" },
    { id: 3, age: 30, active: false, email: "c@mail.com" },
    { id: 4, age: 35, active: true, email: "d@mail.com" },
    { id: 5, age: 40, active: true, email: "e@mail.com" },
];
const usersFiltered = users.filter(user => user.active === true && user.age >= 18 && user.age <= 35 && !user.email.endsWith("@spam.com"));
console.log(usersFiltered);


console.log("3) reduce → групування");
const tx = [
    { id: 1, category: "food", amount: 12 },
    { id: 2, category: "food", amount: 8 },
    { id: 3, category: "taxi", amount: 15 },
    { id: 4, category: "books", amount: 20 },
    { id: 5, category: "taxi", amount: 7 },
];
const tx2 = tx.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
}, {});
console.log(tx2);


console.log("4) find + пошук по вкладених даних");
const orders = [
    { id: 101, items: [{ sku: "A1", qty: 1 }, { sku: "C3", qty: 2 }] },
    { id: 102, items: [{ sku: "B2", qty: 1 }] },
    { id: 103, items: [{ sku: "B2", qty: 3 }, { sku: "A1", qty: 1 }] },
];
const ordersFind = orders.find(order => order.items.some(item => item.sku === "B2"));
console.log(ordersFind);



