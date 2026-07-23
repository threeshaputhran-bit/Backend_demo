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
            return send(res,setErrMsg(RESPONSE.REQUIRED,"Rollnumber"))
        }
        
        if(!email){
            return send(res,setErrMsg(RESPONSE.REQUIRED,"email"));
        }

        if(!phone){
            return res.status(400).json({
                success:false,
                message:"phome is required",
            });
        }
        let isEmail = email.match(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        );

        if(!isEmail){
            return send(res,setErrMsg(RESPONSE.INVALID,"Email"));

        }

        let isEmailExist =await StudentModel.findOne({email:email});
        let isphoneExists =await StudentModel.findOne({phone:phone});

        if(isEmailExist){
            return send(res,setErrMsg(RESPONSE.INVALID,"Email"));
        }

        if(isphoneExists){
            return send(res,setErrMsg(RESPONSE.INVALID,"Phone"));
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
