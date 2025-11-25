'use strict';
let age = prompt('Скільки вам років?');
if (age === null || isNaN(age) || age.trim().length ===0) {
    alert('Вік не вказано')
}

age = Number(age);
if (age <18){
    const answer = confirm('Вам менше 18. Чи є з вами дорослий, який дозволяє перегляд?')
    if (answer) {
        alert('Доступ дозволено з дозволу дорослого.')
    } else {
        alert('Доступ заборонено.')
    }
}
else
    if (age >= 18) {
    alert('Доступ дозволено. Приємного перегляду!')
}