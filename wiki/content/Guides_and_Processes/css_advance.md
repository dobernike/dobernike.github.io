# CSS Advance

# CSS preprocesors

## Post & Pre Processing CSS

[https://habr.com/ru/post/434098/](https://habr.com/ru/post/434098/)

### Препроцессоры

Какие же есть препроцессоры?

Существует несколько представителей, например: Sass(.sass, .scss), Less(.less) и Stylys(.stylus).
Также среди препроцессоров можно отдельно выделить PostCSS(а точнее его парсер SugarSS и плагин PreCSS). Забегая далеко вперед, скажу что да, PostCSS — не только постпроцессор.

#### Возможности

Переменные

```css
//style.scss

$color: #fff;
span {
  color: $color;
  background: $color;
}

//style.css

span {
  color: #fff;
  background: #fff;
}
```

Вложенность

```css
//style.scss
.chat-area {
  width: 40%;
  &__button {
    // & - указатель на текущий селектор(в данном случае & = .chat-area)
    display: inline-block;
    height: 36px;
    width: 10px;
  }

  a {
    color: red;
  }
}

//style.css
.chat-area {
  width: 40%;
}
.chat-area__button {
  display: inline-block;
  height: 36px;
  width: 10px;
}
.chat-area a {
  color: red;
}
```

Миксины

```css
//style.scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  -ms-border-radius: $radius;
  border-radius: $radius;
}
.box {
  @include border-radius(10px);
}

//style.css
.box {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  border-radius: 10px;
}
```

Дополнительные функции

```css
//style.scss
$color: #202020;
h1,
h2 {
  color: lighten($color, 40%);
}

//style.css
h1,
h2 {
  color: #868686;
}
```

### Постпроцессоры

В контексте Css постпроцессор по сути тоже самое, что и препроцессор, но на вход постпроцессору дается не код написанный на языке препроцессора, а тоже css. То есть постпроцессор — это программа на вход которой дается css, а на выходе получается css. Пока не сильно понятно зачем это надо.

Объясню на конкретном примере работы PostCSS — единственного представителя постпроцессоров в контексте css.

PostCSS из коробки на самом деле не делает с CSS ничего. Он просто возвращает файл, который был дан ему на вход. Изменения начинаются, когда к PostCSS подключаются плагины.

Весь цикл работы PostCSS можно описать так:

Исходный файл дается на вход PostCSS и парсится
Плагин 1 что-то делает
...
Плагин n что-то делает
Полученный результат преобразовывается в строку и записывается в выходной файл

Рассмотрим же основные плагины, которые есть в экосистеме PostCSS

#### Плагины

Autoprefixer

Этот плагин настолько популярен, что многие считают, что они используют этот плагин, но не используют PostCSS. Они не правы.

```css
//in.css
div {
  display: flex;
}

//out.css
div {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
}
```

Autoprefixer добавляет браузерные префиксы к вашим правилам. Ничем не заменимый и один из самых важных плагинов, с которого и началась история PostCSS. Можно даже сказать, что имеет смысл поставить PostCss только ради этого плагина.

Preset Env

```css
//in.css
@custom-media --med (width <= 50rem);

@media (--med) {
  a:hover {
    color: color-mod(black alpha(54%));
  }
}

//out.css
@media (max-width: 50rem) {
  a:hover {
    color: rgba(0, 0, 0, 0.54);
  }
}
```

PostCSS Preset Env добавляет возможности, которые только обсуждаются в черновиках разработчиков css. В данном примере была реализована директива @custom-media, а так же функция color-mod. Начни использовать css будущего уже сегодня!

CSS Modules

Все эти BEM не для вас, но проблема с конфликтами имен классов все еще стоит? Тогда PostCSS предлагает другое решение.

```css
//in.css
.name {
  color: gray;
}

//out.css
.Logo__name__SVK0g {
  color: gray;
}
```

import './style.css'; // раньше
import styles from './style.css'; // сейчас

Short

```css
//in.css
.icon {
  size: 48px;
}

.canvas {
  color: #abccfc #212231;
}

//out.css
.icon {
  width: 48px;
  height: 48px;
}

.canvas {
  color: #abccfc;
  background-color: #212231;
}
```

PostCSS Short добавляет кучу сокращенных записей для различных правил. Код становится короче, а следовательно в нем меньше места для ошибок. Плюс повышается читаемость.

Auto Reset

```css
//in.css
div {
  margin: 10px;
}

a {
  color: blue;
}

//out.css
div,
a {
  all: initial;
}

div {
  margin: 10px;
}

a {
  color: blue;
}
```

PostCSS Auto Reset позволяет нам не создавать отдельный файл со сбросом всех стилей. Плагин создает для всех селекторов один большой селектор, куда помещает правила, сбрасывающее все стили. По умолчанию создается лишь правило all со значением initial. Это полезно в комбинации с плагином postcss-initial, который в свою очередь превращает это правило в портянку правил на 4 экрана. Впрочем все можно настроить и сделать сброс например таким:

```css
//out.css
div,
a {
  margin: 0;
  padding: 0;
}
div {
  margin: 10px;
}
a {
  color: blue;
}
```

SugarSS

```css
//in.sss
.parent
  color: white

.parent > .child
  color: black

//out.css
.parent {
  color: white;
}

.parent > .child {
  color: black;
}
```

SugarSS — парсер(не плагин!), который базируется на отступах, а не на фигурных скобках, как стандартный. Имеет отдельное расширение ".sss". Код написанный с помощью SugarSS по стилю схож со старым синтаксисом Sass, но без его примочек вроде переменных, миксинов, наследования и тд.

PreCSS

```css
//in.sss
$color: black

.parent
 .child
   color: $color

//Результат работы SugarSS
$color: black;

.parent {
 .child {
   color: $color
 }
}

//out.css
.parent .child {
   color: black
}
```

PreCSS как раз и добавляет те самые возможности препроцессоров о которых написано в первой половине статьи.

Stylelint

О Stylelint уже написано довольно много. Он попал в этот обзор, так как использует PostCSS, как парсер строк CSS файлов. Предположим у нас есть такой файл.

### Выводы

Препроцессоры добавляют очень много новой функциональности, которой нет в CSS. Однажды попробовав, вы с трудом вернетесь к обычному CSS.

PostCSS гораздо ближе к изначальному CSS, чем препроцессоры, но тем не менее при определенных подключенных плагинах может обладать той же функциональностью(и даже похожим синтаксисом). Новички верстальщики могут верстать даже не задумываясь, что верстают не на чистом CSS. Некоторые плагины(например Autoprefixer) не имеют аналогов в препроцессорном мире.

Никто не мешает использовать препроцессоры и PostCSS в связке. Вариант довольно неплох для проектов, которые уже используют препроцессоры и имеет место на жизнь.

Для новых же проектов я бы посоветовал использовать только PostCSS. Верстальщики привыкли к синтаксису препроцессора? Поставьте плагин PreCSS и парсер SugarSS. Нужна кроссбраузерность? Поставьте плагин Autoprefixer. Больше не нужна кроссбраузерность(например ваш проект обернули в электрон и он стал десктопным)? Просто удалите Autoprefixer! С PostCSS вы сможете, как с помощью конструктора, собрать именно то, что нужно вашему проекту.

---

# CSS Responsive design

## Основы отзывчивого веб-дизайна

[https://developers.google.com/web/fundamentals/design-and-ux/responsive/?hl=ru](https://developers.google.com/web/fundamentals/design-and-ux/responsive/?hl=ru)

Чтобы контролировать масштабирование окна просмотра в браузере, используйте метатег viewport.
Добавьте width=device-width, чтобы адаптировать ширину окна просмотра к экрану устройства.
Вставьте initial-scale=1, чтобы обеспечить соотношение 1:1 между пикселями CSS и независимыми пикселями устройства.
Чтобы страница была доступна, проверьте, не отключено ли пользовательское масштабирование.

<meta name="viewport" content="width=device-width, initial-scale=1.0">

Настроив initial-scale, вы также можете установить следующие атрибуты для области просмотра:

minimum-scale
maximum-scale
user-scalable
После их настройки устанавливается ограничение на изменение масштаба области просмотра, если из-за этого могут стать недоступны специальные возможности.

Не используйте крупные элементы с фиксированной шириной.
Для корректного отображения контента не ограничивайте его определенной шириной области просмотра.
Используйте медиазапросы CSS, чтобы указать разные стили для больших и маленьких экранов.

Медиазапросы также позволяют выбрать стиль на основе характеристик устройства.
Добавьте min-width вместо min-device-width для корректного отображения сайта на большинстве устройств.
Чтобы не нарушать структуру макета, используйте элементы относительных размеров.

Например, вы можете поместить в медиазапрос print все стили, необходимые для печати:

<link rel="stylesheet" href="print.css" media="print">

Избегайте правила @import!
Избегайте правила @import, которое позволяет копировать стили из других CSS-файлов. Оно увеличивает число соединений с сервером, поскольку файл, на который вы ссылаетесь, тоже нужно скачать и проанализировать.

```css
@media print {
/_ print style sheets go here _/
}

@import url(print.css) print;
```

```css
@media (query) {
  /* CSS Rules used when query matches */
}
```

Атрибут Результат
min-width Правило применяется к браузеру, ширина которого больше значения, указанного в запросе.
max-width Правило применяется к браузеру, ширина которого меньше значения, указанного в запросе.
min-height Правило применяется к браузеру, высота которого больше значения, указанного в запросе.
max-height Правило применяется к браузеру, высота которого меньше значения, указанного в запросе.
orientation=portrait Правило применяется к браузеру, высота которого не меньше его ширины.
orientation=landscape Правило применяется к браузеру, ширина которого больше высоты.

```html
<link rel="stylesheet" media="(max-width: 640px)" href="max-640px.css" />
<link rel="stylesheet" media="(min-width: 640px)" href="min-640px.css" />
<link rel="stylesheet" media="(orientation: portrait)" href="portrait.css" />
<link rel="stylesheet" media="(orientation: landscape)" href="landscape.css" />
<style>
  @media (min-width: 500px) and (max-width: 600px) {
    h1 {
      color: fuchsia;
    }

    .desc:after {
      content: " In fact, it's between 500px and 600px wide.";
    }
  }
</style>
```

При ширине браузера от 0 пикс. до 640 пикс. применяется max-640px.css.
При ширине браузера от 500 пикс. до 600 пикс. применяются стили из @media.
При ширине браузера от 640 пикс. и выше применяется min-640px.css.
Если в браузере ширина больше высоты, применяется landscape.css.
Если в браузере высота больше ширины, применяется portrait.css.

Not recommended — fixed width

```css
div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}
```

Recommended — responsive width

```css
div.fullWidth {
  width: 100%;
}
```

Создавайте контрольные точки на основе контента, а не для отдельных устройств, продуктов или брендов.
Сначала разработайте дизайн для самого маленького мобильного устройства, а затем переходите к версиям для больших экранов.
Ограничьте длину строк 70-80 символами.

```html
<link rel="stylesheet" href="weather.css" />
<link rel="stylesheet" media="(max-width:600px)" href="weather-2-small.css" />
<link rel="stylesheet" media="(min-width:601px)" href="weather-2-large.css" />
```

Выбор второстепенных контрольных точек (если необходимо)

```css
@media (min-width: 360px) {
  body {
    font-size: 1em;
  }
}

@media (min-width: 500px) {
  .seven-day-fc .temp-low,
  .seven-day-fc .temp-high {
    display: inline-block;
    width: 45%;
  }

  .seven-day-fc .seven-day-temp {
    margin-left: 5%;
  }

  .seven-day-fc .icon {
    width: 64px;
    height: 64px;
  }
}
```

```css
@media (min-width: 700px) {
  .weather-forecast {
    width: 700px;
  }
}
```

Оптимизация текста для чтения

```css
@media (min-width: 575px) {
  article {
    width: 550px;
    margin-left: auto;
    margin-right: auto;
  }
}
```

Никогда не скрывайте контент полностью

---

## Introduction To Responsive Web Design -

[https://www.youtube.com/watch?v=srvUrASNj0s](https://www.youtube.com/watch?v=srvUrASNj0s)

⭐️ Course content ⭐️
⌨️ (00:00:00) Intro
⌨️ (00:02:59) 1. Starting to think responsively
⌨️ (00:06:01) 2. CSS Units

- absolute
  pixels (px)
  pt, cm, mm, in, etc

- relative

  to font-size
  (em and rem)

  to the viewport
  (vw, vh, vmin, vmax)

- percentage
  relative to their parent

⌨️ (00:09:16) 3. CSS Units - Percentage

<div style="width: 200px">
// 50% of their parent = 100px
    <div style="width: 50%">
        // 50% of their parent = 50px
        <div style="width: 50%"></div>
    </div>
</div>

<div>
// 50% of their parent
    <div style="width: 50%"></div>
</div>

⌨️ (00:15:14) 4. Controlling the width of images

```css
img {
  width: 100%;
}
```

⌨️ (00:20:05) 5. min-width and max-width

```css
.container {
  max-width: 620px;
  width: 90%;
  margin: 0 auto;
}
```

⌨️ (00:22:54) 6. CSS Units - The em unit

em are relative to their parent`s font-size

<section>
    <ul>
        <li>asf</li>
        <li>dsg</li>
        <li>hgfh</li>
        <li>lkjl</li>
    </ul>
</section>

```css
body {
  font-size: 25px;
}

section {
  font-size: 20px;
}

ul {
  /* 1.5em = 150% */
  font-size: 1.5em; // 20px * 150%;
}
```

⌨️ (00:28:25) 7. The problem with ems

when we use them for the font-size - a cascading effect

⌨️ (00:30:58) 8. The Solution: Rems

rem - Root Em
The root of an HTML page is always the html element

<section>
    <ul>
        <li>asf</li>
        <li>dsg</li>
        <li>hgfh</li>
        <li>lkjl</li>
    </ul>
</section>

```css
html {
  font-size: 16px; // default
}

body {
  font-size: 1rem;
}

section {
  font-size: 2rem;
}

ul {
  font-size: 1.5rem; // 16 * 150%;
}
```

⌨️ (00:35:46) 9. Picking which unit to use

pixels used to cause a lot of promblems, as they were a fixed unit

Now, it follows the reference pixel

So I`m going to stick with those.

My general rule of thumb:

- Font-size = rem
- Padding and margin = em
- Widths = em or percentage

⌨️ (00:39:18) 10. ems and rems - an example

```html
<h1>Some</h1>

<a class="button btn-big" ... />
<a class="button btn-small" ... />
```

```css
h1 {
  font-size: 3rem;
  margin-bottom: 2em;
}

.button {
  /* ... */
  padding: 0.5em 1.25em;
}

.btn-big {
  font-size: 1.5rem;
}

.btn-small {
  font-size: 0.75rem;
}
```

⌨️ (00:47:10) 11. Flexbox refresher and setting up some HTML

Elements normally have a `display: block` or a `display: inline` as a default from the browser.

- Block elements
  div, header,footer, main, etc.
  h1 -> h6
  p

- Inline elements
  a
  strong
  em
  span

we can change display to flex `display: flex`

```html
<div class="container">
  <h1>Fancy <span>span</span> header</h1>
  <img src="" alt="" />

  <div class="columns">
    <div class="col col-1">
      <h2>some h2</h2>
      <p>some p</p>
    </div>
    <div class="col col-2">
      <h2>some h2</h2>
      <p>some p</p>
      <p>some p</p>
    </div>
    <div class="col col-1 col-bg">
      <p>some p</p>
    </div>
  </div>

  <div class="columns">
    <div class="col col-3">
      <h2>some h2</h2>
      <p>some p</p>
    </div>
    <div class="col col-1 col-bg">
      <p>some p</p>
    </div>
  </div>
</div>
```

⌨️ (00:55:02) 12. Basic Styles and setting up the columns

```css
body {
  font-size: 1.125rem;
  color: #707070;
  margin: 0;
}

/* Typography */

h1 {
  font-size: 3rem;
  color: #212614;
  text-align: center;
}

h1 span {
  color: #b7832f;
}

h2 {
  font-size: 1.5rem;
}

/* Layout */

img {
  max-width: 100%;
}

p {
  margin-top: 0;
}

.container {
  width: 95%;
  max-width: 980px;
  margin: 0 auto;
}

.columns {
  display: flex;
  margin: 1em 0;
}
```

⌨️ (01:02:09) 13. Adding the background color

```css
.col-bg {
  background: #212624;
  color: #fff;
  padding: 1em;
}
```

⌨️ (01:06:21) 14. Setting the column widths

```css
.col-1 {
  width: 25%;
}

.col-2 {
  width: 50%;
}

.col-3 {
  width: 75%;
}
```

⌨️ (01:10:00) 15. Spacing out the columns

```css
.columns {
  display: flex;
  justify-content: space-between;
  /* justify-content: space-around; */
  /* justify-content: space-evenly; */
  margin: 1em 0;
}

.col-1 {
  /* width: 25%; */
  width: 20%;
}

.col-2 {
  /* width: 50%; */
  width: 45%;
}

.col-3 {
  /* width: 75%; */
  width: 70%;
}
```

⌨️ (01:14:27) 16. Controlling the vertical position of flex items

align-items

```css
.columns {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* align-items: flex-end;
  align-items: center;
  align-items: baseline; */
  margin: 1em 0;
}

.col-1 {
  width: 20%;
}

.col-2 {
  width: 45%;
}

.col-3 {
  width: 70%;
}
```

⌨️ (01:19:42) 17. Media Query basics

Media queries let us add new styles that target only specific conditions

@media () { ... }

@media media-type and (media-features) { ... }

- Media type
  Screen | @media screen {...}
  Print | @media print {...}
  Speech | @media speech {...}

- Media condition
  Widths | @media (min-width: 600px) { ... }
  Orientation | @media (landscape) { ... }
  Specific features | @media (hover) { ... }

Both media types and conditions are optional
For example, we can target only screens
@media screen { ... }
or
@media (min-width: 600px) { ... }
or combine using `and`
@media screen and (min-width: 960px) { ... }
@media screen and (orientation: portrait) { ... }

```css
body {
  background: pink;
}

// min width of 400 to 649px
@media (min-width: 400px) and (max-width: 649px) {
  body {
    background: purple;
  }
}

// min width of 650 and bigger
@media (min-width: 650px) and (orientation: landscape) {
  body {
    background: orange;
  }
}

/* // min width of 650 and landscape
@media (min-width: 650px) and (orientation: landscape) {
  body {
    background: orange;
  }
} */
```

⌨️ (01:29:50) 18. Making out layout responsive with flex-direction

```css
.columns {
  display: flex;
  justify-content: space-between;
  margin: 1em 0;
}

@media (max-width: 600px) {
  .columns {
    flex-direction: column;
  }
}

.col-1 {
  width: 20%;
}

.col-2 {
  width: 45%;
}

.col-3 {
  width: 70%;
}

@media (max-width: 600px) {
  /* .columns {
    flex-direction: column;
  } */

  .col-1,
  .col-2,
  .col-3 {
    width: 100%;
  }
}
```

⌨️ (01:36:45) 19. flex-direction explained

We are switch main axis

display: flex;
flex-direction: column; // row

justify-content `will now work vertically`

aling-items `will now work horizontally`

⌨️ (01:39:54) 20. Creating a navigation

```html
<header>
  <div class="container container-flex">
    <div class="site-title">
      <h1>Living the social life</h1>
      <p class="subtitle">A blog exploring animation in life</p>
    </div>
    <nav>
      <ul>
        <li><a href="#" class="current-page">Home</a></li>
        <li><a href="#">About me</a></li>
        <li><a href="#">Recent-posts</a></li>
      </ul>
    </nav>
  </div>
</header>
```

⌨️ (01:44:40) 21. Using flexbox to start styling our navigation

```css
header {
  /* text-align: center; */
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
}

nav li {
  margin-left: 1em;
  /* margin: 0 1em; */
}

nav a {
}

nav a:hover {
}
```

⌨️ (01:52:19) 22. Making out navigation look good

```css
body {
  margin: 0;
  font-family: "Ubuntu", sans-serif;
}

/* Typography */

h1 {
  font-family: "Lora", sans-serif;
  font-weight: 400;
  color: #143774;
  font-size: 2rem;
  margin: 0;
}

.subtitle {
  font-weight: 700;
  color: #1792d2;
  font-size: 0.75rem;
  margin: 0;
}

/* Layout */

header {
  background: pink;
  padding: 2em 0;
}

/* navigation */

nav a {
  text-decoration: none;
  color: #707070;
  font-weight: 700;
}

nav a:hover,
nav a:focus {
  color: #1792d2;
}
```

⌨️ (01:59:38) 23. Adding the underline

```css
nav a {
  /* ... */

  padding: 0.25em 0;
}

.current-page {
  border-bottom: 1px solid #707070;
}

.current-page:hover {
  color: #707070;
}
```

⌨️ (02:03:40) 24. A more complicated navigation

```css
.container {
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
}

.container-flex {
  display: flex;
  justify-content: space-between;
}
```

⌨️ (02:10:25) 25. Making the navigation responsive

```css
@media (max-width: 675px) {
  .container-flex {
    flex-direction: column;
  }

  header {
    text-align: center;
  }
}

@media (max-width: 675px) {
  nav ul {
    flex-direction: column;
  }

  nav li {
    margin: 0.5em 0;
  }
}
```

⌨️ (02:17:20) 26. Taking a look at the rest of the project
⌨️ (02:21:34) 27. Setting up the structure

```html
<html>
  <head> </head>
  <body>
    <header>
      <div class="container container-flex">
        <div class="site-title">
          <h1>Living the social life</h1>
          <p class="subtitle">A blog exploring animation in life</p>
        </div>
        <nav>
          <ul>
            <li><a href="#" class="current-page">Home</a></li>
            <li><a href="#">About me</a></li>
            <li><a href="#">Recent-posts</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <div class="container container-flex">
      <main role="main"></main>
      <aside class="sidebar"></aside>
    </div>

    <footer>
      <p><strong>Living the Simple Life</strong></p>
      <p>Copyright 2020</p>
    </footer>
  </body>
</html>
```

⌨️ (02:29:59) 28. Featured article structure

```html
<!-- main -->
<article class="article-featured">
  <h2 class="article-title"></h2>
  <img src="" alt="" class="article-image" />
  <p class="article-info"></p>
  <p class="article-body"></p>
  <a href="#" class="article-read-more"></a>
</article>
<article class="article-recent"></article>
<article class="article-recent"></article>
<article class="article-recent"></article>
<!-- /main -->
```

⌨️ (02:35:07) 29. The home page - HTML for the recent articles

```html
<!-- main -->
<!-- <article class="article-featured">...</article>  -->
<article class="article-recent">
  <div class="article-recent-main">
    <h2 class="article-title"></h2>
    <p class="article-body"></p>
    <a href="#" class="article-read-more"></a>
  </div>
  <div class="article-recent-secondary">
    <img src="" alt="" class="article-image" />
    <p class="article-info"></p>
  </div>
</article>

<article class="article-recent">
  <div class="article-recent-main">
    <h2 class="article-title"></h2>
    <p class="article-body"></p>
    <a href="#" class="article-read-more"></a>
  </div>
  <div class="article-recent-secondary">
    <img src="" alt="" class="article-image" />
    <p class="article-info"></p>
  </div>
</article>

<article class="article-recent">
  <div class="article-recent-main">
    <h2 class="article-title"></h2>
    <p class="article-body"></p>
    <a href="#" class="article-read-more"></a>
  </div>
  <div class="article-recent-secondary">
    <img src="" alt="" class="article-image" />
    <p class="article-info"></p>
  </div>
</article>
<!-- /main -->
```

⌨️ (02:37:39) 30. Home Page - HTML for the aside

```html
<!-- body -->
<aside class="sidebar">
  <div class="sidebar-widget">
    <h2 class="widget-title"></h2>
    <img src="#" alt="" class="widget-image" />
    <p class="widget-body"></p>
  </div>

  <div class="sidebar-widget">
    <h2 class="widget-title"></h2>
    <div class="widget-recent-post">
      <h3 class="widget-recent-post-title"></h3>
      <img src="#" alt="" class="widget-image" />
    </div>
    <div class="widget-recent-post">
      <h3 class="widget-recent-post-title"></h3>
      <img src="#" alt="" class="widget-image" />
    </div>
    <div class="widget-recent-post">
      <h3 class="widget-recent-post-title"></h3>
      <img src="#" alt="" class="widget-image" />
    </div>
  </div>
</aside>
<!-- /body -->
```

⌨️ (02:43:45) 31. Starting the CSS for our page

```css
body {
  /* ... */

  font-size: 1.125rem;
  font-weight: 300;
}

/* Typography */

h1,
h2,
h3 {
  font-family: "Lora", sans-serif;
  font-weight: 400;
  color: #143774;
}

h1 {
  font-size: 2rem;
  margin: 0;
}

a {
  color: #1792d2;
}

a:hover,
a:focus {
  color: #143774;
}

strong {
  font-weight: 700;
}

.subtitle {
  font-weight: 700;
  color: #1792d2;
  font-size: 0.75rem;
  margin: 0;
}

.article-title {
  font-size: 1.5rem;
}

.article-read-more,
.article-info {
  font-size: 0.875rem;
}

.article-read-more {
  color: #1792d2;
  text-decoration: none;
  font-weight: 700;
}

.article-read-more:hover,
.article-read-more:focus {
  color: #143774;
  text-decoration: none;
}
```

⌨️ (02:59:15) 32. Starting the layout - looking at the big picture

```css
img {
  max-width: 100%;
  display: block;
}

main {
  width: 75%;
}

aside {
  width: 25%;
}
```

⌨️ (03:07:48) 33. Starting to think mobile first

```css
@media (min-width: 675px) {
  .container-flex {
    flex-direction: row;
  }

  main {
    width: 75%;
  }

  aside: {
    width: 20%;
  }
}
```

⌨️ (03:10:37) 34. Styling the featured article

```css
.article-info {
  margin: 2em 0;
}

/* articles */

.article-featured {
  border-bottom: #707070 1px solid;
  padding-bottom: 2em;
  margin-bottom: 2em;
}
```

⌨️ (03:17:03) 35. Changing the visual order with flex box

```css
h1,
h2,
h3 {
  /* ... */

  margin-top: 0;
}

.article-recent {
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
}

.article-recent-main {
  order: 2;
}

.article-recent-secondary {
  order: 1;
}
```

⌨️ (03:22:19) 36. Playing with the title’s position, and the downsides of negative margins

```css
/* @media (min-width: 500px) {
  .article-recent-main {
    margin-top: -2.5em;
  }

  .article-info {
      text-align: right;
  }
} */
```

⌨️ (03:27:05) 37. Changing the visual order with flex box

```css
.article-image {
  width: 100%;
  min-height: 250px;
  object-fit: cover;
  /* object-position: left; */
}
```

⌨️ (03:31:00) 38. Styling recent articles for large screens

```css
header {
  /* ... */
  margin-top: 0;
}

@media (min-width: 675px) {
  .article-recent {
    flex-direction: row;
    justify-content: space-between;
  }

  .article-recent-main {
    width: 68%;
  }

  .article-recent-secondary {
    width: 30%;
  }

  .article-featured {
    display: flex;
    flex-direction: column;
  }

  .article-image {
    order: -2;
  }

  .article-info {
    order: -1;
  }
}
```

⌨️ (03:38:50) 39. Setting up the widgets and talking breakpoints

```css
@media (min-width: 675px) {
  main {
    width: 70%;
  }

  aside {
    width: 25%;
    min-width: 200px;
    margin-left: 1em;
  }
}

/* widgets */
.sidebar-widget {
  border: 20px solid #efefef;
  margin-bottom: 2em;
  padding: 1em;
}
```

⌨️ (03:45:41) 40. Using a new pseudo-class to wrap-up the homepage

```css
.widget-title,
.widget-recent-post-title {
  font-size: 1rem;
}

.widget-title {
  font-family: "Ubuntu", sans-serif;
  font-weight: 700;
}

.widget-recent-post {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #707070;
  margin-bottom: 1em;
}

.widget-recent-post:last-child {
  border: 0;
  margin: 0;
}

.widget-image {
  order: -1;
}

footer {
  background: #143774;
  color: white;
  text-align: center;
  padding: 3em 0;
}
```

⌨️ (03:53:12) 41. Creating the recent posts page

```html
<a href="index.html" ... /> <a href="page-index.html" ... />
```

⌨️ (03:56:39) 42. Setting up the About Me page

make page

⌨️ (04:00:54) 43. Fixing up some loose ends

```css
image-full {
  min-height: 300px;
  width: 100%;
  object-fit: cover;
  margin-bottom: 2em;
}

h3 {
  color: #1792d2;
}

.widget-recent-post-title {
  color: black;
}
```

⌨️ (04:05:27) 44. Important Note. The viewport meta tag

<meta name="viewport" content="width=device-width, initial-scale=1">
in head

⌨️ (04:09:10) 45. Module wrap up

flexbox!
justify-content & align-items
flex-direction (switch main axis)
media queries

⌨️ (04:12:24) Outro
