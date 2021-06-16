import chalk from "chalk";
import inProduction from "../utility/in-production";

export enum Severity {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
}

export default class Log {
  private static logToConsole(logObj: any) {
    if (inProduction) return;

    const syslogFormat = `[${logObj.datetime}][${logObj.severity}] ${logObj.msg}.`;
    const errorObject = Log.stringifyErrorObject(logObj.err);

    console.log(chalk.red(`${syslogFormat} ${errorObject}`));
  }

  static stringifyErrorObject(err: any) {
    if (!err) return "";
    let errorObject;
    try {
      errorObject = `Error: ${JSON.stringify(err)}`;
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
    Log.logToConsole(logObj);
  }

  public static warn(msg: string, err?: any) {
    const logObj = Log.getLogObj(Severity.WARN, msg, err);
    Log.logToConsole(logObj);
  }

  public static info(msg: string, err?: any) {
    const logObj = Log.getLogObj(Severity.INFO, msg, err);
    Log.logToConsole(logObj);
  }

  public static log(severity: Severity, msg: string, err?: any) {
    switch (severity) {
      case Severity.ERROR:
        Log.error(msg, err);
      case Severity.WARN:
        Log.warn(msg, err);
      case Severity.INFO:
        Log.info(msg, err);
    }
  }
}
