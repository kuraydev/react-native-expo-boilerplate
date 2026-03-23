import { exec } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

const spinner = ora(chalk.cyan('Formatting code...')).start();
spinner.color = 'cyan';

exec('npx prettier --write "app/**/*.{ts,tsx}" "src/**/*.{ts,tsx,json}"', (error, stdout, stderr) => {
  if (error) {
    spinner.fail(chalk.bgRed(`Prettier error: ${stderr}`));
    process.exit(1);
  } else {
    spinner.succeed(chalk.cyanBright('Code formatted successfully!'));
  }
});
