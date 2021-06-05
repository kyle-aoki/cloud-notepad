import { Request, Response, NextFunction } from "express";

const welcome = (req: Request, res: Response, next: NextFunction) => {
  res.send({ welcome: "You've reached the user-svc. See '/documentation' for more info." });
};

export default welcome;
