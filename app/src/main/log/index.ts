import chalk from "chalk";
import { inProduction } from "../utility/environment";

export enum Severity {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
}

export default class Log {
  private static severityColor(severity: string) {
    if (severity === "INFO") return chalk.cyan(severity);
    return severity;
  }

  private static logToConsole(logObj: any, color?: string) {
    if (inProduction) return;

    const errorMessage = logObj.msg ? ` ${logObj.msg}.` : "";
    const syslogFormat = `[${Log.severityColor(logObj.severity)}][${logObj.datetime}]${errorMessage}`;
    const errorObject = Log.stringifyErrorObject(logObj.err);

    switch (color) {
      case "red":
        return console.log(chalk.red(`${syslogFormat} ${errorObject}`));
      case "yellow":
        return console.log(chalk.yellow(`${syslogFormat} ${errorObject}`));
      default:
        return console.log(`${syslogFormat} ${errorObject}`);
    }
  }

  static stringifyErrorObject(err: any) {
    if (!err) return "";
    let errorObject;
    try {
      errorObject = `${JSON.stringify(err)}`;
    } catch (_) {
      errorObject = "FAILED TO STRINGIFY ERROR.";
    }
    return errorObject;
  }

  private static dt() {
    return new Date().toLocaleString();
  }

  private static getLogObj(severity: string, msg: string, err?: any) {
    return { datetime: Log.dt(), severity, msg, err };
  }

  public static error(msg: string, err?: any) {
    const logObj = Log.getLogObj(Severity.ERROR, msg, err);
    Log.logToConsole(logObj, "red");
  }

  public static warn(msg: string, err?: any) {
    const logObj = Log.getLogObj(Severity.WARN, msg, err);
    Log.logToConsole(logObj, "yellow");
  }

  public static info(msg: string, err?: any) {
    const logObj = Log.getLogObj(Severity.INFO, msg, err);
    Log.logToConsole(logObj);
  }

  public static log(severity: Severity, msg: string, err?: any) {
    switch (severity) {
      case Severity.ERROR:
        return Log.error(msg, err);
      case Severity.WARN:
        return Log.warn(msg, err);
      case Severity.INFO:
        return Log.info(msg, err);
    }
  }
}
