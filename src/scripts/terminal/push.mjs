import { exec } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

const branch = process.argv[2] || 'main';

process.stdout.write('\x1b[1A\x1b[K');

const spinner = ora(chalk.magenta(`Pushing to ${branch}...`)).start();
spinner.color = 'magenta';

exec(`git push --quiet origin ${branch} 2>&1`, (error, stdout, stderr) => {
  process.stdout.write('\r\x1b[K');

  if (error) {
    spinner.fail(chalk.bgRed(`Push failed: ${stderr || stdout || error.message}`));
    process.exit(1);
  } else {
    spinner.succeed(chalk.magentaBright(`Successfully pushed to ${branch}!`));
  }
});
