import app from "..";
import chalk from 'chalk';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(chalk.green(`User API listening on port ${PORT}`));
});
