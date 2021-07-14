import { Request, Response, NextFunction } from "express";
import { inDevelopment } from "./environment";

const DelayAverage = 0;

export default async function simulateDelay(req: Request, res: Response, next: NextFunction) {
  if (inDevelopment) await sleep(normalDistribution() * DelayAverage * 2);
  next();
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function normalDistribution(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return normalDistribution(); // resample between 0 and 1
  return num;
}
