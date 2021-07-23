import shelljs from "shelljs";

shelljs.config.silent = true;

export default function shell(command: string) {
  const output = shelljs.exec(command);
  if (output.stderr) {
    console.log('ERROR', output.stderr);
    process.exit(1);
  }
  if (!output.stdout) return;
  return JSON.parse(output.stdout);
}
