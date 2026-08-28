# 🧪 Testing Guide

Two layers, one rule: logic is proven by Jest, device behavior is proven by
**Argent** on a real simulator/emulator. Nothing ships on "it should work".

| Layer | Tool | Lives in | Run |
|---|---|---|---|
| Unit / component | jest-expo + React Native Testing Library | co-located `__tests__/`, `*.test.ts(x)` | `npm test` |
| E2E / on-device | [Argent](https://github.com/software-mansion/argent) (`@swmansion/argent`) | `.argent/flows/*.yaml` | `npm run e2e` |

> **Maestro and Detox are banned.** Argent replaced them — do not add them back.

---

## Unit & component tests

- Co-locate tests next to the code: `src/features/foo/__tests__/foo.test.tsx`.
- React Native Testing Library v14 is **async**: `await render(...)`,
  `await renderHook(...)`.
- Every new feature ships at least one test for its core logic. No brittle
  snapshot tests by default.
- One-shot gate before finishing any change:

```bash
npm run verify   # typecheck + lint + tests
```

---

## Argent: what it is

Argent is Software Mansion's agentic device toolkit. Instead of a YAML DSL you
script by hand (Maestro) or a test runner compiled into the app (Detox), Argent
is an **MCP server** whose tools let an AI agent — or you, via the CLI — drive
the simulator directly:

- **Interact**: boot devices, launch apps, tap, swipe, type, hardware buttons
- **Inspect**: accessibility tree (`describe`), React component tree, native
  view hierarchy, JS console logs, network traffic
- **Verify**: `await-ui-element` assertions, screenshot diffing with baselines
- **Profile**: Hermes sampling profiler, React DevTools, Xcode Instruments /
  Android Perfetto
- **Record & replay**: interaction sequences saved as deterministic flows —
  this is the E2E suite

Everything is already wired into the repo:

| Piece | Where |
|---|---|
| Package | `@swmansion/argent` devDependency — installed by `npm install` |
| MCP server config | `.mcp.json` (Claude Code), `.cursor/mcp.json`, `.vscode/mcp.json`, `.codex/config.toml` |
| Agent skills | `.agents/skills/argent-*` (vendored), exposed via `.claude/skills/` |
| Agent rules | `.claude/rules/argent.md`, `.cursor/rules/argent.md` |
| Recorded flows | `.argent/flows/*.yaml` (committed — this is the E2E suite) |

## Prerequisites

- **Node 20.12+**
- **iOS**: macOS with Xcode + a simulator
- **Android**: Android SDK platform-tools (`adb`) + an emulator (AVD)
- **A dev build installed on the device.** Expo Go won't work — this template
  uses native modules (MMKV, Firebase, …). Build once:

```bash
npx expo run:ios       # or: npx expo run:android
```

## Quick sanity check

```bash
npx argent tools                      # list every available tool
npx argent run list-devices           # see simulators/emulators
npx argent run boot-device --platform ios
npx argent run screenshot --out /tmp/screen.png
```

In an MCP-enabled editor (Claude Code, Cursor, …) just ask:
*"What can Argent do?"*

---

## The dev loop: verify on-device, every time

The contract (also in `CLAUDE.md`): after any UI-affecting change, the agent
verifies the change **on the device** — tap to the screen, assert the element,
screenshot — instead of assuming from code or asking you to check. The
`argent-test-ui-flow` and `argent-device-interact` skills cover this.

Useful asks while developing:

- *"Run the app and check the settings screen renders after my change"*
- *"Reproduce the bug: tap Login with an empty email and show me the JS logs"*
- *"Profile the chat screen while streaming and tell me what's slow"*
- *"Screenshot-diff the home screen against the baseline"*

## E2E regression flows

A flow is a recorded, replayable interaction sequence in
`.argent/flows/<name>.yaml`. Flows are **always recorded live** on a booted
device via the `argent-qa-flows` skill — never hand-written. Recording captures
real selectors and timings; hand-written YAML rots instantly.

**Authoring a flow** (agent-driven — ask your assistant):

> "Record a QA flow named `smoke`: launch the app, wait for the home screen,
> switch to the settings tab, toggle dark mode, assert the theme changed."

The `argent-qa-flows` skill enforces the QA contract: deterministic setup,
stable selectors, hard assertions for every requirement, and two consecutive
full passes before the flow counts as done.

**Replaying:**

```bash
npm run e2e                                    # replays the smoke flow
npx argent run flow-execute --name <flow>      # any flow in .argent/flows/
```

**Rules:**

- Every app keeps a green **`smoke`** flow: launch → main screen → one core
  action.
- Stable selectors only — `testID` / accessibility labels fixed by app code.
  Never gate on user data, counts, dates, or locale-dependent text. If a target
  has no stable handle, add a `testID` to the component.
- A UI change that breaks a flow gets the flow **repaired** (re-record the
  changed segment — the `argent-create-flow` skill has the repair loop), never
  the assertion weakened or deleted.
- Commit `.argent/flows/*.yaml` — they are the regression suite.

## CI

The GitHub Actions pipeline runs the Jest layer (`typecheck + lint + test`) and
a prebuild sanity check. Argent flows need a booted simulator with an installed
dev build, so they run locally / on a Mac runner — replay the smoke flow before
merging UI changes:

```bash
npm run e2e
```

## Troubleshooting

| Symptom | Fix |
|---|---|
| `flow-execute` says flow not found | Flows live in `.argent/flows/`; pass `--name` without `.yaml` |
| No devices listed | Boot one: `npx argent run boot-device --platform ios` |
| App launches but tools can't read the UI tree | You're on Expo Go or a stale build — reinstall the dev build (`npx expo run:ios`) |
| Flow fails after a UI change | Repair, don't delete: re-record the broken segment via `argent-create-flow` |
| MCP tools missing in the editor | Restart the editor; check `.mcp.json` / `.cursor/mcp.json` exists and `npm install` ran |
| `argent` command not found | It's a local dep — use `npx argent …` or npm scripts |
