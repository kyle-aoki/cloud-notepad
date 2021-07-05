import chalk from "chalk";
import responseTime from "response-time";

function getColorfulMethod(method: string) {
  switch(method) {
    case "GET": return chalk.green(method);
    case "POST": return chalk.yellow(method);
    case "PUT": return chalk.blue(method);
    case "PATCH": return chalk.white(method);
    case "DELETE": return chalk.red(method);
  }
}

// prettier-ignore
function getFormattedTime(time: number) {
  const roundedTime = Math.round(time);
  const roundedTimeStr = roundedTime.toString();
  const roundedTimeStrLen = roundedTimeStr.length;

  switch (roundedTimeStrLen) {
    case 1: return `  ${roundedTimeStr} ms`;
    case 2: return ` ${roundedTimeStr} ms`;
    default: return `${roundedTimeStr} ms`;
  }
}

function getHttpBlock(res: any) {
  if (res.statusCode <= 399) return chalk.greenBright("HTTP");
  return chalk.redBright("HTTP");
}

function getStatusCode(res: any) {
  if (res.statusCode <= 399) return chalk.greenBright(res.statusCode);
  return chalk.redBright(res.statusCode);
}

const HttpLogger = responseTime((req: any, res: any, time) => {
  const HttpBlock = getHttpBlock(res);
  const StatusCode = getStatusCode(res);

  const DateTimeBlock = new Date().toLocaleString();
  const formattedTime = getFormattedTime(time);

  const colorfulMethod = getColorfulMethod(req.method);
  let MessageBlock = `${colorfulMethod} ${req.baseUrl + req.url} ${StatusCode}`;

  const possibleError = res.locals.errType;
  if (possibleError) MessageBlock += ` --> ${chalk.redBright(possibleError)}`;

  console.log(`[${HttpBlock}][${DateTimeBlock}][${formattedTime}] ${MessageBlock}`);
});

export default HttpLogger;
