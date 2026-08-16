#!/usr/bin/env node
/**
 * Regenerate per-assistant rule files from the single source of truth:
 * CLAUDE.md. Run after editing CLAUDE.md so Cursor/Copilot/Codex users see
 * the same conventions Claude Code does.
 *
 *   CLAUDE.md  ->  AGENTS.md (pointer)             Codex CLI, Windsurf, Gemini CLI
 *              ->  .cursor/rules/project.mdc       Cursor
 *              ->  .github/copilot-instructions.md GitHub Copilot
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const source = readFileSync('CLAUDE.md', 'utf8');
const banner = '<!-- GENERATED from CLAUDE.md by scripts/sync-ai-rules.mjs — edit CLAUDE.md instead. -->\n\n';

writeFileSync('AGENTS.md', '@CLAUDE.md\n');

mkdirSync('.cursor/rules', { recursive: true });
writeFileSync(
  '.cursor/rules/project.mdc',
  `---\ndescription: Project conventions (generated from CLAUDE.md)\nalwaysApply: true\n---\n\n${banner}${source}`,
);

mkdirSync('.github', { recursive: true });
writeFileSync('.github/copilot-instructions.md', banner + source);

console.log('Synced: AGENTS.md, .cursor/rules/project.mdc, .github/copilot-instructions.md');
