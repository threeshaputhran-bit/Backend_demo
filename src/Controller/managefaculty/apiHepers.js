import { Router } from "express";
import createfaculty from "./createfaculty.js";

const route =Router();

route.use("/create",createfaculty);

export default route;
