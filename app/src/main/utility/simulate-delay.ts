import { Request, Response, NextFunction } from "express";
import { inDevelopment } from "./environment";

const simulatedDelayLength: number = 0;

export default async function simulateDelay(req: Request, res: Response, next: NextFunction) {
  if (inDevelopment) await sleep(simulatedDelayLength);
  next();
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
