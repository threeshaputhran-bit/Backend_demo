import { Router } from "express";
import teacherModel from "../../model/teacherModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";
import bcrypt from "bcrypt";

let router = Router();

export default router.post("/", async (req, res) => {
    try {
        let { name, email, password } = req.body || {};
        if (!name) {
            return send(res, setErrMsg(RESPONSE.REQUIRED, "Name"));
        }
        if (!email) {
            return send(res, setErrMsg(RESPONSE.REQUIRED, "email"));
        }
        if (!password) {
            return send(res, setErrMsg(RESPONSE.REQUIRED, "password"));
        }

        let isEmail = email.match(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        );

        let passwordRegex = password.match(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@#$%^&*-]).{8,}$/,
        );

        if (!passwordRegex) {
            return send(res, setErrMsg(RESPONSE.INVALID, "Password"));
        }

        if (!isEmail) {
            return send(res, setErrMsg(RESPONSE.INVALID, "email"));
        }

        let isEmailExist = await teacherModel.findOne({ email: email });

        if (isEmailExist) {
            return send(res, setErrMsg(RESPONSE.ALREADY_EXISTS, "Email"));
        }

        let encryptPass = await bcrypt.hash(password, 10);

        await teacherModel.create({
            name: name,
            email: email,
            password: encryptPass,
        });

        return send(res, RESPONSE.SUCCESS);
    } catch (error) {
        console.log("Register Api",error);
        return send(res, RESPONSE.UNK_ERR);
    }
});