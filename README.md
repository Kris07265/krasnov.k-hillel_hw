Homework 32 "Міні-форма профілю (DOM + валідація + рендер стану)"

Мета

Поєднати DOM-маніпуляції з контрольованими даними через getter/setter.

Що зробити в UI

Створіть сторінку з:

input для First name
input для Last name
input для Email
кнопка “Save”
кнопка “Freeze model”
блок для помилок
блок прев’ю профілю (картка)
Логіка

Створіть JS-модель profileModel через defineProperty:
_firstName, _lastName, _email (службові)
public accessor-и firstName, lastName, email з валідацією:
firstName/lastName: мінімум 2 символи
email: базова перевірка на "@" і "."
fullName getter (тільки читання)
По кліку Save:
зчитати значення з input
записати в model через setter-и
якщо помилка — показати текст у блоці помилок
якщо успіх — оновити картку профілю в DOM:
Full name
Email
Дата оновлення
Кнопка Freeze model:
викликає Object.freeze(profileModel)
після цього будь-які спроби оновлення через форму мають показувати повідомлення, що модель заблокована
Додатково по DOM:
якщо інпут невалідний — додавайте клас invalid
при виправленні — знімайте invalid
очищайте старі помилки перед новою валідацією
Критерії приймання

Дані в картці оновлюються тільки після валідного Save.
Помилки рендеряться в DOM, а не тільки в console.
Після Freeze зміни не застосовуються.
В коді є робота з:
querySelector / getElementById
addEventListener
textContent / innerHTML (бажано textContent для безпеки)
classList.add/remove/toggle
Бонус

Додайте кнопку “Show descriptors”, яка рендерить JSON дескрипторів моделі в <pre> на сторінці.