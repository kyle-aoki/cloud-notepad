import { Request, Response, NextFunction } from "express";

export default async function simulateDelay(req: Request, res: Response, next: NextFunction) {
  await sleep(500);
  next();
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
