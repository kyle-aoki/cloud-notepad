import chalk from "chalk";
import { inDevelopment, inProduction, inStaging } from "../utility/environment";

export enum Severity {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
}

export default class Log {
  private static getSysFormatSeverity(severity: string) {
    if (severity === "INFO") return chalk.cyan(severity);
    if (severity === "WARN") return chalk.yellow(severity);
    if (severity === "ERROR") return chalk.redBright("ERRR");
    return severity;
  }

  private static logToConsole(logObj: any, color?: string) {
    if (inProduction) return;

    let msg;
    if (logObj.err) msg = chalk.redBright(`${logObj.err.type}`);
    else msg = `${logObj.msg}`;

    const syslogFormat = `[${Log.getSysFormatSeverity(logObj.severity)}][${logObj.datetime}] ${msg}`;

    switch (color) {
      case "red":
        return console.log(syslogFormat);
      case "yellow":
        return console.log(syslogFormat);
      default:
        return console.log(syslogFormat);
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

  public static stackTrace(err: Error) {
    if (inDevelopment || inStaging) {
      if (Object.keys(err).length === 0) console.log(err);
    }
  }

  public static error(msg: string, err?: any) {
    Log.stackTrace(err);
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
