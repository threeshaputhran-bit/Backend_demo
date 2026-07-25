import { Router } from "express";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";
import teacherModel from "../../model/teacherModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

export default router.post("/", async (req, res) => {
    try {
        let { email, password } = req.body || {};

        if (!email) {
            return send(res, setErrMsg(RESPONSE.REQUIRED, "email"));
        }

        if (!password) {
            return send(res, setErrMsg(RESPONSE.REQUIRED, "password"));
        }

        let userData = await teacherModel.findOne({
            email: email,
        });

        if (userData &&(await bcrypt.compare(password, userData.password))) {
            let token = jwt.sign(
                {
                    id: userData._id,
                    name: userData.name,
                    role: userData.role,
                },
                process.env.TOKEN_KEY,
            );

            return send(res, RESPONSE.SUCCESS, token);
        } else {
            return send(res,setErrMsg(RESPONSE.INVALID, "Login Credential"));
        }
    } catch (error) {
        console.log("Login Api", error);
        return send(res, RESPONSE.UNK_ERR);
    }
});