import { exec } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

process.stdout.write('\x1b[1A\x1b[K');

const spinner = ora(chalk.magenta('Linting code...')).start();
spinner.color = 'magenta';

exec('npx eslint "app/**/*.{ts,tsx}" "src/**/*.{ts,tsx}" --fix', (error, stdout, stderr) => {
  process.stdout.write('\r\x1b[K');

  if (error) {
    spinner.fail(chalk.bgRed(`ESLint error: ${stderr || stdout}`));
    process.exit(1);
  } else {
    spinner.succeed(chalk.magentaBright('Code linted successfully!'));
  }
});
