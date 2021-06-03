import path from "path";
import chalk from "chalk";
import fs from "fs";

const combinedLogPath = path.join(process.cwd(), "logs", "combined-logs.log");
const errorLogPath = path.join(process.cwd(), "logs", "error-logs.log");

export enum Severity {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
}

if (!process.env.NODE_ENV) {
  console.log(chalk.bold.red("NODE_ENV missing from environment variables."));
  process.exit(1);
}

export default class Logger {
  private static ENV = process.env.NODE_ENV as string;
  private static LoggerLevelMap = {
    [Severity.ERROR]: Logger.error,
    [Severity.WARN]: Logger.warn,
    [Severity.INFO]: Logger.info,
  };

  private static logToErrorFile(msg: string) {
    fs.appendFileSync(errorLogPath, msg + "\n");
  }

  private static logToCombinedFile(msg: string) {
    if (Logger.ENV === "dev" || Logger.ENV === "stage") {
      fs.appendFileSync(combinedLogPath, msg + "\n");
    }
  }

  private static logToConsole(msg: string) {
    if (Logger.ENV === "dev" || Logger.ENV === "stage") {
      console.log(msg);
    }
  }

  private static dt() {
    return new Date().toLocaleString();
  }

  private static getLogText(severity: string, msg: string, err?: any) {
    return `[${Logger.dt()}][${severity}] ${msg}${err && ` Error: ${JSON.stringify(err)}`}`;
  }

  public static log(severity: Severity, msg: string, err?: any) {
    Logger.LoggerLevelMap[severity](msg, err);
  }

  public static error(msg: string, err?: any) {
    const logText = Logger.getLogText(Severity.ERROR, msg, err);
    Logger.logToConsole(chalk.bold.red(logText));
    Logger.logToErrorFile(logText);
    Logger.logToCombinedFile(logText);
  }

  public static warn(msg: string, err?: any) {
    const logText = Logger.getLogText(Severity.WARN, msg, err);
    Logger.logToConsole(chalk.bold.yellow(logText));
    Logger.logToCombinedFile(logText);
  }

  public static info(msg: string, err?: any) {
    const logText = Logger.getLogText(Severity.INFO, msg, err);
    Logger.logToConsole(logText);
    Logger.logToCombinedFile(logText);
  }
}
