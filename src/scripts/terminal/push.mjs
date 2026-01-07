import { exec } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

// Get branch name from command line arguments
const branch = process.argv[2] || 'main';

// Clear npm output lines (the "> package@version script" lines)
process.stdout.write('\x1b[1A\x1b[K');

const spinner = ora(chalk.magenta(`Pushing to ${branch}...`)).start();
spinner.color = 'magenta';

// Execute git push with --quiet to suppress progress output
// Errors will still be captured and displayed
exec(`git push --quiet origin ${branch} 2>&1`, (error, stdout, stderr) => {
  // Clear the spinner line before outputting the final message.
  process.stdout.write('\r\x1b[K');

  if (error) {
    spinner.fail(chalk.bgRed(`Push failed: ${stderr || stdout || error.message}`));
    process.exit(1);
  } else {
    spinner.succeed(chalk.magentaBright(`Successfully pushed to ${branch}!`));
  }
});

