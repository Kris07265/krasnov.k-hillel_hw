Homework 33 "Керований об’єкт UserCard (Descriptors + Getter/Setter)"

Мета

Закріпити Object.defineProperty, прапорці writable/enumerable/configurable, getter/setter, freeze/seal.

Завдання

Створіть об’єкт user із полями:
_firstName (службове поле)
_lastName (службове поле)
createdAt (дата створення, тільки для читання)
Додайте accessor-властивість fullName:
getter повертає "First Last"
setter приймає рядок "First Last" і:
перевіряє, що це string
перевіряє, що є 2 слова
кожне слово мінімум 2 символи
якщо невалідно — кидає Error
Через дескриптори налаштуйте:
_firstName, _lastName: enumerable: false
createdAt: writable: false, configurable: false
fullName: configurable: false, enumerable: true
Додайте метод lockProfile():
після виклику об’єкт має стати sealed
перевірте через Object.isSealed(user)
Виведіть у консоль:
дескриптори всіх полів (Object.getOwnPropertyDescriptors)
результат спроби:
додати нове поле після lockProfile
змінити createdAt
видалити fullName
Критерії приймання

fullName коректно працює в обидва боки (get/set).
Службові поля не потрапляють у Object.keys(user).
createdAt не змінюється.
Після lockProfile нові поля не додаються, існуючі не видаляються.
Бонус

Зробіть версію lockHard(), яка використовує Object.freeze(user), і порівняйте поведінку із seal.