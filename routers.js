import facultyApiHandler from "./src/Controller/managefaculty/apiHepers.js";
const routes =(app)=>{
    app.use("/api/faculty",facultyApiHandler);

};
export default routes;