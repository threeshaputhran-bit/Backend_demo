import express from "express";
import {connectDB} from "./src/helper/dbConnection.js";
import dotenv from "dotenv";
import routes from "./routers.js"
import cors from "cors"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
routes(app);
connectDB();

app.listen(PORT, () => {
    console.log("Server Listening on", PORT);
}); 