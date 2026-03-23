import { execSync } from "child_process";

console.log("Formatting code...");

try {
  execSync(
    'npx prettier --write "app/**/*.{ts,tsx}" "src/**/*.{ts,tsx,json}"',
    { stdio: "inherit" },
  );
  console.log("Code formatted successfully!");
} catch {
  console.error("An error occurred while running Prettier.");
  process.exit(1);
}
