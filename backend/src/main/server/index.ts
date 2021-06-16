import app from "..";
import chalk from "chalk";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(chalk.green(`user-svc listening on port ${PORT}`));
});
