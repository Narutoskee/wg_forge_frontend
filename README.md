# Тестовое задание WG Forge Platform Front-End

Это стартовый проект для выполнения тестового задания программы WG Forge Platform Front-End, на основе которого вам нужно выполнять задание.

## Подготовка

 - ⚠️ Убедитесь, что в вашей системе установлен node.js последней стабильной версии - https://nodejs.org/en/
 - Сделайте fork проекта; подробную информацию можно получить здесь:
 https://help.github.com/articles/about-forks/
 - Склонируйте репозиторий своего форка:
```sh
git clone https://github.com/<username>/wg_forge_frontend.git
```
 - Перейдите в корневую директорию проекта и установите зависимости  командой (подробно об npm и зависимостях можно узнать на сайте: https://docs.npmjs.com/):
```sh
``npm install``
```
 - Для запуска проекта выполните команду:
```sh
npm start
```


## Задача:
Необходимо реализовать вывод в табличное представление данных o заказах, которые хранятся в файле `orders.json`, а также связаной информации о пользователе, которая хранится в файлах `users.json` и `companies.json` в директории `data` данного репозитория.


### `orders.json`
В файле `orders.json` хранится сериализованный в JSON массив заказов, каждый из которых соответствует следующей схеме:

```javascript
{
    "id": 11,   // порядковый номер записи
    "transaction_id": "8292e007-4682-idkfa-a404-eed9662fa5cc", // уникальный номер заказа
    "created_at": "1513808027", // временнáя метка создания заказа в формате unix
    "user_id": 15,  // идентификатор пользователя
    "total": "453.47", // общая сумма заказа в базовой валюте (USD)
    "card_type": "diners-club-carte-blanche", // тип карты оплаты
    "card_number": "30526651224733", // номер карты оплаты
    "order_country": "IS",  // страна, из которой сделан заказ
    "order_ip": "211.145.96.59" // IP-адрес пользователя, с которого сделан заказ
}
```

поле | тип | описание
------- |------- |-------
id | integer | порядковый номер записи
transaction_id | string | уникальный номер заказа
created_at | string | временнáя метка создания заказа в формате unix (timestamp)
user_id | integer | идентификатор пользователя
total | float | общая сумма заказа в базовой валюте (USD)
card_type | string | тип карты оплаты
card_number | string | номер карты оплаты
order_country | string | страна, из которой сделан заказ
order_ip | string | IP-адрес пользователя, с которого сделан заказ

### `users.json`
В файле `user.json` содержится сериализованный в JSON массив пользователей. Вот описание:
```json
{
    "id": 15,
    "first_name": "Ivan",
    "last_name": "Ivanivanskiy",
    "gender": "Male",
    "birthday": "665366400",
    "avatar": "https://robohash.org/quibusdamminusea.bmp?size=100x100&set=set1",
    "company_id": 6
}
```

поле | тип | описание
------- |------- |-------
id | integer | идентификатор пользователя, соответстует `order.user_id`
first_name | string | имя пользователя
last_name | string | фамилия пользователя
gender | string | пол, может быть один из "Male", "Female"
birthday | float / null | день рождения пользователя в формате unix timestamp
avatar | string / null | ссылка на изображения с аватаром пользователя
company_id | integer / null | идентификатор компании, которую представляет пользователь

### `companies.json`
И наконец, файл `companies.json` хранит сериализованный в JSON массив зарегистрированных компаний. Имеется следующая информация:
```json
{
    "id": 6,
    "title": "Bumbershoot Corp.",
    "industry": "Apparel",
    "market_cap": "$36.6M",
    "sector": "Consumer Services",
    "url": "http://awesome.website"
}
```

поле | тип | описание
------- |------- |-------
id | integer | идентификатор компании, соответстует `user.id`
title | string | название компании
industry | string | отрасль деятельности
market_cap | string  | рыночная капитализация
sector | string | специализация компании
url | string / null | ссылка на сайт компании


> ⚠️ Обратите внимание, что некоторые поля у объектов `user` и `company` могут принимать значение null. ⚠️

## Задание 1

Реализовать вывод данных в таблицу на странице нашего приложения. Структура таблицы должна выглядеть так:


```html
<table>
    <thead>
        <tr>
            <th>Transaction ID</th>
            <th>User Info</th>
            <th>Order Date</th>
            <th>Order Amount</th>
            <th>Card Number</th>
            <th>Card Type</th>
            <th>Location</th>
        </tr>
    </thead>
    <tbody>
       ...тут будут данные о заказах...
    </tbody>
</table>
```


Для каждого заказа необходимо поместить соответствющие данные в строку в таблице.
Каждый `<tr>` в html-таблице должен иметь id в заданном формате: `order_%id_записи%`.
В ячейке `User` пока выводим только идентификатор пользователя.
Дата создания заказа должна отображаться в формате `DD/MM/YYYY hh:mm:ss`.
Номер карты необходимо экранировать так, чтобы на странице отображались только первые две и последние четыре цифры номера. Номер заказа и тип карты выводим как есть.
Сумма заказа должна отображаться в денежном формате, валюта USD.
В ячейке `Location` информация должна быть предоставлена в следующем формате: `%order_country% (%order_ip%)`.
Например:
```html
<tr id="order_11">
    <td>8292e007-4682-idkfa-a404-eed9662fa5cc</td>
    <td class="user_data">15</td>
    <td>21/12/2017, 1:13:47 AM</td>
    <td>$453.47</td>
    <td>30********4733</td>
    <td>diners-club-carte-blanche</td>
    <td>IS (211.145.96.59)<td>
</tr>
```


## Задание 2

Заполняем ячейку `User Info`. Для этого нам потребуется загрузить список пользователей из файла `users.json` и найти пользователя c `id` соответствующего `order.user_id`.
Далее, необходимо сфомировать строку с обращением (`Mr.` если `Male` в поле `Gender`, иначе `Ms.`), именем и фамилией. Эта строка должна быть обернута в тег `<a href="#">`.
Полученный результат помещаем в ячейку таблицы:

```html
<tr id="order_11">
    ...
    <td class="user-data">
        <a href="#">Mr. Ivan Ivanivanskiy</a>
    </td>
    ...
</tr>
```


## Задание 3

Дополним и немного оживим нашу таблицу. Добавим блок `<div class="user-details">`, в который поместим дополнительную информацию о пользователе и связаной с ним компании (если соответствующая информации имеется):
- Birthday: 01/02/1991
- элемент img с картинкой шириной не более 100px
- Company: Bumbershoot Corp.
- Industry: Apparel / Consumer Services

Для нашего примера это будет выглядеть так:

```html
<tr id="order_11">
    ...
    <td class="user-data">
        <a href="#">Mr. Ivan Ivanivanskiy</a>

        <div class="user-details">
            <p>Birthday: 01/02/1991</p>
            <p><img src="" width="100px"></p>
            <p>Company: <a href="http://awesome.website">Bumbershoot Corp.</a></p>
            <p>Industry: Apparel / Consumer Services</p>
        </div>

    </td>
    ...
</tr>
```


Теперь необходимо добавить обработчик события "click", который будет показывать/скрывать блок `div.user-details` при нажатии на ссылку. Перехода по ссылке происходить не должно. Состояние по-умолчанию: блок с информацией должен быть скрыт.

 - Если в данных представлена ссылка на изображение, то в таблице должна выводиться миниатюра изображения, а не сама ссылка (поле данных `avatar`).
 - Для `url` полей данных должна выводится ссылка, по которой пользователь может совершить переход из таблицы.
 - ⚠️ Любые ссылки на внешние ресурсы в нашем приложении должны открываться в новой вкладке или новом окне! ⚠️


## Задание 4

Давайте добавим возможность сортировки таблицы. Помните заголовок `thead` нашей таблицы? Необходимо, чтобы при клике на ячейку заголовка (например, `<thead>Order Amount</thead>`) данные в таблице сортировались по соответствующему полю в порядке возрастания (для численных данных) или алфавитном (для текстовых данных). Стоит учесть, что некоторые столбцы отображают данные из нескольких полей объекта `order` и связаных с ним объектов `user` и `company`. В таком случае, при сортировке следуюет рукодствоваться следующими правилами:

столбец | порядок сортировки
--------| ------------------
`User Info` | сортировать по полям `first_name` и `last_name`. Остальными данными в ячейке пренебречь
`Card Number` | не сортировать по данному столбцу
`Location` | сортировать сначала по Country, потом по IP-адресу. IP-адрес считать строкой


Если таблица отсортирована по какому-либо столбцу, к соответствующей ячейке заголовка необходимо добавить тэг с символом, информирующем пользователя о текущем состоянии:
```html
<span>&#8595;</span>
```

Например, в случае сортировки по `Order Amount` заголовок таблицы должен иметь следующую разметку:

```html
<thead>
    <tr>
        <th>#</th>
        <th>User Info</th>
        <th>Order Date</th>
        <th>Order Amount <span>&#8595;</span></th>
        <th>Card Number</th>
        <th>Card Type</th>
        <th>Location</th>
    </tr>
</thead>
```

[Кликабельные](https://ru.wiktionary.org/wiki/%D0%BA%D0%BB%D0%B8%D0%BA%D0%B0%D0%B1%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9) элементы заголовка таблицы при наведении на них должны менять тип курсора на указатель типа `pointer` (вроде этого, 👆).


## Задание 5

Собираем статистику. Внизу таблицы необходимо добавить несколько строк со статистической информацией.
 - Общее количество заказов выведенное на текущий момент в таблице
 - Общая стоимость всех заказов (в денежном формате)
 - [Медиана](https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%B4%D0%B8%D0%B0%D0%BD%D0%B0_(%D1%81%D1%82%D0%B0%D1%82%D0%B8%D1%81%D1%82%D0%B8%D0%BA%D0%B0)) по всем выведенным заказам
 - [Средний чек](https://ru.wikipedia.org/wiki/%D0%A1%D1%80%D0%B5%D0%B4%D0%BD%D0%B8%D0%B9_%D1%87%D0%B5%D0%BA) по всем выведенным заказам
 - Средний чек для женщин
 - Средний чек для мужчин

Разметка блока со статистикой может выглядеть так:
```html
<tr>
    <td>Orders Count</td>
    <td>11</td>
</tr>
<tr>
    <td>Orders Total</td>
    <td>$ 6722.72</td>
</tr>
<tr>
    <td>Median Value</td>
    <td>$ 593.72</td>
</tr>
<tr>
    <td>Average Check</td>
    <td>$ 611.16</td>
</tr>
<tr>
    <td>Average Check (Female)</td>
    <td>$ 395.18</td>
</tr>
<tr>
    <td>Average Check (Male)</td>
    <td>$ 692.15</td>
</tr>
```

Следует учесть, что количество ячеек в строках с информацией о заказе не совпадает с количеством ячеек в строках со статистикой, поэтому последние необходимо объединить. HTML-таблицы имеют встроенный механизм для этого.


## Задание 6

Поиск по таблице. Для упрощения работы с таблицей заказов нужно предоставить пользователю возможность поиска по данным заказов. Для этого давайте добавим поле ввода, при изменении которого в таблице должны отобразиться только те заказы, одно или несколько полей которых содержат в себе значение поля поиска.
Для этого поместим в "шапку" таблицы поле поиска:

```html
<tr>
    <th>Search:</th>
    <th><input type="text" id="search"></th>
</tr>
```

При реализации функции поиска можно ограничиться следующими полями заказа, в которых производить поиск:
 - Имя и фамилия пользователя (`user.{first_name,last_name}`)
 - Все поля объекта `order`, кроме `created_at`, `card_number`

> ⚠️ Обратите внимание, что если к таблице применена сортировка по какому-либо столбцу, то она должна применяться и при выводе найденных заказов.

Если заказов соответствующих заданому критерию поиска не найдено, необходимо в таблице вывести одну строку с надписью `Nothing found`.
```html
<tr>
    <td>Nothing found</td>
</tr>
```

Также при использовании поиска должны обновляться данные в блоке статистики. Если поиск не дал результатов, то вместо значений в ячейках таблицы выводить блок `<span>n/a</span>.


## Как выполнять задание

Вывод данных должен быть организован в html-элемент `div` с идентификатором `app` в файле `src/index.html`

JavaScript-код, реализующий вывод данных, должен быть реализован в файле `src/app.js` - это входная точка вашего приложения. Дальнейшая структура приложения - на ваше усмотрение.

> ⚠️ Мы ожидаем задание решенное на чистом JavaScript (можно использовать ES2015+). Если вы хотите выполнить тестовое задание с использованием фреймворка, тогда вам потребуется также прислать нам обоснование своего выбора конкретного фреймворка.

> 🛑 Нельзя модифицировать файлы с исходными данными (`data\orders.json`, `data\users.json` и `data\companies.json`), секцию `output` из `webpack.config.js`, а также команды запуска проекта из секции `scripts` файла `package.json`. Изменения в этих файлах могут повлечь за собой нарушения в работе системы автоматической проверки и задание не будет оценено.


## Дополнительные задачи

 - Для реализации CSS-стилей можно использовать любой css-фреймворк - например, [Bootstrap](https://getbootstrap.com/)
 - Организовать асинхронную загрузку данных посредством вызовов к API, которое будет доступно по адресу `http://localhost:9000/api/%имя_файла%` после запуска проекта.
 - Реализовать возможность переключения валюты для данных в денежном формате. Данные для конвертации валют брать отсюда - https://api.exchangeratesapi.io/latest, базовой валютой считать USD.
