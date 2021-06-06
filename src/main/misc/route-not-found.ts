import { Request, Response, NextFunction } from "express";

const RouteNotFound = (req: Request, res: Response, next: NextFunction) => {
  const url = req.originalUrl;
  res.status(404).send({
    ok: false,
    message: `Route '${url}' was not found in user-svc. See '/documentation' for a list of routes.`,
  });
};

export default RouteNotFound;
