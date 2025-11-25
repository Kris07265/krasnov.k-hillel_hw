'use strict';
const price = Number(prompt('Яка початкова ціна товару?'));
if (isNaN(price)) {
    alert('Помилка вводу!')
}
if (price < 0) {
    alert('Помилка вводу!')
}
const sale = Number(prompt('Яка знижка у відсотках?'));
if (isNaN(sale)) {
    alert('Помилка вводу!')
}
if (sale < 0) {
    alert('Помилка вводу!')
}
const discountedPrice = (price-(price*sale/100));
alert(`Початкова ціна: (${price})грн, знижка: (${sale})%, ціна зі знижкою: (${discountedPrice})грн`);