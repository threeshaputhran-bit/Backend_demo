import { Router } from "express";
import createstudent from "./createstudent.js";
import liststudents from "./liststudents.js";

const route =Router();

route.use("/create",createstudent);
route.use("/", liststudents);

export default route;

