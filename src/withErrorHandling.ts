import { NextFunction } from "express";

export const withErrorHandling: any = (func: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);

      return;
    } catch (e) {
      console.log(e);
    }

    // @ts-expect-error
    res.status = 400;
    // @ts-expect-error
    res.send("Error");
  };
};
