import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

function authenticateAdminToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    if ((user as JwtPayload).isAdmin !== true) {
      return res.status(403).send("User is not an admin");
    }

    req.user = user;
    next();
  });
}

export default authenticateAdminToken;
