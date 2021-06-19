import { Request, Response, NextFunction } from "express";

export default async function simulateDelay(req: Request, res: Response, next: NextFunction) {
  await sleep(2000);
  next();
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
