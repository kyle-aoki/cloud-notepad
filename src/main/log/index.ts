import path from "path";
import chalk from "chalk";
import fs from "fs";

const combinedLogPath = path.join(process.cwd(), "logs", "combined-logs.log");
const errorLogPath = path.join(process.cwd(), "logs", "error-logs.log");

export enum Severity {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
  DEBUG = "DEBUG",
  VERBOSE = "VERBOSE",
}

if (!process.env.NODE_ENV) {
  console.log(chalk.bold.red("NODE_ENV missing from environment variables."));
  process.exit(1);
}

class Logger {
  private static ENV = process.env.NODE_ENV as string;
  private static LoggerLevelMap = {
    [Severity.ERROR]: Logger.error,
    [Severity.WARN]: Logger.warn,
    [Severity.INFO]: Logger.info,
    [Severity.DEBUG]: Logger.debug,
    [Severity.VERBOSE]: Logger.verbose,
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

  private static getLogText(severity: string, msg: string) {
    return `[${Logger.dt()}][${severity}] ${msg}`
  }

  public static log(severity: Severity, msg: string) {
    Logger.LoggerLevelMap[severity](msg);
  }

  public static error(msg: string) {
    const logText = Logger.getLogText(Severity.ERROR, msg);
    Logger.logToConsole(chalk.bold.red(logText));
    Logger.logToErrorFile(logText);
    Logger.logToCombinedFile(logText);
  }

  public static warn(msg: string) {
    const logText = Logger.getLogText(Severity.WARN, msg);
    Logger.logToConsole(chalk.bold.yellow(logText));
    Logger.logToCombinedFile(logText);
  }

  public static info(msg: string) {
    const logText = Logger.getLogText(Severity.INFO, msg);
    Logger.logToConsole(logText);
    Logger.logToCombinedFile(logText);
  }

  public static debug(msg: string) {
    const logText = Logger.getLogText(Severity.DEBUG, msg);
    Logger.logToConsole(logText);
  }

  public static verbose(msg: string) {
    const logText = Logger.getLogText(Severity.VERBOSE, msg);
    Logger.logToConsole(logText);
  }
}

export default Logger;
