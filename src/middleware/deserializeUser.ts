import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);
  console.log("decoding");
  console.log(decoded);
  console.log(expired);

  if (decoded) {
    console.log("VALID JWT");

    res.locals.user = decoded; ///express middleware essentially acts as a route handler without sending a response
    //we're attaching the decoded user to the res.locals
    console.log(res.locals);
    return next();
  }
  if (expired && refreshToken) {
    const newAccessToken = (await reIssueAccessToken({
      refreshToken,
    })) as string;
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }
    const result = verifyJwt(newAccessToken);

    res.locals.user = result.decoded;
  }
  return next();
};

export default deserializeUser;
