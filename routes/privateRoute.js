import express from "express";
import { getPrivateRoute } from "../controllers/privateCtrl.js";
const privateRoute = express.Router();

privateRoute.get("/", getPrivateRoute);

export default privateRoute;
