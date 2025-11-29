'use strict';
const name = prompt("Вкажіть ваше ім'я");
let age = prompt("Вкажіть ваш вік");
age = Number(age);
const place = prompt("Вкажіть ваше місто проживання");
let likeJs = prompt("Чи любите ви Javascript");
likeJs = Boolean(likeJs === "Так" || likeJs === "так" || likeJs === "ТАК");
if (likeJs) {
    alert(`Привіт, ${name}! Вам ${age} років, Ви з міста ${place}. Ставлення до Javascript: любить.`);
}
else {
        alert(`Привіт, ${name}! Вам ${age} років, Ви з міста ${place}. Ставлення до Javascript: не любить.`);
}