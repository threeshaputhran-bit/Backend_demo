import { Router } from "express";
import createstudent from "./createstudent.js";

const route =Router();

route.use("/create",createstudent);

export default route;

