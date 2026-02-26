// Общий тест-хелпер (не трогать)

function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  if (typeof a !== "object") return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => deepEqual(a[k], b[k]));
}

const _filter = process.env.FN ? process.env.FN.toLowerCase() : null;
let _currentSection = "";
let _pass = 0;
let _fail = 0;
let _skipped = false;

function section(name) {
  _currentSection = name;
  _skipped = _filter && !name.toLowerCase().includes(_filter);
  if (!_skipped) console.log(`\n--- ${name} ---`);
}

function test(name, actual, expected) {
  if (_skipped) return;
  if (deepEqual(actual, expected)) {
    _pass++;
    console.log(`  ✅ ${name}`);
  } else {
    _fail++;
    console.log(`  ❌ ${name}`);
    console.log(`     Ожидалось:`, JSON.stringify(expected));
    console.log(`     Получено: `, JSON.stringify(actual));
  }
}

function summary() {
  console.log(`\n  Итого: ✅ ${_pass}  ❌ ${_fail}`);
  if (_fail === 0 && _pass > 0) console.log("  Всё пройдено!");
  if (_fail > 0) console.log(`  Осталось: ${_fail}`);
  console.log();
}

module.exports = { test, section, summary };
