import RESPONSE from "../config/global.js";
import { send, setErrMsg } from "../helper/responseHelper.js";
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    try {
        let token = req.headers["authorization"];

        if (!token) {
            return send(res, RESPONSE.ACCESS_DENIED);
        }

        let decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;

        next();
    } catch (error) {
        console.log("Authenticate Error", error);
        return send(res,setErrMsg(RESPONSE.INVALID, "token"));
    }
};