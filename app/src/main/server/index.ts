import app from "..";
import chalk from "chalk";
import Log from "../log";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  Log.info(chalk.green(`CLOUD-NOTEPAD listening on port ${PORT}`));
});
