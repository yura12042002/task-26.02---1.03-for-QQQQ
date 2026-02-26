// node run.js       — все дни
// node run.js 2     — только день 2

const { execSync } = require("child_process");
const path = require("path");

const day = process.argv[2];
const days = day ? [Number(day)] : [1, 2, 3, 4];

for (const d of days) {
  const file = path.join(__dirname, `day${d}.js`);
  console.log(`\n${"=".repeat(50)}`);
  console.log(`  ДЕНЬ ${d}`);
  console.log(`${"=".repeat(50)}`);
  try {
    const output = execSync(`node "${file}"`, { encoding: "utf-8" });
    console.log(output);
  } catch (e) {
    console.log(e.stdout || "");
    console.error(e.stderr || "");
  }
}
