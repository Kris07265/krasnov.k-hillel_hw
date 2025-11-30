'use strict';
let email = prompt("Введіть ваш емейл");
let password = prompt("Введіть ваш пароль");
let isEmailVerified = prompt("Чи підтверджений емейл?");
isEmailVerified = Boolean(isEmailVerified.toLowerCase() === "так");
let canLogin = Boolean (isEmailVerified && email.trim() !== "" && password.trim() !== "");
if (canLogin) {
    console.log("Логін успішний");
}
else {
    console.log("Перевірте дані");
}
