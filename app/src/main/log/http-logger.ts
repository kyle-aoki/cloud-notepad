import chalk from "chalk";
import responseTime from "response-time";

function getFormattedUrl(baseUrl: string, url: string){
  const formattedUrl = baseUrl + url;
  return formattedUrl;
}

// prettier-ignore
function getColorfulMethod(method: string) {
  switch(method) {
    case "GET":     return chalk.green("GET   ");
    case "POST":    return chalk.yellow("POST  ");
    case "PUT":     return chalk.blue("PUT   ");
    case "PATCH":   return chalk.white("PATCH ");
    case "DELETE":  return chalk.red("DELETE");
    default:        return chalk.white(method);
  }
}

// prettier-ignore
function getFormattedTime(time: number) {
  const roundedTime = Math.round(time);
  const roundedTimeStr = roundedTime.toString();
  const roundedTimeStrLen = roundedTimeStr.length;

  switch (roundedTimeStrLen) {
    case 1:   return `  ${roundedTimeStr} ms`;
    case 2:   return ` ${roundedTimeStr} ms`;
    default:  return `${roundedTimeStr} ms`;
  }
}

function getHttpBlock(res: any) {
  if (res.statusCode <= 399) return chalk.green("HTTP");
  return chalk.redBright("HTTP");
}

function getStatusCode(res: any) {
  if (res.statusCode <= 399) return chalk.green(res.statusCode);
  return chalk.redBright(res.statusCode);
}

const HttpLogger = responseTime((req: any, res: any, time) => {
  const HttpBlock = getHttpBlock(res);
  const StatusCode = getStatusCode(res);

  const DateTimeBlock = new Date().toLocaleString();
  const formattedTime = getFormattedTime(time);

  const colorfulMethod = getColorfulMethod(req.method);
  const formattedUrl = getFormattedUrl(req.baseUrl, req.url);
  let MessageBlock = `${colorfulMethod} ${formattedUrl} ${StatusCode}`;

  const possibleError = res.locals.errType;
  if (possibleError) MessageBlock += ` --> ${chalk.redBright(possibleError)}`;

  console.log(`[${HttpBlock}][${DateTimeBlock}][${formattedTime}] ${MessageBlock}`);
});

export default HttpLogger;
