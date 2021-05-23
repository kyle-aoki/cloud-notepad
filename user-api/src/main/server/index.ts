import app from "..";
import chalk from 'chalk';

const PORT = process.env.USER_API_APPLICATION_PORT;

app.listen(PORT, () => {
  console.log(chalk.green(`User API listening on port ${PORT}`));
});
