import { Request, Response, NextFunction } from "express";

const welcome = (req: Request, res: Response, next: NextFunction) => {
  res.send("You've reached the User API. See '/documentation' for more info.");
};

export default welcome;
