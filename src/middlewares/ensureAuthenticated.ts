import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      status: "Error",
      message: "Token is missing",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    verify(token, process.env.SECRET_KEY);
    return next();
  } catch (err) {
    return response.status(401).json({
      status: "Error",
      massage: "Token invalid",
    });
  }
}

export { ensureAuthenticated };
