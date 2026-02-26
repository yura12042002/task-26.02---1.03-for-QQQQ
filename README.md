# Учебный план: массивы и объекты в JavaScript (4 дня)

**Уровень:** начинающий+ / средний
**Цель:** закрепить методы массивов, работу с объектами, чистые функции без мутаций

---

## Набор данных

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

## Обзор плана

| День | Тема | Задачи | Время |
|------|------|--------|-------|
| **1** | reduce: аккумуляция и подсчёт | sum, countByRole (×2), countBy, groupByAge | 60–90 мин |
| **2** | универсальные утилиты | groupBy, indexBy, pluck, getAdults | 60–100 мин |
| **3** | find/some/every/sort + orders | findFirstByRole, hasAnyRole, allFromCity, sortByAge, sumOrdersByCurrency, countOrdersByStatus | 70–110 мин |
| **4** | композиция и рефакторинг | ordersByUser, buildReport, рефакторинг дублирования | 80–120 мин |

---

## Карта функций

### Универсальные утилиты (работают с любыми данными):
- `sum(numbers)` — сумма чисел
- `countBy(array, key)` — подсчёт по ключу
- `groupBy(array, key)` — группировка по ключу
- `indexBy(array, key)` — индексация по ключу
- `pluck(array, key)` — извлечение значений по ключу

### Доменные функции (привязаны к users/orders):
- `countByRole(users)` → обёртка над `countBy`
- `groupByAge(users)` → обёртка над `groupBy`
- `getAdults(users, minAge)` — filter
- `findFirstByRole(users, role)` — find
- `hasAnyRole(users, role)` — some
- `allFromCity(users, city)` — every
- `sortByAge(users, direction)` — sort без мутации
- `sumOrdersByCurrency(orders)` — reduce
- `countOrdersByStatus(orders)` → обёртка над `countBy`
- `ordersByUser(orders)` → обёртка над `groupBy`
- `buildReport(users, orders)` — композиция всех функций

---

## Ключевые принципы (сквозные на все 4 дня)

1. **Не мутировать** входные массивы и объекты
2. **reduce с initialValue** — всегда
3. **Пустой массив** — корректная обработка без ошибок
4. **Один проход** — где указано, без вложенных циклов
5. **Композиция** — переиспользовать функции, а не дублировать

---

## Файлы

- [День 1](./day1.md) — reduce: аккумуляция и подсчёт
- [День 2](./day2.md) — универсальные утилиты: groupBy, indexBy, pluck
- [День 3](./day3.md) — find, some, every, sort + reduce по orders
- [День 4](./day4.md) — композиция, buildReport, рефакторинг
