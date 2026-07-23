import { Router } from "express";
import { STATE } from "../../config/constants";
import RESPONSE from "../../config/global";
import { setErrMsg } from "../../helper/responseHelper";

let router=Router();

export default router.delete("/",async(req,res)=>{
    try{
        let {student_id}=req.query;

        if(!student_id){
            return send(res,setErrMsg(RESPONSE.REQUIRED,"Student id"));
        }

        let studentData=await studentModel.findOne({
            _id:student_id,
            isActive:STATE.ACTIVE,
        });

        if(studentData){
            await studentModel.deleteOne({
                _id:student_id,
            });

            await studentModel.updateOne({
                _id:student_id
            },
            {
                $set:{isActive:STATE.INACTIVE},
            },
        );


        }else{
            return send(res,setErrMsg(RESPONSE.NOT_FOUND,"Student"));

        }
        return send(res,RESPONSE.SUCCESS);

    }catch(error){
        console.log("Delete Student AApi", error);
        return send(res,RESPONSE.UNK_ERR);
    }
});