// =====================================================
// День 4 — соединение данных + итоговая композиция
//
// Скопируй сюда свои готовые реализации из дней 1–3:
// countBy, groupBy, indexBy, sumBy
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
// Вставь свои функции из дней 1–3:
// =====================================================

// function countBy(array, key) { ... }
// function groupBy(array, key) { ... }
// function indexBy(array, key) { ... }
// function sumBy(array, groupKey, valueKey) { ... }

// =====================================================
// Задача 14 — enrichOrders(orders, users)
//
// Для каждого заказа добавить поле user — объект
// пользователя (связь: order.userId === user.id).
// Пользователь не найден → user: null.
// Не мутировать входные данные.
//
// enrichOrders(orders, users)[0]
//   → { id: "o1", userId: 1, ..., user: { id: 1, name: "Alice", ... } }
// enrichOrders(orders, [])[0].user → null
// enrichOrders([], users)          → []
// =====================================================

function enrichOrders(orders, users) {
  // твой код
}

// =====================================================
// Задача 15 — buildReport(users, orders)
//
// Собрать отчёт, используя функции из предыдущих дней.
// Внутри — только вызовы утилит, никаких циклов.
//
// buildReport(users, orders) → {
//   usersCountByRole:    { admin: 2, user: 2, moderator: 1 },
//   usersByCity:         { Moscow: [...], Perm: [...] },
//   ordersCountByStatus: { created: 2, confirmed: 2, cancelled: 1 },
//   ordersSumByCurrency: { USD: 440, EUR: 200 },
//   enrichedOrders:      [ { ...order, user: {...} }, ... ]
// }
// buildReport([], []) → все поля пустые ({} и [])
// =====================================================

function buildReport(users, orders) {
  // твой код
}

// =====================================================
// ТЕСТЫ
// =====================================================

section("enrichOrders");
{
  const enriched = enrichOrders(orders, users) || [];
  test("длина = длина orders", enriched.length, 5);
  test("o1 → user Alice", enriched[0], { ...orders[0], user: users[0] });
  test("o2 → user Bob", enriched[1], { ...orders[1], user: users[1] });
  test("o3 → user Bob", enriched[2], { ...orders[2], user: users[1] });
  test("o4 → user Charlie", enriched[3], { ...orders[3], user: users[2] });
  test("o5 → user Alice", enriched[4], { ...orders[4], user: users[0] });
  test("пустые orders", enrichOrders([], users), []);
  const withNoUsers = enrichOrders(orders, []) || [];
  test("пустые users → все null", withNoUsers.every((o) => o.user === null), true);
  const withBadId = enrichOrders(
    [{ id: "x1", userId: 999, status: "new", amount: 0, currency: "RUB" }], users
  ) || [];
  test("несуществующий userId → null", withBadId[0] && withBadId[0].user, null);
}

section("иммутабельность enrichOrders");
{
  const snap1 = JSON.parse(JSON.stringify(users));
  const snap2 = JSON.parse(JSON.stringify(orders));
  enrichOrders(orders, users);
  test("orders не мутированы", orders, snap2);
  test("users не мутированы", users, snap1);
  test("у оригинала нет поля user", orders[0].user, undefined);
}

section("buildReport");
{
  const report = buildReport(users, orders) || {};
  test("usersCountByRole", report.usersCountByRole, { admin: 2, user: 2, moderator: 1 });
  test("usersByCity", report.usersByCity, {
    Moscow: [users[0], users[3], users[4]], Perm: [users[1], users[2]],
  });
  test("ordersCountByStatus", report.ordersCountByStatus, { created: 2, confirmed: 2, cancelled: 1 });
  test("ordersSumByCurrency", report.ordersSumByCurrency, { USD: 440, EUR: 200 });
  test("enrichedOrders length", (report.enrichedOrders || []).length, 5);
  test("enrichedOrders[0] user", (report.enrichedOrders || [])[0] && report.enrichedOrders[0].user, users[0]);
}

section("buildReport: пустые данные");
{
  const empty = buildReport([], []) || {};
  test("пустой — roles", empty.usersCountByRole, {});
  test("пустой — cities", empty.usersByCity, {});
  test("пустой — statuses", empty.ordersCountByStatus, {});
  test("пустой — currencies", empty.ordersSumByCurrency, {});
  test("пустой — enriched", empty.enrichedOrders, []);
  const usersOnly = buildReport(users, []) || {};
  test("только users — roles", usersOnly.usersCountByRole, { admin: 2, user: 2, moderator: 1 });
  test("только users — enriched пусто", usersOnly.enrichedOrders, []);
  const ordersOnly = buildReport([], orders) || {};
  test("только orders — roles пусто", ordersOnly.usersCountByRole, {});
  test("только orders — currency", ordersOnly.ordersSumByCurrency, { USD: 440, EUR: 200 });
  test("только orders — enriched все null", (ordersOnly.enrichedOrders || []).every((o) => o.user === null), true);
}

section("иммутабельность buildReport");
{
  const snap1 = JSON.parse(JSON.stringify(users));
  const snap2 = JSON.parse(JSON.stringify(orders));
  buildReport(users, orders);
  test("users не мутированы", users, snap1);
  test("orders не мутированы", orders, snap2);
}

summary();
