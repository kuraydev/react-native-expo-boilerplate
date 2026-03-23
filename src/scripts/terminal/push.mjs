import { execSync } from "child_process";

const branch = process.argv[2] || "main";

console.log(`Pushing to ${branch}...`);

try {
  execSync(`git push --quiet origin ${branch}`, { stdio: "inherit" });
  console.log(`Successfully pushed to ${branch}!`);
} catch {
  console.error(`Push to ${branch} failed.`);
  process.exit(1);
}
