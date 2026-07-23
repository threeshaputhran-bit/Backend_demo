import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  rollnumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  isActive: {
    type: Number,
    default: 1,
  },
});

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;  