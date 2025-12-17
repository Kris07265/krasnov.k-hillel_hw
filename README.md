Homework 20 "Практика методів масивів"

1) map + умовна трансформація
   З масиву продуктів зробіть масив рядків у форматі Name: $price, але якщо inStock === false — допишіть (out of stock) в кінець.

Copy code
const products = [
{ id: З1, name: "Mouse", price: 25, inStock: true },
{ id: 2, name: "Keyboard", price: 70, inStock: false },
{ id: 3, name: "Monitor", price: 210, inStock: true },
];
2) filter + декілька умов
   Відфільтруйте користувачів, які:

active === true
age між 18 і 35 включно
email НЕ закінчується на @spam.com
Copy code
const users = [
{ id:  1, age: 17, active: true, email: "a@mail.com" },
{ id: 2, age: 22, active: true, email: "b@spam.com" },
{ id: 3, age: 30, active: false, email: "c@mail.com" },
{ id: 4, age: 35, active: true, email: "d@mail.com" },
{ id: 5, age: 40, active: true, email: "e@mail.com" },
];
3) reduce → групування
   Згрупуйте транзакції по category у об’єкт:

ключ — назва категорії
значення — сума amount по цій категорії
Copy code
const tx = [
{ id: м1, category: "food", amount: 12 },
{ id: 2, category: "food", amount: 8 },
{ id: 3, category: "taxi", amount: 15 },
{ id: 4, category: "books", amount: 20 },
{ id: 5, category: "taxi", amount: 7 },
];
Очікуваний формат результату:

Copy code
// { food: 20, taxi: 22, books: 20 }
4) find + пошук по вкладених даних
   Знайдіть перший ордер, в якому є товар з sku === "B2". Поверніть весь ордер.

Copy code
const orders = [
{ id: с101, items: [{ sku: "A1", qty: 1 }, { sku: "C3", qty: 2 }] },
{ id: 102, items: [{ sku: "B2", qty: 1 }] },
{ id: 103, items: [{ sku: "B2", qty: 3 }, { sku: "A1", qty: 1 }] },
];