Homework 46 "React CRUD App — Users Manager"

Проект писати таким самим чином як ми робили на уроці

Потрібно реалізувати невеликий CRUD застосунок для роботи з користувачами, використовуючи відкрите API: JSONPlaceholder.

API:

Copy code
https://jsonplaceholder.typicode.com/users
Технології, які обов’язково використати
React
react-router
formik
yup
react-bootstrap
prop-types
Суть завдання
Створити застосунок “Users Manager”, у якому можна:

переглядати список користувачів
переглядати деталі конкретного користувача
створювати нового користувача
редагувати існуючого користувача
видаляти користувача
Сторінки
1. Users List Page
   Маршрут:

Copy code
/users
На сторінці має бути:

таблиця або cards зі списком користувачів
ім’я
email
phone
website
кнопки: View / Edit / Delete
кнопка Create New User
2. User Details Page
   Маршрут:

Copy code
/users/:id
Показати детальну інформацію про користувача:

name
username
email
phone
website
company.name
address.city
address.street
Також додати кнопку Back to List.

3. Create User Page
   Маршрут:

Copy code
/users/create
Форма створення користувача через Formik.

Поля форми:

name
username
email
phone
website
city
street
companyName
4. Edit User Page
   Маршрут:

Copy code
/users/:id/edit
Форма аналогічна create, але з попередньо заповненими даними користувача.

Валідація через Yup
Обов’язкові правила
name — обов’язкове поле, мінімум 2 символи
username — обов’язкове поле
email — обов’язкове поле, валідний email
phone — обов’язкове поле
website — обов’язкове поле
city — обов’язкове поле
street — обов’язкове поле
companyName — обов’язкове поле
CRUD логіка
Read
Отримати список користувачів з API і вивести на сторінку.

Create
Створення нового користувача через POST запит.

Update
Редагування користувача через PUT або PATCH запит.

Delete
Видалення користувача через DELETE запит.

Важливий момент
JSONPlaceholder не зберігає зміни по-справжньому в базі, але API повертає успішну відповідь. Це нормально для цього завдання.

Вимоги до структури
Потрібно винести:

окремі сторінки
окремі компоненти
окремий компонент форми
окремий файл з роутами
окремий файл з validation schema
окремий файл для роботи з API
Що обов’язково має бути в UI
Bootstrap layout
navbar
loading state
error state
confirm перед delete
повідомлення про успішне створення / редагування / видалення
PropTypes
Усі компоненти, які приймають props, мають бути типізовані через prop-types.

Наприклад:

UserCard
UserTable
UserForm
PageHeader
ButtonGroup
AlertMessage
Маршрути
Copy code
/                 -> redirect to /users
/users            -> список користувачів
/users/create     -> створення користувача
/users/:id        -> перегляд користувача
/users/:id/edit   -> редагування користувача
*                 -> сторінка 404
Мінімальний список компонентів
AppLayout
AppNavbar
UsersListPage
UserDetailsPage
CreateUserPage
EditUserPage
NotFoundPage
UserForm
UsersTable або UsersCards
Loader
ErrorMessage
Додаткові умови для сильнішого рівня
Middle level
пошук користувачів по імені
фільтрація по місту
повторне використання однієї і тієї ж форми для create/edit
окремий кастомний hook для роботи з користувачами
Advanced
pagination
toast notifications
protected route для create/edit сторінок
modal для підтвердження видалення
адаптивний UI
Критерії оцінки
коректна робота CRUD
правильне використання React Router
Formik + Yup підключені правильно
охайна структура проєкту
react-bootstrap використовується не формально, а реально для UI
є PropTypes
код читаємий і логічно розбитий
нема великої кількості дублювання
Рекомендована структура
Copy code
src/
api/
usersApi.js
components/
AppNavbar.jsx
UserForm.jsx
UsersTable.jsx
Loader.jsx
ErrorMessage.jsx
pages/
UsersListPage.jsx
UserDetailsPage.jsx
CreateUserPage.jsx
EditUserPage.jsx
NotFoundPage.jsx
routes/
AppRoutes.jsx
validation/
userSchema.js
App.jsx
main.jsx

