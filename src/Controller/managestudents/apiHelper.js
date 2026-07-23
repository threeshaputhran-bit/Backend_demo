import { Router } from "express";
import createstudent from "./createstudent.js";
import liststudents from "./liststudents.js";
import editstudent from "./editstudent.js";

const route =Router();

route.use("/create",createstudent);
route.use("/", liststudents);
route.use("/edit", editstudent);

export default route;

