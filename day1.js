// =====================================================
// День 1 — строим объекты из массивов
// =====================================================

const { test, section, summary } = require("./testlib");

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

// =====================================================
// Задача 1 — sum(numbers)
//
// Вернуть сумму чисел в массиве.
//
// sum([1, 2, 3])   → 6
// sum([])          → 0
// sum([-5, 5])     → 0
// =====================================================

function sum(numbers) {
  // твой код
}

// =====================================================
// Задача 2 — countBy(array, key)
//
// Подсчитать количество элементов по значению ключа.
// Нет ключа у элемента → считать как "unknown".
//
// countBy(users, "role")       → { admin: 2, user: 2, moderator: 1 }
// countBy(users, "city")       → { Moscow: 3, Perm: 2 }
// countBy([], "x")             → {}
// countBy([{a:1}, {b:2}], "a") → { "1": 1, unknown: 1 }
// =====================================================

function countBy(array, key) {
  // твой код
}

// =====================================================
// Задача 3 — groupBy(array, key)
//
// Сгруппировать элементы по значению ключа.
// Нет ключа → группа "unknown".
// Порядок внутри групп = порядку в исходном массиве.
//
// groupBy(users, "role") → {
//   admin: [Alice, Charlie],
//   user: [Bob, Eva],
//   moderator: [David]
// }
// groupBy([], "x") → {}
// =====================================================

function groupBy(array, key) {
  // твой код
}

// =====================================================
// Задача 4 — indexBy(array, key)
//
// Объект-лукап: { значениеКлюча: элемент }.
// Дубликаты — последний перетирает предыдущий.
//
// indexBy(users, "id")  → { "1": Alice, "2": Bob, ... }
// indexBy(users, "age") → { "22": Eva, "30": Charlie, "35": David }
// indexBy([], "id")     → {}
// =====================================================

function indexBy(array, key) {
  // твой код
}

// =====================================================
// ТЕСТЫ
// =====================================================

section("sum");
test("сумма [1,2,3]", sum([1, 2, 3]), 6);
test("пустой массив", sum([]), 0);
test("один элемент", sum([10]), 10);
test("отрицательные", sum([-1, -2, -3]), -6);
test("ноль в сумме", sum([-5, 5]), 0);

section("countBy");
test("users по role", countBy(users, "role"), { admin: 2, user: 2, moderator: 1 });
test("users по city", countBy(users, "city"), { Moscow: 3, Perm: 2 });
test("orders по status", countBy(orders, "status"), { created: 2, confirmed: 2, cancelled: 1 });
test("пустой массив", countBy([], "role"), {});
test("отсутствующий ключ → unknown", countBy([{ a: 1 }, { b: 2 }, { a: 1 }], "a"), { "1": 2, unknown: 1 });
test("все без ключа", countBy(users, "salary"), { unknown: 5 });
test("falsy не уходят в unknown", countBy([{ a: 0 }, { a: "" }, { a: false }], "a"), { "0": 1, "": 1, "false": 1 });

section("groupBy");
test("users по role", groupBy(users, "role"), {
  admin: [users[0], users[2]], user: [users[1], users[4]], moderator: [users[3]],
});
test("users по city", groupBy(users, "city"), {
  Moscow: [users[0], users[3], users[4]], Perm: [users[1], users[2]],
});
test("orders по currency", groupBy(orders, "currency"), {
  USD: [orders[0], orders[1], orders[4]], EUR: [orders[2], orders[3]],
});
test("orders по userId", groupBy(orders, "userId"), {
  "1": [orders[0], orders[4]], "2": [orders[1], orders[2]], "3": [orders[3]],
});
test("пустой массив", groupBy([], "x"), {});
test("нет ключа → unknown", groupBy([{ a: 1 }, {}, { a: 2 }], "a"), {
  "1": [{ a: 1 }], unknown: [{}], "2": [{ a: 2 }],
});

section("indexBy");
test("users по id", indexBy(users, "id"), {
  "1": users[0], "2": users[1], "3": users[2], "4": users[3], "5": users[4],
});
test("пустой массив", indexBy([], "id"), {});
test("дубликаты — последний побеждает",
  indexBy([{ id: 1, v: "a" }, { id: 1, v: "b" }], "id"),
  { "1": { id: 1, v: "b" } }
);
test("users по age (дубликаты)", indexBy(users, "age"), {
  "30": users[2], "22": users[4], "35": users[3],
});

section("иммутабельность");
const usersCopy = JSON.parse(JSON.stringify(users));
const ordersCopy = JSON.parse(JSON.stringify(orders));
countBy(users, "role"); groupBy(users, "role"); indexBy(users, "id");
test("users не мутированы", users, usersCopy);
test("orders не мутированы", orders, ordersCopy);

summary();
