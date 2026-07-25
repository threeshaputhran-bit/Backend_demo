import studentApiHandler from "./src/Controller/managestudents/apiHelper.js";
import authApiHandler from "./src/Controller/auth/apiHelper.js"
const routes =(app)=>{
    app.use("/api/student",studentApiHandler);

    app.use("/api/auth",authApiHandler);

};
export default routes;