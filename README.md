Homework 36 "Фінальний проект по JS"

ДЗ: CRUD Users (Single Page) через JSONPlaceholder + MVC + Bootstrap
Мета: зробити односторінковий застосунок, який показує таблицю користувачів і дозволяє створювати / редагувати / видаляти користувачів через JSONPlaceholder API, використовуючи Promises, async/await, try/catch, класи і MVC-підхід.

Технічні вимоги
API: https://jsonplaceholder.typicode.com/users

Стилі: тільки Bootstrap (CDN)

Одна сторінка: index.html + ваші js файли (можна 1 або кілька)

Без фреймворків: тільки ванільний JS

Обов’язково:

Promises (мінімум 1 місце з .then/.catch/.finally)
async/await
try/catch у всіх async-операціях
класи для UsersModel, UsersView, UsersController (MVC)
Модальні вікна Bootstrap для create/edit/delete confirm
Функціонал
1) Відображення списку
   При завантаженні сторінки: GET /users
   Відрендерити таблицю (Bootstrap table) з колонками:
   ID
   Name
   Email
   Phone
   Company
   Actions (Edit, Delete)
2) Створення користувача (Create)
   Кнопка “Add user”
   Відкриває модалку з формою:
   name (required)
   email (required)
   phone (optional)
   company.name (optional)
   При submit:
   Валідація (мінімум required поля)
   POST /users
   Успіх → додати користувача в локальний масив + оновити таблицю
   Помилка → показати повідомлення в модалці/alert
3) Редагування (Update)
   Кнопка Edit в рядку таблиці
   Відкриває модалку з формою, заповненою даними користувача
   При submit:
   PUT /users/:id (або PATCH — але краще PUT для чіткості)
   Успіх → оновити користувача в локальному масиві + оновити таблицю
4) Видалення (Delete)
   Кнопка Delete в рядку таблиці
   Відкриває confirm-модалку: “Are you sure you want to delete user X?”
   При підтвердженні:
   DELETE /users/:id
   Успіх → видалити з локального масиву + оновити таблицю
5) UX-вимоги
   Під час запитів показувати loading стан (наприклад, disable кнопок + spinner в таблиці або в модалці)
   Помилки показувати як Bootstrap alert (на сторінці або в модалці)
   Модалки після успіху закривати і чистити форму/стан
   Архітектура (MVC) — обов’язково класами
   UsersModel (UsersModel)
   Відповідає за:

HTTP-запити (fetch)
Збереження локального стану this.users
Методи:
getAll()
create(userData)
update(id, userData)
delete(id)
Вимога по Promises:

Хоча більшість зробите через async/await — мінімум 1 метод зробіть у стилі:

return fetch(...).then(...).catch(...).finally(...)
UsersView (UsersView)
Відповідає за:

Рендер таблиці
Відкриття/закриття модалок
Отримання даних з форм
Показ alert’ів, loading
Методи (приклад):

renderTable(users)
openCreateModal() / openEditModal(user) / openDeleteModal(user)
getFormData()
setLoading(isLoading)
showError(message)
UsersController (UsersController)
Відповідає за:

Ініціалізацію
Підписки на події (click/submit)
Виклики model + оновлення view
try/catch навколо кожної async-операції
Методи (приклад):

init()
handleAddClick()
handleCreateSubmit()
handleEditClick(id)
handleEditSubmit()
handleDeleteClick(id)
handleDeleteConfirm()
Валідація (мінімум)
name — не пустий
email — не пустий + проста перевірка на @ (або regex)
При помилці: підсвітити інпути bootstrap-класом is-invalid + текст під полем
Критерії приймання
Одна сторінка, таблиця відображається після завантаження
Create/Edit/Delete працюють через модалки
DELETE має підтвердження в модалці
MVC реалізовано класами, логіка не “в каші”
Є async/await + try/catch
Є Promises (.then/.catch/.finally) хоча б в одному місці
Bootstrap-only стилізація
Є loading та error стани
Додатково (за бажанням, але +бал)
Пошук по name/email (фільтр над таблицею)
Сортування по name (клік по заголовку колонки)
Toast замість alert
Пагінація (хоча б локальна)
Файлова структура



Copy code
REMARКA:
JSONPlaceholder — це фейковий REST API. Він повертає “успішні” відповіді на POST/PUT/DELETE, але фактично НЕ зберігає зміни.
Тому після перезавантаження сторінки ви знову побачите початковий список з GET /users.

Рекомендовано для ДЗ:
після create/update/delete оновлювати локальний масив users у UsersModel і перерендерювати таблицю у UsersView.