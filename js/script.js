'use strict';
console.log("1. map + умовна трансформація");
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
