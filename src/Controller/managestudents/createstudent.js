import { Router } from "express";
const router =Router();

import StudentModel from "../../Model/StudentModel.js";
import RESPONSE from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
export default router.post("/",async(req,res)=>{
    try{
        let {name,rollnumber,email,phone}=req.body || {};
        if (!name) {
            return send(res, setErrMsg(RESPONSE.REQUIRED, "Name "));
            }

        if(!rollnumber){
            return res.status(400).json({
                success:false,
                message:"rollno is required",
            });
        }
        if(!email){
            return res.status(400).json({
                success:false,
                message:"email is required",
            });
        }
        if(!phone){
            return res.status(400).json({
                success:false,
                message:"phome is required",
            });
        }
        let student=await StudentModel.create({
            name:name,
            rollnumber:rollnumber,
            email:email,
            phone:phone,
        });

        

    return send(res,RESPONSE.SUCCESS,student);
    }catch(error) {
        console.log("create student:",error);
        return send(res,RESPONSE.UNK_ERR);
 
    }
});
