/// VALIDATE THE REQUEST AGAINST A SCHEMA WITH ZOD
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log("request is");
    console.log(req.body);
    try {
      schema.parse({
        /// call parse on a zod object to check if the request properties are valid
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };

export default validate;
