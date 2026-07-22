export const send =(res,response,data={})=>{
    return res.send({
        responseCode:response.code,
        responseMessage:response.statusMessage,
        responseData:data,

    });
};

export const setErrMsg =(response,param)=>{
    return {
        code:response.code,
        message:`${param}${response.message}`,

    };
};
