#!/usr/bin/env node

import { createInterface } from "readline";
import {
  readFileSync,
  writeFileSync,
  rmSync,
  existsSync,
  unlinkSync,
} from "fs";
import { join } from "path";
import { execSync } from "child_process";
import chalk from "chalk";
import ora from "ora";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

const ROOT = process.cwd();
const read = (file) => readFileSync(join(ROOT, file), "utf8");
const write = (file, data) => writeFileSync(join(ROOT, file), data, "utf8");

const toSlug = (str) =>
  str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

// ── Banner ──────────────────────────────────────────────────────────────────

console.log("");
console.log(
  chalk.bold.cyan("  ┌─────────────────────────────────────────┐")
);
console.log(
  chalk.bold.cyan("  │") +
    chalk.bold("   React Native Expo Zustand Boilerplate  ") +
    chalk.bold.cyan("│")
);
console.log(
  chalk.bold.cyan("  │") +
    chalk.gray("        Project Setup Wizard v2.0         ") +
    chalk.bold.cyan("│")
);
console.log(
  chalk.bold.cyan("  └─────────────────────────────────────────┘")
);
console.log("");
console.log(
  chalk.gray(
    "  Answer each prompt to personalize the boilerplate.\n  Press Enter to accept defaults shown in parentheses.\n"
  )
);

// ── 1. App Name ─────────────────────────────────────────────────────────────

const appName = await ask(
  chalk.magenta("  1. App name ") +
    chalk.gray('(display name, e.g. "My App"): ')
);
if (!appName.trim()) {
  console.log(chalk.red("\n  App name is required."));
  rl.close();
  process.exit(1);
}

// ── 2. Slug ─────────────────────────────────────────────────────────────────

const defaultSlug = toSlug(appName);
const slug = await ask(
  chalk.magenta("  2. Slug ") +
    chalk.gray(`(URL-safe identifier, default: "${defaultSlug}"): `)
);
const finalSlug = slug.trim() ? toSlug(slug) : defaultSlug;

// ── 3. Deep Link Scheme ─────────────────────────────────────────────────────

const defaultScheme = finalSlug.replace(/-/g, "");
const scheme = await ask(
  chalk.magenta("  3. Deep link scheme ") +
    chalk.gray(`(default: "${defaultScheme}"): `)
);
const finalScheme = scheme.trim() || defaultScheme;

// ── 4. Bundle ID ────────────────────────────────────────────────────────────

const bundleId = await ask(
  chalk.magenta("  4. Bundle ID ") +
    chalk.gray('(e.g. "com.company.app", Enter to skip): ')
);

// ── 5. Author ───────────────────────────────────────────────────────────────

const author = await ask(
  chalk.magenta("  5. Author name ") +
    chalk.gray("(for package.json, Enter to skip): ")
);

// ── 6. Description ──────────────────────────────────────────────────────────

const description = await ask(
  chalk.magenta("  6. App description ") +
    chalk.gray("(for package.json, Enter to skip): ")
);

// ── 7. API Base URL ─────────────────────────────────────────────────────────

const apiBaseUrl = await ask(
  chalk.magenta("  7. API base URL ") +
    chalk.gray('(default: "https://api.example.com"): ')
);
const finalApiUrl = apiBaseUrl.trim() || "https://api.example.com";

// ── 8. Primary Color ────────────────────────────────────────────────────────

const primaryColor = await ask(
  chalk.magenta("  8. Primary color ") +
    chalk.gray('(hex, default: "#4A6CF7"): ')
);
let finalPrimary = "#4A6CF7";
if (primaryColor.trim()) {
  if (HEX_RE.test(primaryColor.trim())) {
    finalPrimary = primaryColor.trim();
  } else {
    console.log(
      chalk.yellow("     Invalid hex — keeping default #4A6CF7")
    );
  }
}

// ── 9. Default Language ─────────────────────────────────────────────────────

const lang = await ask(
  chalk.magenta("  9. Default language ") +
    chalk.gray('("en" or "es", default: "en"): ')
);
const finalLang = lang.trim() === "es" ? "es" : "en";

// ── 10. Remove Showcase ─────────────────────────────────────────────────────

const removeShowcase = await ask(
  chalk.magenta("  10. Remove showcase/demo screens? ") +
    chalk.gray("(y/N): ")
);
const shouldRemoveShowcase = removeShowcase.trim().toLowerCase() === "y";

// ── 11. Reinitialize Git ────────────────────────────────────────────────────

const reinitGit = await ask(
  chalk.magenta("  11. Reinitialize Git history? ") +
    chalk.gray("(fresh start, y/N): ")
);
const shouldReinitGit = reinitGit.trim().toLowerCase() === "y";

// ── Summary ─────────────────────────────────────────────────────────────────

console.log("");
console.log(chalk.bold("  Summary"));
console.log(chalk.gray("  ─────────────────────────────────────"));
console.log(`  App name:        ${chalk.white(appName.trim())}`);
console.log(`  Slug:            ${chalk.white(finalSlug)}`);
console.log(`  Scheme:          ${chalk.white(finalScheme)}`);
if (bundleId.trim())
  console.log(`  Bundle ID:       ${chalk.white(bundleId.trim())}`);
if (author.trim())
  console.log(`  Author:          ${chalk.white(author.trim())}`);
if (description.trim())
  console.log(`  Description:     ${chalk.white(description.trim())}`);
console.log(`  API URL:         ${chalk.white(finalApiUrl)}`);
console.log(
  `  Primary color:   ${chalk.hex(finalPrimary)("████")} ${chalk.white(finalPrimary)}`
);
console.log(`  Default lang:    ${chalk.white(finalLang)}`);
console.log(
  `  Remove demos:    ${chalk.white(shouldRemoveShowcase ? "Yes" : "No")}`
);
console.log(
  `  Reinit Git:      ${chalk.white(shouldReinitGit ? "Yes" : "No")}`
);
console.log("");

const confirm = await ask(chalk.yellow("  Proceed? (Y/n): "));
if (confirm.trim().toLowerCase() === "n") {
  console.log(chalk.gray("  Cancelled."));
  rl.close();
  process.exit(0);
}

console.log("");

// ═══════════════════════════════════════════════════════════════════════════
//  APPLY CHANGES
// ═══════════════════════════════════════════════════════════════════════════

// ── package.json ────────────────────────────────────────────────────────────

const spinPkg = ora(chalk.magenta("Updating package.json")).start();
try {
  const pkg = JSON.parse(read("package.json"));
  pkg.name = finalSlug;
  pkg.version = "1.0.0";
  if (author.trim()) pkg.author = author.trim();
  if (description.trim()) pkg.description = description.trim();
  write("package.json", JSON.stringify(pkg, null, 2) + "\n");
  spinPkg.succeed(chalk.magentaBright("package.json updated"));
} catch (e) {
  spinPkg.fail(chalk.red(`package.json: ${e.message}`));
}

// ── app.json ────────────────────────────────────────────────────────────────

const spinApp = ora(chalk.magenta("Updating app.json")).start();
try {
  const appJson = JSON.parse(read("app.json"));
  appJson.expo.name = appName.trim();
  appJson.expo.slug = finalSlug;
  appJson.expo.scheme = finalScheme;
  appJson.expo.version = "1.0.0";

  if (bundleId.trim()) {
    appJson.expo.ios = appJson.expo.ios || {};
    appJson.expo.ios.bundleIdentifier = bundleId.trim();
    appJson.expo.android = appJson.expo.android || {};
    appJson.expo.android.package = bundleId.trim();
  }

  write("app.json", JSON.stringify(appJson, null, 2) + "\n");
  spinApp.succeed(chalk.magentaBright("app.json updated"));
} catch (e) {
  spinApp.fail(chalk.red(`app.json: ${e.message}`));
}

// ── API base URL ────────────────────────────────────────────────────────────

const spinApi = ora(chalk.magenta("Updating API base URL")).start();
try {
  let api = read("src/services/api.ts");
  api = api.replace("https://api.example.com", finalApiUrl);
  write("src/services/api.ts", api);
  spinApi.succeed(chalk.magentaBright("API base URL updated"));
} catch (e) {
  spinApi.fail(chalk.red(`api.ts: ${e.message}`));
}

// ── Primary color ───────────────────────────────────────────────────────────

if (finalPrimary !== "#4A6CF7") {
  const spinColor = ora(chalk.magenta("Updating primary color")).start();
  try {
    const filesToRecolor = [
      "src/constants/Colors.ts",
      "CLAUDE.md",
      "AGENTS.md",
    ];
    for (const file of filesToRecolor) {
      if (existsSync(join(ROOT, file))) {
        let content = read(file);
        content = content.replace(/#4A6CF7/g, finalPrimary);
        write(file, content);
      }
    }
    spinColor.succeed(
      chalk.magentaBright(`Primary color → ${finalPrimary}`)
    );
  } catch (e) {
    spinColor.fail(chalk.red(`Color: ${e.message}`));
  }
}

// ── Default language ────────────────────────────────────────────────────────

if (finalLang !== "en") {
  const spinLang = ora(chalk.magenta("Updating default language")).start();
  try {
    let i18nConfig = read("src/i18n/index.ts");
    i18nConfig = i18nConfig.replace(
      'lng: "en"',
      `lng: "${finalLang}"`
    );
    write("src/i18n/index.ts", i18nConfig);
    spinLang.succeed(
      chalk.magentaBright(`Default language → ${finalLang}`)
    );
  } catch (e) {
    spinLang.fail(chalk.red(`i18n: ${e.message}`));
  }
}

// ── Settings screen app name ────────────────────────────────────────────────

const spinSettings = ora(
  chalk.magenta("Updating settings screen")
).start();
try {
  let settings = read("app/(tabs)/settings.tsx");
  settings = settings.replace("RN Expo Zustand Boilerplate", appName.trim());
  write("app/(tabs)/settings.tsx", settings);
  spinSettings.succeed(chalk.magentaBright("Settings screen updated"));
} catch (e) {
  spinSettings.fail(chalk.red(`settings.tsx: ${e.message}`));
}

// ── AI config files ─────────────────────────────────────────────────────────

const spinAi = ora(chalk.magenta("Updating AI config files")).start();
try {
  const aiFiles = ["CLAUDE.md", "AGENTS.md", "README.md"];
  for (const file of aiFiles) {
    if (existsSync(join(ROOT, file))) {
      let content = read(file);
      content = content.replace(
        /React Native Expo Zustand Boilerplate/g,
        appName.trim()
      );
      write(file, content);
    }
  }
  spinAi.succeed(
    chalk.magentaBright("CLAUDE.md, AGENTS.md, README.md updated")
  );
} catch (e) {
  spinAi.fail(chalk.red(`AI files: ${e.message}`));
}

// ── Remove showcase content (optional) ──────────────────────────────────────

if (shouldRemoveShowcase) {
  const spinClean = ora(chalk.magenta("Removing showcase content")).start();
  try {
    const dirsToRemove = [
      "src/screens/home/mock",
      "src/screens/home/components",
      "src/screens/home",
      "src/screens",
    ];
    for (const dir of dirsToRemove) {
      const fullPath = join(ROOT, dir);
      if (existsSync(fullPath)) {
        rmSync(fullPath, { recursive: true, force: true });
      }
    }

    const stubScreen = (title) =>
      `import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../../src/components/ui/ThemedText";
import { useThemeColor } from "../../src/hooks/useThemeColor";

export default function ${title}Screen() {
  const colors = useThemeColor();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <View style={styles.content}>
        <ThemedText variant="heading">${title}</ThemedText>
        <ThemedText variant="body" secondary>
          Start building your ${title.toLowerCase()} screen here.
        </ThemedText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
`;

    write("app/(tabs)/index.tsx", stubScreen("Home"));
    write("app/(tabs)/search.tsx", stubScreen("Search"));
    write("app/(tabs)/notifications.tsx", stubScreen("Notifications"));
    write("app/(tabs)/settings.tsx", stubScreen("Settings"));

    spinClean.succeed(
      chalk.magentaBright(
        "Showcase removed — screens replaced with clean stubs"
      )
    );
  } catch (e) {
    spinClean.fail(chalk.red(`Clean: ${e.message}`));
  }
}

// ── Reinitialize Git (optional) ─────────────────────────────────────────────

if (shouldReinitGit) {
  const spinGit = ora(chalk.magenta("Reinitializing Git")).start();
  try {
    rmSync(join(ROOT, ".git"), { recursive: true, force: true });
    execSync("git init", { cwd: ROOT, stdio: "ignore" });
    execSync("git add -A", { cwd: ROOT, stdio: "ignore" });
    execSync(`git commit -m "Initial commit — ${appName.trim()}"`, {
      cwd: ROOT,
      stdio: "ignore",
    });
    spinGit.succeed(
      chalk.magentaBright("Git reinitialized with fresh first commit")
    );
  } catch (e) {
    spinGit.fail(chalk.red(`Git: ${e.message}`));
  }
}

// ── Self-destruct this setup script ─────────────────────────────────────────

const removeSelf = await ask(
  chalk.magenta(
    "\n  Remove setup script from project? "
  ) + chalk.gray("(Y/n): ")
);

if (removeSelf.trim().toLowerCase() !== "n") {
  const spinSelf = ora(chalk.magenta("Cleaning up setup script")).start();
  try {
    const pkg = JSON.parse(read("package.json"));
    delete pkg.scripts.setup;
    write("package.json", JSON.stringify(pkg, null, 2) + "\n");

    const setupPath = join(ROOT, "src/scripts/terminal/setup.mjs");
    if (existsSync(setupPath)) unlinkSync(setupPath);

    spinSelf.succeed(
      chalk.magentaBright("Setup script removed from project")
    );
  } catch (e) {
    spinSelf.fail(chalk.red(`Cleanup: ${e.message}`));
  }
}

// ── Done ────────────────────────────────────────────────────────────────────

console.log("");
console.log(chalk.bold.green("  ✔ Setup complete!"));
console.log("");
console.log(chalk.gray("  Next steps:"));
console.log(`    ${chalk.cyan("npm start")}        Start the dev server`);
console.log(`    ${chalk.cyan("npm run ios")}      Run on iOS simulator`);
console.log(`    ${chalk.cyan("npm run android")}  Run on Android emulator`);
console.log("");

rl.close();
