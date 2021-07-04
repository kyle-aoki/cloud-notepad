import chalk from "chalk";
import responseTime from "response-time";

function normalizeTime(time: number) {
  const roundedTime = Math.round(time);
  const roundedTimeStr = roundedTime.toString();
  const roundedTimeStrLen = roundedTimeStr.length;

  switch (roundedTimeStrLen) {
    case 1:
      return `  ${roundedTimeStr} ms`;
    case 2:
      return ` ${roundedTimeStr} ms`;
    default:
      return `${roundedTimeStr} ms`;
  }
}

function getHttpBlock(res: any) {
  if (res.statusCode < 399) return chalk.greenBright("HTTP");
  return chalk.redBright("HTTP");
}

function getStatusCode(res: any) {
  if (res.statusCode < 399) return chalk.greenBright(res.statusCode);
  return chalk.redBright(res.statusCode);
}

const HttpLogger = responseTime((req: any, res: any, time) => {
  const HttpBlock = getHttpBlock(res);
  const StatusCode = getStatusCode(res);

  const DateTimeBlock = new Date().toLocaleString();
  let MessageBlock = `${req.method} ${req.baseUrl + req.url} ${StatusCode}`;

  const possibleError = res.locals.errType;
  if (possibleError) MessageBlock += ` --> ${chalk.redBright(possibleError)}`;

  const normalizedTime = normalizeTime(time);
  console.log(`[${HttpBlock}][${DateTimeBlock}][${normalizedTime}] ${MessageBlock}`);
});

export default HttpLogger;
