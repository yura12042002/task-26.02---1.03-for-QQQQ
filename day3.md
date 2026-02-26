# День 3 — find, some, every, sort + reduce по orders

**Время:** 70–110 мин
**Минимум:** задачи 9–12 (find/some/every/sort)
**Идеал:** все 6 задач + самопроверка

---

## Цель дня

1. Освоить методы поиска и проверки: `find`, `some`, `every` — понять, что они останавливаются раньше, чем `filter`
2. Научиться сортировать без мутации исходного массива
3. Применить `reduce` к данным `orders` (другая структура — проверка переноса навыка)

---

## Задача 9 — `findFirstByRole(users, role)`

**Что сделать:** найти и вернуть первого пользователя с указанной ролью.

**Обязательный метод:** `find`

**Правила:**
- Если пользователь не найден → вернуть `undefined` (не `null`, не `""`, не `false`)
- Не мутировать входные данные
- Возвращает сам объект, не имя

**Критерии "готово":**
1. `findFirstByRole(users, "admin")` → `{ id: 1, name: "Alice", ... }`
2. `findFirstByRole(users, "user")` → `{ id: 2, name: "Bob", ... }` (первый, не Eva)
3. `findFirstByRole(users, "ceo")` → `undefined`
4. `findFirstByRole([], "admin")` → `undefined`
5. Используется `find`

**Крайние случаи:**
- `findFirstByRole([], "admin")` → `undefined`
- `findFirstByRole(users, "ceo")` → `undefined` (нет такой роли)
- Несколько совпадений → возвращается именно первый

**Типовые ошибки:**
1. Использует `filter` вместо `find` — возвращает массив вместо объекта
2. Пишет `return null` или `return false` вместо `undefined` при отсутствии
3. Забывает, что `find` сам возвращает `undefined` — ставит лишний `if` после `find`

**Мини-проверка:**

```js
findFirstByRole(users, "admin");
// → { id: 1, name: "Alice", role: "admin", age: 30, city: "Moscow" }

findFirstByRole(users, "moderator");
// → { id: 4, name: "David", role: "moderator", age: 35, city: "Moscow" }

findFirstByRole(users, "ceo");
// → undefined

findFirstByRole([], "admin");
// → undefined
```

---

## Задача 10 — `hasAnyRole(users, role)`

**Что сделать:** проверить, есть ли хотя бы один пользователь с указанной ролью.

**Обязательный метод:** `some`

**Правила:**
- Возвращает `boolean` (`true` / `false`)
- Не делает лишних проходов (some останавливается при первом совпадении)

**Критерии "готово":**
1. `hasAnyRole(users, "admin")` → `true`
2. `hasAnyRole(users, "ceo")` → `false`
3. `hasAnyRole([], "admin")` → `false`
4. Используется `some`
5. Возвращает `boolean`, не объект

**Крайние случаи:**
- `hasAnyRole([], "admin")` → `false`
- `hasAnyRole(users, "moderator")` → `true` (даже если только один)

**Типовые ошибки:**
1. Использует `filter(...).length > 0` — проходит весь массив вместо остановки на первом
2. Использует `find` — возвращает объект/undefined вместо boolean
3. Забывает `return` — `some` работает, но результат не возвращается из функции

**Мини-проверка:**

```js
hasAnyRole(users, "admin");      // → true
hasAnyRole(users, "moderator");  // → true
hasAnyRole(users, "ceo");        // → false
hasAnyRole([], "admin");         // → false
```

---

## Задача 11 — `allFromCity(users, city)`

**Что сделать:** проверить, что **все** пользователи из указанного города.

**Обязательный метод:** `every`

**Правила:**
- Возвращает `boolean`
- Для пустого массива → `true` (и ученик должен **объяснить** почему)

**Критерии "готово":**
1. `allFromCity(users, "Moscow")` → `false`
2. `allFromCity(users, "Perm")` → `false`
3. `allFromCity([], "Moscow")` → `true`
4. Используется `every`
5. Ученик может словами объяснить, почему `every` на `[]` → `true`

**Крайние случаи:**
- `allFromCity([], "Moscow")` → `true` (vacuous truth)
- `allFromCity([{city: "Moscow"}], "Moscow")` → `true`
- `allFromCity([{city: "Moscow"}, {city: "Perm"}], "Moscow")` → `false`

**Типовые ошибки:**
1. Удивляется результату `true` на `[]` и пытается "исправить" — это не баг, это поведение `every`
2. Использует `filter` + проверку длины вместо `every`
3. Пишет `some` вместо `every` — путает "хотя бы один" и "все"

**Мини-проверка:**

```js
allFromCity(users, "Moscow");  // → false
allFromCity(users, "Perm");    // → false
allFromCity([], "Moscow");     // → true

const moscowUsers = users.filter(u => u.city === "Moscow");
allFromCity(moscowUsers, "Moscow");  // → true
```

---

## Задача 12 — `sortByAge(users, direction)`

**Что сделать:** отсортировать пользователей по возрасту. Параметр `direction` — `"asc"` (по возрастанию) или `"desc"` (по убыванию).

**Обязательный метод:** `sort` (на копии массива)

**Правила:**
- **Не мутировать входной массив** — создать копию перед сортировкой
- По умолчанию (если direction не передан) → `"asc"`
- Возвращает новый отсортированный массив

**Критерии "готово":**
1. `sortByAge(users, "asc")` → [Bob(22), Eva(22), Alice(30), Charlie(30), David(35)]
2. `sortByAge(users, "desc")` → [David(35), Alice(30), Charlie(30), Bob(22), Eva(22)]
3. `sortByAge(users)` → то же что `"asc"` (по умолчанию)
4. Исходный `users` не изменён после вызова
5. `sortByAge([], "asc")` → `[]`

**Крайние случаи:**
- `sortByAge([], "asc")` → `[]`
- `sortByAge([{age: 5}], "desc")` → `[{age: 5}]` (один элемент)
- Все одного возраста → порядок не важен, главное без ошибок

**Типовые ошибки:**
1. Вызывает `users.sort(...)` напрямую — мутирует входной массив. Нужно `[...users].sort(...)` или `users.slice().sort(...)`
2. Компаратор `(a, b) => a.age - b.age` не учитывает direction — работает только для `"asc"`
3. Компаратор возвращает boolean вместо числа — `sort` работает некорректно
4. Строковое сравнение: `sort()` без компаратора сортирует как строки ("22" > "100")

**Мини-проверка:**

```js
const sorted = sortByAge(users, "asc");
sorted.map(u => u.name);
// → ["Bob", "Eva", "Alice", "Charlie", "David"]

const sortedDesc = sortByAge(users, "desc");
sortedDesc.map(u => u.name);
// → ["David", "Alice", "Charlie", "Bob", "Eva"]

// Главное: оригинал не изменён
users[0].name; // → "Alice" (по-прежнему первый)

sortByAge([], "asc");
// → []
```

---

## Задача 13 — `sumOrdersByCurrency(orders)`

**Что сделать:** посчитать суммарный `amount` по каждой валюте. Вернуть объект `{ currency: total }`.

**Обязательный метод:** `reduce`

**Правила:**
- Один проход по массиву
- Не мутировать входные данные
- Пустой массив → `{}`

**Критерии "готово":**
1. `sumOrdersByCurrency(orders)` → `{ USD: 440, EUR: 200 }`
2. `sumOrdersByCurrency([])` → `{}`
3. Один вызов `reduce`, без вложенных циклов
4. Работает корректно при любом количестве валют

**Крайние случаи:**
- `sumOrdersByCurrency([])` → `{}`
- Все заказы в одной валюте → один ключ
- Одна запись → `{ "USD": 100 }`

**Типовые ошибки:**
1. Забыл `initialValue: {}` — первым аккумулятором станет объект заказа
2. `acc[currency] = amount` вместо `acc[currency] = (acc[currency] || 0) + amount` — перезаписывает вместо суммирования
3. Мутирует объекты заказов (добавляет поля)

**Мини-проверка:**

```js
sumOrdersByCurrency(orders);
// → { USD: 440, EUR: 200 }

sumOrdersByCurrency([]);
// → {}

sumOrdersByCurrency([{ amount: 50, currency: "RUB" }]);
// → { RUB: 50 }
```

---

## Задача 14 — `countOrdersByStatus(orders)`

**Что сделать:** посчитать количество заказов по каждому статусу.

**Обязательный метод:** `reduce`

**Правила:**
- Один проход
- Не мутировать входные данные
- Пустой массив → `{}`

**Критерии "готово":**
1. `countOrdersByStatus(orders)` → `{ created: 2, confirmed: 2, cancelled: 1 }`
2. `countOrdersByStatus([])` → `{}`
3. Один вызов `reduce`
4. Это по сути `countBy(orders, "status")` — если ученик заметит, отлично

**Крайние случаи:**
- `countOrdersByStatus([])` → `{}`
- Все заказы одного статуса → `{ confirmed: 5 }`

**Типовые ошибки:**
1. Те же что в `countBy` — забыл `initialValue`, `NaN` при первом обращении
2. Не замечает, что это частный случай `countBy` — дублирует код

**Мини-проверка:**

```js
countOrdersByStatus(orders);
// → { created: 2, confirmed: 2, cancelled: 1 }

countOrdersByStatus([]);
// → {}
```

---

## Контроль качества дня

### Чек-лист:

- [ ] `findFirstByRole` возвращает `undefined` (не null/false) при отсутствии
- [ ] `hasAnyRole` возвращает `boolean`, не объект
- [ ] `allFromCity([])` → `true` — и ученик объясняет почему
- [ ] `sortByAge` не мутирует вход — проверить: `const copy = [...users]; sortByAge(users); JSON.stringify(users) === JSON.stringify(copy)`
- [ ] `sumOrdersByCurrency` и `countOrdersByStatus` — ровно один `reduce`, без вложенных циклов
- [ ] Все функции корректно работают на `[]`

### Задания на самопроверку:

**Вопрос 1:** Почему `every([]) === true`? Объясни своими словами.

> Подсказка: «Все слоны в этой комнате — розовые» — истина, если слонов нет. Это называется «vacuous truth» (пустая истина). `every` проверяет «нет ли нарушителя», а если массив пуст — нарушителей нет.

**Вопрос 2:** Чем `find` лучше `filter[0]` для задачи «найти первый»?

> Ответ: `find` останавливается на первом совпадении. `filter` пройдёт весь массив и создаст новый массив, даже если нужен только один элемент.

**Вопрос 3:** Посмотри на `countOrdersByStatus`. Можно ли заменить его на `countBy(orders, "status")`? Если да — сделай.

---

## Итог дня 3

К концу дня ученик умеет:

- Использовать `find` для поиска одного элемента (с корректным `undefined`)
- Использовать `some` / `every` для проверок с ранней остановкой
- Объяснять поведение `every` на пустом массиве
- Сортировать без мутации через `[...arr].sort(...)`
- Писать числовой компаратор для `sort`
- Применять `reduce` к новой предметной области (orders)
- Замечать, что специализированная функция — частный случай универсальной
