import app from "../";
import chalk from 'chalk';

const PORT = process.env["user-api-application-port"];

app.listen(PORT, () => {
  console.log(chalk.bold.green(`User API listening on port ${PORT}`));
});
