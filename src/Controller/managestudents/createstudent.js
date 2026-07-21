import { Router } from "express";
const router =Router();

import StudentModel from "../../Model/StudentModel.js";

export default router.post("/",async(req,res)=>{
    try{
        let {name,rollnumber,email,phone}=req.body || {};
        if(!name){
            return res.status(400).json({
                success:false,
                message:"name is required",
            });
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
        })

        return res.status(200).json({
            success:true,
            message:"student created scuccsfully",
        });

    }catch(error) {
        console.log("create student:",error);
        return res.status(500).json({
            success:false,
            message:"smthg went worng",
        });
    }
});
