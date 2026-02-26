// =====================================================
// День 2 — запросы к данным
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
// Задача 5 — pluck(array, key)
//
// Вытащить массив значений по ключу.
// Нет ключа → undefined (не пропускать).
// Длина результата всегда === длина входа.
//
// pluck(users, "name")        → ["Alice", "Bob", "Charlie", "David", "Eva"]
// pluck([{a:1}, {b:2}], "a")  → [1, undefined]
// pluck([], "x")              → []
// =====================================================

function pluck(array, key) {
  // твой код
}

// =====================================================
// Задача 6 — filterWhere(array, conditions)
//
// Вернуть элементы, где ВСЕ условия совпадают (===).
// conditions — объект: { role: "admin", city: "Moscow" }.
// conditions = {} → все элементы проходят.
//
// filterWhere(users, { role: "admin" })               → [Alice, Charlie]
// filterWhere(users, { role: "admin", city: "Perm" }) → [Charlie]
// filterWhere(users, { role: "ceo" })                 → []
// filterWhere(users, {})                              → все 5
// =====================================================

function filterWhere(array, conditions) {
  // твой код
}

// =====================================================
// Задача 7 — findWhere(array, conditions)
//
// Найти ПЕРВЫЙ элемент, где все условия совпадают.
// Не найден → undefined.
//
// findWhere(users, { role: "admin" })               → Alice
// findWhere(users, { role: "admin", city: "Perm" }) → Charlie
// findWhere(users, { role: "ceo" })                 → undefined
// =====================================================

function findWhere(array, conditions) {
  // твой код
}

// =====================================================
// Задача 8 — sortBy(array, key, direction)
//
// Отсортировать массив объектов по ключу.
// direction: "asc" (по умолчанию) | "desc".
// НЕ мутировать входной массив.
//
// sortBy(users, "age", "asc")   → [Bob, Eva, Alice, Charlie, David]
// sortBy(users, "name", "desc") → [Eva, David, Charlie, Bob, Alice]
// sortBy([], "age")             → []
// =====================================================

function sortBy(array, key, direction = "asc") {
  // твой код
}

// =====================================================
// ТЕСТЫ
// =====================================================

section("pluck");
test("имена", pluck(users, "name"), ["Alice", "Bob", "Charlie", "David", "Eva"]);
test("возрасты", pluck(users, "age"), [30, 22, 30, 35, 22]);
test("города", pluck(users, "city"), ["Moscow", "Perm", "Perm", "Moscow", "Moscow"]);
test("id заказов", pluck(orders, "id"), ["o1", "o2", "o3", "o4", "o5"]);
test("пустой массив", pluck([], "name"), []);
test("несуществующий ключ", pluck(users, "salary"), [undefined, undefined, undefined, undefined, undefined]);
test("частично отсутствующий", pluck([{ a: 1 }, { b: 2 }, { a: 3 }], "a"), [1, undefined, 3]);
test("длина всегда = входу", (pluck([{ a: 1 }, {}, { a: 3 }], "a") || []).length, 3);

section("filterWhere");
test("по одному условию", filterWhere(users, { role: "admin" }), [users[0], users[2]]);
test("по двум условиям", filterWhere(users, { role: "admin", city: "Perm" }), [users[2]]);
test("три условия", filterWhere(users, { role: "admin", city: "Moscow", age: 30 }), [users[0]]);
test("нет совпадений", filterWhere(users, { role: "ceo" }), []);
test("пустые условия → все", filterWhere(users, {}), users);
test("пустой массив", filterWhere([], { role: "admin" }), []);
test("orders: status + currency", filterWhere(orders, { status: "confirmed", currency: "EUR" }), [orders[3]]);
test("users: age + city", filterWhere(users, { age: 22, city: "Moscow" }), [users[4]]);

section("findWhere");
test("первый admin", findWhere(users, { role: "admin" }), users[0]);
test("admin из Perm", findWhere(users, { role: "admin", city: "Perm" }), users[2]);
test("несуществующая роль", findWhere(users, { role: "ceo" }), undefined);
test("пустой массив", findWhere([], { role: "admin" }), undefined);
test("orders: userId + status", findWhere(orders, { userId: 2, status: "cancelled" }), orders[2]);
test("пустые условия → первый", findWhere(users, {}), users[0]);

section("sortBy");
test("по age asc", (sortBy(users, "age", "asc") || []).map((u) => u.name), ["Bob", "Eva", "Alice", "Charlie", "David"]);
test("по age desc", (sortBy(users, "age", "desc") || []).map((u) => u.name), ["David", "Alice", "Charlie", "Bob", "Eva"]);
test("по name asc", (sortBy(users, "name", "asc") || []).map((u) => u.name), ["Alice", "Bob", "Charlie", "David", "Eva"]);
test("по name desc", (sortBy(users, "name", "desc") || []).map((u) => u.name), ["Eva", "David", "Charlie", "Bob", "Alice"]);
test("по amount", (sortBy(orders, "amount", "asc") || []).map((o) => o.amount), [80, 90, 100, 120, 250]);
test("без direction → asc", (sortBy(users, "age") || []).map((u) => u.name), ["Bob", "Eva", "Alice", "Charlie", "David"]);
test("пустой массив", sortBy([], "age"), []);
test("один элемент", sortBy([{ age: 5 }], "age"), [{ age: 5 }]);

section("иммутабельность");
const usersCopy = JSON.parse(JSON.stringify(users));
const ordersCopy = JSON.parse(JSON.stringify(orders));
filterWhere(users, { role: "admin" }); findWhere(users, { role: "admin" }); sortBy(users, "age"); pluck(users, "name");
test("users не мутированы", users, usersCopy);
test("orders не мутированы", orders, ordersCopy);
const sorted = sortBy(users, "age");
test("sortBy не мутирует оригинал", users[0].name, "Alice");
test("sortBy возвращает новый массив", sorted !== users, true);

summary();
