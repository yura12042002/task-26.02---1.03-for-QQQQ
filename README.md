
---

## Набор данных (используй в задачах)

```js
const users = [
  { id: 1, name: "Alice", role: "admin", age: 30, city: "Moscow" },
  { id: 2, name: "Bob", role: "user", age: 22, city: "Perm" },
  { id: 3, name: "Charlie", role: "admin", age: 30, city: "Perm" },
  { id: 4, name: "David", role: "moderator", age: 35, city: "Moscow" },
  { id: 5, name: "Eva", role: "user", age: 22, city: "Moscow" },
];

const orders = [
  { id: "o1", userId: 1, status: "created", amount: 100, currency: "USD" },
  { id: "o2", userId: 2, status: "confirmed", amount: 250, currency: "USD" },
  { id: "o3", userId: 2, status: "cancelled", amount: 80, currency: "EUR" },
  { id: "o4", userId: 3, status: "confirmed", amount: 120, currency: "EUR" },
  { id: "o5", userId: 1, status: "created", amount: 90, currency: "USD" },
];
```

---

## Задачи (уровень 1, средняя сложность)

### 1) `sum(numbers)`
**Описание:** вернуть сумму элементов массива чисел.  
**Ограничение:** `reduce`.  
**Пример:** `sum([1,2,3]) -> 6`, `sum([]) -> 0`  
**Готово:** корректно обрабатывает `[]`.

---

### 2) `countByRole(users)`
**Описание:** вернуть объект `{role: count}`.  
**Ограничение:** `reduce` или `for..of` (сделать оба варианта).  
**Пример:** `{ admin: 2, user: 2, moderator: 1 }`  
**Готово:** не мутирует входной массив/объекты.

---

### 3) `countBy(array, key)`
**Описание:** универсальный подсчёт по ключу объекта.  
**Пример:** `countBy(users, "city") -> { Moscow: 3, Perm: 2 }`  
**Готово:** если ключ отсутствует — складывать в `"unknown"`.

---

### 4) `groupByAge(users)`
**Описание:** сгруппировать пользователей по возрасту.  
**Пример:** `{ 22: [...], 30: [...], 35: [...] }`  
**Требование:** значения — массив **пользователей**, а не имён.  
**Готово:** при повторяющемся возрасте **добавляет**, а не перезаписывает.

---

### 5) `groupBy(array, key)`
**Описание:** универсальная группировка по ключу.  
**Пример:** `groupBy(users, "role") -> { admin: [..], user: [..] }`  
**Готово:** порядок элементов внутри групп сохраняется.

---

### 6) `indexBy(array, key)`
**Описание:** сделать объект-индекс `{[valueOfKey]: item}`.  
**Пример:** `indexBy(users, "id") -> { "1": {..}, "2": {..} }`  
**Готово:** определено правило для дубликатов (последний перетирает или ошибка) и оно соблюдается.

---

### 7) `pluck(array, key)`
**Описание:** вернуть массив значений по ключу.  
**Пример:** `pluck(users, "name") -> ["Alice","Bob",...]`  
**Готово:** пропущенные значения не ломают функцию (либо `undefined` остаётся, либо фильтруется — выбрать правило).

---

### 8) `getAdults(users, minAge)`
**Описание:** вернуть пользователей, у которых `age >= minAge`.  
**Ограничение:** `filter`.  
**Пример:** `getAdults(users, 30) -> [Alice, Charlie, David]`  
**Готово:** корректно работает на `[]`.

---

### 9) `findFirstByRole(users, role)`
**Описание:** найти первого пользователя по роли.  
**Ограничение:** `find`.  
**Пример:** `findFirstByRole(users, "admin") -> {Alice...}`  
**Готово:** возвращает `undefined`, если не найден.

---

### 10) `hasAnyRole(users, role)`
**Описание:** проверить, есть ли хоть один пользователь с ролью.  
**Ограничение:** `some`.  
**Пример:** `hasAnyRole(users, "moderator") -> true`  
**Готово:** не делает лишних проходов.

---

### 11) `allFromCity(users, city)`
**Описание:** проверить, что **все** пользователи из заданного города.  
**Ограничение:** `every`.  
**Пример:** `allFromCity(users, "Moscow") -> false`  
**Готово:** корректно на пустом массиве (объяснить почему результат такой).

---

### 12) `sortByAge(users, direction)`
**Описание:** отсортировать пользователей по возрасту.  
**Ограничение:** `sort`, но входной массив не мутировать.  
**Пример:** `sortByAge(users, "asc")`  
**Готово:** исходный `users` остался без изменений.

---

### 13) `sumOrdersByCurrency(orders)`
**Описание:** вернуть `{currency: totalAmount}`.  
**Пример:** `{ USD: 440, EUR: 200 }`  
**Готово:** один проход (`reduce`).

---

### 14) `countOrdersByStatus(orders)`
**Описание:** вернуть `{status: count}`.  
**Пример:** `{ created: 2, confirmed: 2, cancelled: 1 }`  
**Готово:** один проход, тесты на разные статусы.

---

### 15) `ordersByUser(orders)`
**Описание:** вернуть `{userId: orders[]}`.  
**Пример:** `{ 1: [o1, o5], 2: [o2, o3], 3: [o4] }`  
**Готово:** корректно группирует, не перезаписывает.

---

### `buildReport(users, orders)`
**Описание:** собрать отчёт:

```js
{
  usersCountByRole: { ... },
  usersByCity: { ... },
  ordersCountByStatus: { ... },
  ordersSumByCurrency: { ... },
  ordersByUserId: { ... }
}
```# task-26.02---1.03-for-QQQQ
