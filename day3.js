// =====================================================
// День 3 — проверки, деdup, агрегация, объекты
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
// Задача 9 — someWhere(array, conditions)
//
// Есть ли хотя бы один элемент, где все условия совпадают?
// Возвращает true / false.
//
// someWhere(users, { role: "admin" })                  → true
// someWhere(users, { role: "ceo" })                    → false
// someWhere(users, { role: "admin", city: "Moscow" })  → true
// someWhere([], { role: "admin" })                     → false
// =====================================================

function someWhere(array, conditions) {
  // твой код
}

// =====================================================
// Задача 10 — everyWhere(array, conditions)
//
// ВСЕ ли элементы соответствуют условиям?
// Возвращает true / false.
//
// everyWhere(users, { city: "Moscow" })  → false
// everyWhere([], { role: "admin" })      → true (пустой массив!)
// everyWhere([{a:1},{a:1}], { a: 1 })   → true
// =====================================================

function everyWhere(array, conditions) {
  // твой код
}

// =====================================================
// Задача 11 — uniqBy(array, key)
//
// Убрать дубликаты по значению ключа.
// Оставить ПЕРВЫЙ встреченный. Порядок сохранить.
//
// uniqBy(users, "age")  → [Alice, Bob, David]
// uniqBy(users, "city") → [Alice, Bob]
// uniqBy(users, "id")   → все 5
// uniqBy([], "x")       → []
// =====================================================

function uniqBy(array, key) {
  // твой код
}

// =====================================================
// Задача 12 — sumBy(array, groupKey, valueKey)
//
// Сгруппировать по groupKey, просуммировать valueKey.
//
// sumBy(orders, "currency", "amount") → { USD: 440, EUR: 200 }
// sumBy(orders, "userId", "amount")   → { "1": 190, "2": 330, "3": 120 }
// sumBy([], "x", "y")                 → {}
// =====================================================

function sumBy(array, groupKey, valueKey) {
  // твой код
}

// =====================================================
// Задача 13a — pick(obj, keys)
//
// Новый объект только с указанными ключами.
// Несуществующие ключи — игнорировать.
//
// pick(users[0], ["name", "age"])    → { name: "Alice", age: 30 }
// pick(users[0], ["name", "salary"]) → { name: "Alice" }
// pick(users[0], [])                 → {}
//
// Задача 13b — omit(obj, keys)
//
// Новый объект без указанных ключей.
//
// omit(users[0], ["id", "role"]) → { name: "Alice", age: 30, city: "Moscow" }
// omit(users[0], [])             → копия всего объекта
// =====================================================

function pick(obj, keys) {
  // твой код
}

function omit(obj, keys) {
  // твой код
}

// =====================================================
// ТЕСТЫ
// =====================================================

section("someWhere");
test("есть admin", someWhere(users, { role: "admin" }), true);
test("нет ceo", someWhere(users, { role: "ceo" }), false);
test("admin в Moscow", someWhere(users, { role: "admin", city: "Moscow" }), true);
test("admin в Kazan", someWhere(users, { role: "admin", city: "Kazan" }), false);
test("пустой массив", someWhere([], { role: "admin" }), false);
test("пустые условия", someWhere(users, {}), true);
test("user age 22 в Perm", someWhere(users, { role: "user", age: 22, city: "Perm" }), true);
test("confirmed EUR", someWhere(orders, { status: "confirmed", currency: "EUR" }), true);

section("everyWhere");
test("все из Moscow?", everyWhere(users, { city: "Moscow" }), false);
test("пустой массив → true", everyWhere([], { role: "admin" }), true);
test("пустые условия → true", everyWhere(users, {}), true);
test("все admin в подмассиве", everyWhere(users.filter((u) => u.role === "admin"), { role: "admin" }), true);
test("все age 22 в подмассиве", everyWhere(users.filter((u) => u.age === 22), { age: 22 }), true);
test("один — совпадает", everyWhere([{ a: 1 }], { a: 1 }), true);
test("один — не совпадает", everyWhere([{ a: 1 }], { a: 2 }), false);

section("uniqBy");
test("по age", (uniqBy(users, "age") || []).map((u) => u.name), ["Alice", "Bob", "David"]);
test("по city", (uniqBy(users, "city") || []).map((u) => u.name), ["Alice", "Bob"]);
test("по role", (uniqBy(users, "role") || []).map((u) => u.name), ["Alice", "Bob", "David"]);
test("по id — все уникальны", (uniqBy(users, "id") || []).length, 5);
test("пустой массив", uniqBy([], "x"), []);
test("все одинаковые → первый", uniqBy([{ a: 1 }, { a: 1 }, { a: 1 }], "a"), [{ a: 1 }]);
test("orders по userId", (uniqBy(orders, "userId") || []).map((o) => o.id), ["o1", "o2", "o4"]);
test("orders по status", (uniqBy(orders, "status") || []).map((o) => o.id), ["o1", "o2", "o3"]);

section("sumBy");
test("currency → amount", sumBy(orders, "currency", "amount"), { USD: 440, EUR: 200 });
test("userId → amount", sumBy(orders, "userId", "amount"), { "1": 190, "2": 330, "3": 120 });
test("status → amount", sumBy(orders, "status", "amount"), { created: 190, confirmed: 370, cancelled: 80 });
test("пустой массив", sumBy([], "x", "y"), {});
test("одна группа", sumBy([{ g: "a", v: 10 }, { g: "a", v: 20 }], "g", "v"), { a: 30 });
test("нулевые значения", sumBy([{ g: "a", v: 0 }, { g: "a", v: 0 }], "g", "v"), { a: 0 });

section("pick");
test("name + age", pick(users[0], ["name", "age"]), { name: "Alice", age: 30 });
test("только id", pick(users[0], ["id"]), { id: 1 });
test("несуществующий ключ", pick(users[0], ["name", "salary"]), { name: "Alice" });
test("пустые ключи", pick(users[0], []), {});
test("пустой объект", pick({}, ["a", "b"]), {});
test("order", pick(orders[0], ["userId", "amount"]), { userId: 1, amount: 100 });

section("omit");
test("без id и role", omit(users[0], ["id", "role"]), { name: "Alice", age: 30, city: "Moscow" });
test("без всех ключей", omit(users[0], ["id", "name", "role", "age", "city"]), {});
test("пустые ключи → копия", omit(users[0], []), { id: 1, name: "Alice", role: "admin", age: 30, city: "Moscow" });
test("пустой объект", omit({}, ["a"]), {});
test("несуществующие → копия", omit(users[0], ["salary", "email"]), { id: 1, name: "Alice", role: "admin", age: 30, city: "Moscow" });
test("order без status и currency", omit(orders[0], ["status", "currency"]), { id: "o1", userId: 1, amount: 100 });

section("иммутабельность");
const usersCopy = JSON.parse(JSON.stringify(users));
const ordersCopy = JSON.parse(JSON.stringify(orders));
someWhere(users, { role: "admin" }); everyWhere(users, { city: "Moscow" });
uniqBy(users, "age"); sumBy(orders, "currency", "amount");
pick(users[0], ["name"]); omit(users[0], ["id"]);
test("users не мутированы", users, usersCopy);
test("orders не мутированы", orders, ordersCopy);

summary();
