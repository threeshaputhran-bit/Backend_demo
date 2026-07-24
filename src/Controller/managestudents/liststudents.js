import { Router } from "express";
import { STATE } from "../../config/constants.js";
import StudentModel from "../../Model/StudentModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";

const router = Router();

export default router.get("/", async (req, res) => {

    try {

        const { student_id, search } = req.query;

        let query = {
            isActive: STATE.ACTIVE
        };

        if (student_id) {
            query.rollnumber = student_id;
        }

        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            };
        }

        let studentData = await StudentModel.find(query, {
            __v: 0,
            isActive: 0
        });

        if (!studentData.length) {
            return send(res, setErrMsg(RESPONSE.NOT_FOUND, "Student Data "));
        }
        studentData =studentData.map((item)=>{
            return{
                ...item.toJSON(),
                image:item.image ? "/uploads/" + item.image :null,
            };
        });

        return send(res, RESPONSE.SUCCESS, studentData);
    } catch (error) {
        console.log(error);
        return send(res, RESPONSE.UNK_ERR);
    }
});