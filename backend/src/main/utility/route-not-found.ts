import { Request, Response, NextFunction } from "express";

export default function RouteNotFound(req: Request, res: Response, next: NextFunction) {
  res.status(404).send({ ok: false, message: `Route '${req.method} ${req.originalUrl}' was not found.` });
}
