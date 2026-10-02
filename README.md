# Mama Choli — версия 2

Отдельная версия сайта на основе существующего проекта. Публичная демонстрация:
[kwark88.github.io/mamacholi2.github.io](https://kwark88.github.io/mamacholi2.github.io/).

## Структура страницы

```html
<main>
  <section class="hero wrap">
    <h1>Тут завжди <span>по-домашньому.</span></h1>
    <!-- В href используется существующее HTTPS-приглашение кафе. -->
    <a class="button button-red social-link social-link-viber"
       href="{{ viber_url }}" target="_blank" rel="noopener noreferrer">
      Меню у Viber
    </a>
  </section>

  <section id="our-story" class="story wrap">
    <!-- Фотография витрины, заголовок и фотография зала сохранены. -->
    <p>Mama Choli — готова домашня їжа для тих, хто цінує час і обожнює смачно поїсти. Ми готуємо різноманітні страви, щоб домашній смак ніколи не набридав.</p>
  </section>

  <section class="cafe-highlights wrap" aria-label="У Mama Choli">
    <ol class="values cafe-highlights-list" role="list">
      <li><span class="value-number" aria-hidden="true">01</span>
        <h3>Щось новеньке</h3>
        <p>Меню їжі оновлюється кожні 2 дні. Актуальні страви — у Viber-спільноті.</p>
      </li>
      <li><span class="value-number" aria-hidden="true">02</span>
        <h3>Вечірня випічка</h3><p>−30% на випічку з 20:00 до 21:00.</p>
      </li>
      <li><span class="value-number" aria-hidden="true">03</span>
        <h3>Pet friendly</h3><p>Раді вам і вашим улюбленцям. Приходьте разом!</p>
      </li>
    </ol>
  </section>

  <!-- Секция доставки сохранена. -->
  <section class="coffee-banner">
    <div class="wrap coffee-grid"><!-- Заголовок, описание, меню напитков и стаканчики. --></div>
  </section>
</main>
```

Рабочие шаблоны: `templates/about.html`, `templates/partials/cafe-highlights.html`.
Общие стили остаются в `static/site.css`; новые правила — в `static/brand-v2.css`.

## Шрифты и слой паттерна

```css
:root {
  --font-body: 'Blogger Sans', 'Trebuchet MS', 'Segoe UI', sans-serif;
  --font-heading: 'Teenidle', 'Blogger Sans', sans-serif;
  --font-heading-weight: 500;
  --red: #D0393F;
  --coffee-pattern: url('pattern.svg');
}
body, p, span, li { font-family: var(--font-body); }
h1, h2, h3 {
  font-family: var(--font-heading);
  font-weight: var(--font-heading-weight);
}
h1 span, h2 span, h3 span { font-family: inherit; }
.coffee-banner { position: relative; isolation: isolate; background: var(--red); }
.coffee-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: var(--coffee-pattern);
  background-size: 240px 240px;
  opacity: .1;
  pointer-events: none;
  z-index: -1;
}
```

`pattern.svg` — сменный декоративный мотив с сердечками и линиями пара.
Можно заменить файл на окончательный паттерн брендбука без изменения HTML.
Сердечко основано на используемом в сайте SVGRepo / Ionicons (CC0);
источник указан в `static/icons/SOURCE.md`.
Прозрачность применена только к фону, а не к тексту и кнопкам.

Файлы шрифтов извлечены из предоставленного брендбука. Blogger Sans содержит
украинские буквы. TeenIdle — урезанный набор из 65 символов, метаданные Regular,
без кириллицы. CSS задаёт запрошенный вес 500 и семейство Teenidle; для отсутствующих
символов браузер использует Blogger Sans. Для точного Teenidle Medium нужен полный
лицензированный веб-шрифт: заменить `brand/teen-idle.ttf` и установить `font-weight: 500`
в его `@font-face`. Новые правила уже подключены к публичным страницам и редактору.

## Рекомендации по классам

Используется чистый CSS: дополнительная библиотека не нужна. `cafe-highlights-list`
задаёт три равные колонки и одну колонку при ширине до 760px; `value-number` оформляет
номера; `coffee-banner` управляет декоративным слоем; `social-link-viber` выделяет CTA.
Если проект позже переносится на другую систему:

| Элемент | Tailwind: эквивалентные классы | Bootstrap: эквивалентные классы |
| --- | --- | --- |
| Список преимуществ | `grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-11 list-none m-0 p-0` | `row row-cols-1 row-cols-md-3 g-4 list-unstyled m-0` |
| Пункт списка | `min-w-0 border-t pt-5` | `col border-top pt-4` |
| Заголовок | `[font-family:var(--font-heading)] font-medium` | свой класс `.brand-heading` с переменной шрифта и весом 500 |
| Основной текст | `[font-family:var(--font-body)]` | свой класс `.brand-body` с переменной шрифта |
| Кнопка Viber | `inline-flex items-center gap-4 rounded-lg bg-[#D0393F] px-5 py-3.5 text-white` | `btn` + собственный `.button-red` |

Для фонового псевдоэлемента лучше оставить отдельное CSS-правило и в Tailwind,
и в Bootstrap. При переносе Bootstrap номер, заголовок и описание помещаются в
внутренний блок пункта, чтобы линия не пересекала межколоночный отступ.

## Публикация

GitHub Pages содержит только публичный экспорт: HTML, CSS, JS, шрифты и фотографии.
Редактор меню и серверная база работают в локальной Django-версии и позже на хостинге.
В экспорт не входят база данных, данные входа, серверные секреты и черновики меню.
Все внутренние ссылки используют префикс `/mamacholi2.github.io/`.
