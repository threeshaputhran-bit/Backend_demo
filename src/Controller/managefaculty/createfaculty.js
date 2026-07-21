import { Router } from "express";
import FacultyModel from "../../Model/FacultyModel.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { name, facultyid, email, phone, department } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }

        if (!facultyid) {
            return res.status(400).json({
                success: false,
                message: "Faculty ID is required",
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Phone is required",
            });
        }

        if (!department) {
            return res.status(400).json({
                success: false,
                message: "Department is required",
            });
        }

        const faculty = await FacultyModel.create({
            name,
            facultyid,
            email,
            phone,
            department,
        });

        return res.status(201).json({
            success: true,
            message: "Faculty created successfully",
            faculty,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
});

export default router;
