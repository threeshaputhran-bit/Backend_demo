import { Router } from "express";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";
import studentModel from "../../model/studentModel.js";

let router = Router();

export default router.put("/", async (req, res) => {
  try {
    let { student_id } = req.query;
    let { name, rollnumber, email, phone } = req.body || {};

    if (!student_id) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "Student Id"));
    }

    let updates = {};

    if (name) {
      updates.name = name;
    }

    if (rollnumber) {
      updates.rollnumber = rollnumber;
    }

    if (email) {
      const isEmail = email.match(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      );

      if (!isEmail) {
        return send(res, setErrMsg(RESPONSE.ALREADY_EXISTS, "Email"));
      }

      const EmailExist = await studentModel.findOne({
        email: email,
        _id: { $ne: student_id },
      });

      if (EmailExist) {
        return send(res, setErrMsg(RESPONSE.ALREADY_EXISTS, "Email"));
      }

      updates.email = email;
    }

    if (phone) {
      const phoneExist = await studentModel.findOne({
        phone: phone,
        _id: { $ne: student_id },
      });

      if (phoneExist) {
        return send(res, setErrMsg(RESPONSE.ALREADY_EXISTS, "Phone"));
      }

      updates.phone = phone;
    }
    await studentModel.updateOne(
        {
            _id:student_id,
        },
        { $set: updates },
        
    );
    return send(res,RESPONSE.SUCCESS);
    }catch(error){
    console.log("Edit Api",error);
    return send(res,RESPONSE.UNK_ERR);
   }
});

      
