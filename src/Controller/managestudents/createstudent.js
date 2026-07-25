import { Router } from "express";


import StudentModel from "../../Model/StudentModel.js";
import RESPONSE from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { upload } from "../../middleware/uploads.js";
import { authenticate } from "../../middleware/authenticate.js";
const uploads =upload.single("image");

const router =Router();


export default router.post("/",authenticate,async(req,res)=>{
    try{
      uploads(req,res,async (err)=>{
        if(err){
            return send(res,setErrMsg(RESPONSE.MULTER_ERR,err));
        }
        if(!req.file){
            return send(res,setErrMsg(RESPONSE.REQUIRED,"image"));
        }

        let filename =req.file.filename;

        let studentModel =await StudentModel(); 
        
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



        await StudentModel.create({
            name:name,
            rollnumber:rollnumber,
            email:email,
            phone:phone,
            image:filename,
        });

        return send(res,RESPONSE.SUCCESS);
    });
}catch(error){
    console.log("create studnet:",error);
    return send(res,RESPONSE.UNK_ERR);
}
});

        

