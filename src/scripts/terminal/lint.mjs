import { execSync } from "child_process";

console.log("Linting code...");

try {
  execSync('npx eslint "app/**/*.{ts,tsx}" "src/**/*.{ts,tsx}" --fix', {
    stdio: "inherit",
  });
  console.log("Code linted successfully!");
} catch {
  console.error("ESLint found issues that need to be fixed.");
  process.exit(1);
}
