import { StatusCodes } from "http-status-codes";

export const getPrivateRoute = (req, res, next) => {
  const data = "lorem ipsum dolor sit amet, consectetur adipisicing";
  res.status(StatusCodes.OK).json({ message: data });
};
