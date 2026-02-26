Homework 35 "Promises + Fetch + DOM"

API:

https://jsonplaceholder.typicode.com/users

https://jsonplaceholder.typicode.com/albums?userId=USER_ID

https://jsonplaceholder.typicode.com/photos?albumId=ALBUM_ID

HTML (index.html)
Зробіть:
select#userSelect (option “Select user…”)
select#albumSelect (option “Select album…”, disabled поки user не вибраний)
button#loadBtn (disabled поки album не вибраний)
div#status (для “Loading…” і помилок)
div#photos (контейнер для карток фото)
JS логіка (app.js)
A. При завантаженні сторінки (DOMContentLoaded)

показати в #status текст “Loading users…”
fetch /users
заповнити userSelect опціями (text = name, value = id)
очистити статус
B. Коли змінили userSelect

очистити photos
зробити albumSelect disabled, loadBtn disabled
показати “Loading albums…”
fetch /albums?userId=...
заповнити albumSelect опціями (text = title, value = id)
увімкнути albumSelect
очистити статус
C. Коли змінили albumSelect

якщо albumId вибраний → увімкнути loadBtn, інакше disable
D. Коли натиснули “Load photos”

очистити photos
показати “Loading photos…”
fetch /photos?albumId=...
відрендерити перші 12 фото
під рендером додати кнопку “Load more” (якщо фото більше 12)
Пагінація (дуже проста)

зберігайте allPhotos (масив) і offset (число) у двох змінних
“Load more” додає ще 12
коли фото закінчились — ховає/disable кнопку
Рендер фото (картка)
Для кожного фото:
img (src = thumbnailUrl)
p (title обрізати до 40 символів + …)
a “Open” (href = url, target="_blank")
Обробка помилок (обов’язково)
Для кожного fetch:
якщо !res.ok → throw new Error("HTTP" + res.status)
.catch(...) показує Error: ... у #status
.finally(...) прибирає “Loading…” якщо треба
Критерії

Працює Users → Albums → Photos
Є loader через #status
Є error повідомлення
Є Load more, який реально довантажує порціями
Здача

3 файли: index.html, styles.css (мінімально), app.js