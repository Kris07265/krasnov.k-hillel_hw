const name = prompt("Вкажіть ваше ім'я");
const age = Number (prompt("Вкажіть ваш вік"));
const place = prompt("Вкажіть ваше місто проживання");
const likeJs = prompt("Чи любите ви Javascript");
if (likeJs === ("Так") || likeJs === ("так") || likeJs === ("ТАК")) {
        alert(`Привіт, ${name}! Вам ${age} років, Ви з міста ${place}. Ставлення до Javascript: любить.`);
}
else {
        alert(`Привіт, ${name}! Вам ${age} років, Ви з міста ${place}. Ставлення до Javascript: не любить.`);
}