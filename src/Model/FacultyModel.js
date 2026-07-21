import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    facultyid: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    }
});

export default mongoose.model("Faculty", FacultySchema);

  