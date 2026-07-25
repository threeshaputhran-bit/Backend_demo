import { Router } from "express";
import register from "./register.js";
import login from "./login.js";


const route =Router();

route.use("/register",register);
route.use("/login",login);


export default route;