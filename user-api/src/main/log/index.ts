import { createLogger, format, transports } from 'winston';
import path from 'path';

const combinedLogPath = path.join(process.cwd(), 'logs', 'combined-logs.log');
const errorLogPath = path.join(process.cwd(), 'logs', 'error-logs.log');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'user-api' },
  transports: [
    new transports.File({ filename: errorLogPath, level: 'error' }),
    new transports.File({ filename: combinedLogPath })
  ]
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'prod') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

export enum Severity {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export default logger;
