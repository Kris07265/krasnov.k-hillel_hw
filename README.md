Homework 34 "Notes Board (міні-дошка нотаток)"

Ідея
Зробити невеликий застосунок для створення та керування короткими нотатками:

додати нотатку
відмітити як “важливо”
видалити
очистити всі
зберігати в localStorage
1) Що студент має реалізувати
   Функціонал (MVP)
   Створення нотатки
   Поля:
   title (обов’язково, мінімум 3 символи)
   category (одна з: work, study, personal)
   Після submit нотатка додається в список.
   Перемикач “Важливо”
   Кнопка Mark important / Unmark important на кожній нотатці.
   Важлива нотатка візуально виділяється (класом CSS).
   Видалення однієї нотатки
   Кнопка Delete на кожній карточці.
   Очистити всі
   Кнопка Clear all.
   Якщо список порожній — показати повідомлення: No notes yet.
   Персистентність
   Після перезавантаження сторінки нотатки мають залишатись.
2) Обов’язкова структура (спрощене MVC)
   Структура файлів:

index.html
style.css
js/app.js
js/notes/Model.js
js/notes/View.js
js/notes/Controller.js
Model
Відповідає за:

масив нотаток
localStorage
CRUD-операції:
create(data)
readAll()
toggleImportant(id)
delete(id)
clearAll()
View
Відповідає за:

рендер списку
рендер однієї карточки
очищення контейнера
показ No notes yet
Controller
Відповідає за:

підписку на submit/click
виклики Model
оновлення View
ініціалізацію при DOMContentLoaded
3) Модель даних
   Copy code
   {
   id: Number,
   title: String,
   category: "work" | "study" | "personal",
   important: Boolean,
   createdAt: String // ISO date
   }
4) Мінімальна HTML-розмітка (що має бути)
   Форма:
   input title
   select category
   кнопка Add note
   Контейнер списку:
<div id="notesList"></div>
Кнопка:
Clear all
Блок/текст:
No notes yet (показується, коли порожньо)
5) Валідація (обов’язково)
title.trim().length >= 3
category тільки з дозволених значень
При невалідних даних:
нотатка не створюється
вивести просту помилку під формою або alert
6) Технічні вимоги
Використовувати Бутстрап
ES Modules (import/export)
Event delegation для кнопок у списку
Код має бути розбитий по класах: Model/View/Controller
Без дублювання DOM-логіки в Controller (рендер тільки у View)
7) Acceptance Criteria (критерії здачі)
 Можна додати нотатку
 Можна видалити конкретну нотатку
 Можна переключити important
 Працює Clear all
 Дані зберігаються після reload
 Є повідомлення No notes yet при порожньому списку
 Є базова валідація
 Проєкт має MVC-структуру
8) Бонус (за бажанням, +level)
Фільтр All / Important / Category
Сортування “новіші зверху/знизу”
Лічильник: Total: X | Important: Y
Кнопка Edit title (просте редагування через prompt/modal)